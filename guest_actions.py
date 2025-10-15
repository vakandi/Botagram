from __future__ import annotations

import json
import logging
import uuid
from datetime import datetime
from typing import Any, Dict, List, Literal, Optional

import httpx
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator

from dependencies import app
from routers.smm_panel import _load_services_settings, _build_exception_index, _compute_price

# Bot pricing for Botagram
BOT_PRICES = {
    "Instagram": 29.99,
    "Twitter": 19.99,
    "X (Twitter)": 19.99,
    "YouTube": 39.99,
    "TikTok": 24.99,
    "LinkedIn": 49.99,
    "Telegram": 14.99,
    "WhatsApp": 34.99,
    "Discord": 9.99,
    "Snapchat": 17.99,
    "Indeed": 44.99,
    "Vinted": 19.99,
}

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/guest", tags=["guest-actions"])


def _normalize_currency(value: Optional[str]) -> str:
    cur = (value or "USD").strip().upper()
    if not cur:
        return "USD"
    return cur


class GuestSingleItem(BaseModel):
    service_id: str = Field(..., description="Service identifier from SMM panels")
    panel_id: Optional[int] = Field(None, description="Optional panel id for the service")
    quantity: int = Field(..., gt=0, description="Quantity requested for the service")
    target_url: str = Field(..., description="Target URL provided by the guest")
    comments: Optional[str] = Field(None, description="Optional comments block (newline separated)")


class GuestMassItem(BaseModel):
    service_id: str
    panel_id: Optional[int] = None
    quantity: int = Field(..., gt=0)
    target_url: str
    comments: Optional[str] = None


class GuestSubscriptionPayload(BaseModel):
    service_id: str
    panel_id: Optional[int] = None
    quantity_per_period: int = Field(..., gt=0)
    target_url: str
    renewal_period: Literal["minutely", "hourly", "daily", "weekly", "bi-weekly", "monthly"] = "daily"
    duration_minutes: Optional[int] = Field(None, gt=0)


class GuestPackagePayload(BaseModel):
    package_id: int = Field(..., gt=0)
    target_url: str


class GuestQuoteRequest(BaseModel):
    order_type: Literal["single", "mass", "subscription", "package"]
    currency: Optional[str] = Field(None, description="Requested currency code")
    single: Optional[GuestSingleItem] = None
    mass: Optional[List[GuestMassItem]] = None
    subscription: Optional[GuestSubscriptionPayload] = None
    package: Optional[GuestPackagePayload] = None

    @validator("single", always=True)
    def validate_payload(cls, value, values):
        order_type = values.get("order_type")
        if order_type == "single" and value is None:
            raise ValueError("single order payload required")
        return value

    @validator("mass", always=True)
    def validate_mass(cls, value, values):
        order_type = values.get("order_type")
        if order_type == "mass":
            if not value or len(value) == 0:
                raise ValueError("mass order payload required")
        return value

    @validator("subscription", always=True)
    def validate_subscription(cls, value, values):
        order_type = values.get("order_type")
        if order_type == "subscription" and value is None:
            raise ValueError("subscription payload required")
        return value

    @validator("package", always=True)
    def validate_package(cls, value, values):
        order_type = values.get("order_type")
        if order_type == "package" and value is None:
            raise ValueError("package payload required")
        return value


class GuestQuoteLine(BaseModel):
    label: str
    quantity: int
    unit_price: float
    total: float


class GuestQuoteResponse(BaseModel):
    amount: float
    currency: str
    items: List[GuestQuoteLine]
    order_type: str


class GuestCheckoutRequest(BaseModel):
    order: GuestQuoteRequest
    payment_method: Literal["stripe", "paypal", "cryptomus", "wise", "dodo"]
    return_url: Optional[str] = None
    cancel_url: Optional[str] = None
    contact_email: Optional[str] = Field(None, description="Guest contact email for order tracking")


async def _load_pricing() -> Dict[str, Any]:
    """Load pricing context using the same logic as orders.py for consistency."""
    settings = await _load_services_settings()
    multiplier = float(settings.get("multiplier", 1.0) or 1.0)
    overrides = settings.get("overrides", {}) or {}
    exceptions = settings.get("exceptions", []) or []
    groups_by_key = _build_exception_index(exceptions)
    try:
        min_price_per_1k: float = float(settings.get("min_price_per_1k", 0.0) or 0.0)
    except Exception:
        min_price_per_1k = 0.0
    min_price_excluded: List[str] = [str(k) for k in settings.get("min_price_excluded", []) or [] if k]
    return {
        "multiplier": multiplier,
        "overrides": overrides,
        "groups_by_key": groups_by_key,
        "min_price_per_1k": min_price_per_1k,
        "min_price_excluded": min_price_excluded,
    }


async def _resolve_service(conn, service_id: str, panel_id: Optional[int]) -> Optional[Dict[str, Any]]:
    params: List[Any] = [service_id]
    clause = ""
    if panel_id is not None:
        clause = " AND panel_id = $2"
        params.append(panel_id)
    row = await conn.fetchrow(
        f"""
        SELECT service_id, panel_id, name, rate, min_quantity, max_quantity, description
        FROM smm_services
        WHERE service_id = $1{clause}
        ORDER BY updated_at DESC
        LIMIT 1
        """,
        *params,
    )
    if not row:
        return None
    return dict(row)


def _compute_unit_price(
    service: Dict[str, Any],
    pricing: Dict[str, Any],
) -> float:
    panel_id = service.get("panel_id") or 0
    key = f"{panel_id}:{service.get('service_id')}"
    provider_rate = float(service.get("rate") or 0.0)
    price = _compute_price(
        key,
        provider_rate,
        pricing["overrides"],
        pricing["multiplier"],
        pricing["groups_by_key"],
        pricing["min_price_per_1k"],
        pricing["min_price_excluded"],
    )
    return round(float(price), 6)


async def _quote_single(conn, payload: GuestSingleItem, pricing: Dict[str, Any]) -> GuestQuoteLine:
    # Check if this is a bot purchase (by service_id)
    if payload.service_id in BOT_PRICES:
        # Use frontend price for bot purchases
        unit_price = BOT_PRICES[payload.service_id]
        total = unit_price * payload.quantity
        return GuestQuoteLine(
            label=f"{payload.service_id} Bot - Automatisation",
            quantity=payload.quantity,
            unit_price=unit_price,
            total=round(total, 2),
        )
    
    # Original logic for real SMM services
    try:
        flag = await conn.fetchrow(
            """
            SELECT 1 FROM smm_service_flags 
            WHERE panel_id = $1 AND service_id = $2 AND (flagged_until IS NULL OR flagged_until > NOW())
            """,
            payload.panel_id or 0, payload.service_id,
        )
        if flag:
            raise HTTPException(status_code=400, detail="This service is temporarily unavailable")
    except HTTPException:
        raise
    except Exception:
        pass  # Continue if flag check fails
    
    service = await _resolve_service(conn, payload.service_id, payload.panel_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    unit_price = _compute_unit_price(service, pricing)
    total = unit_price * payload.quantity
    return GuestQuoteLine(
        label=service.get("name") or payload.service_id,
        quantity=payload.quantity,
        unit_price=unit_price,
        total=round(total, 2),
    )


async def _quote_mass(conn, payload: List[GuestMassItem], pricing: Dict[str, Any]) -> List[GuestQuoteLine]:
    lines: List[GuestQuoteLine] = []
    for item in payload:
        # Check for flagged services (same logic as orders.py)
        try:
            flag = await conn.fetchrow(
                """
                SELECT 1 FROM smm_service_flags 
                WHERE panel_id = $1 AND service_id = $2 AND (flagged_until IS NULL OR flagged_until > NOW())
                """,
                item.panel_id or 0, item.service_id,
            )
            if flag:
                raise HTTPException(status_code=400, detail=f"Service {item.service_id} is temporarily unavailable")
        except HTTPException:
            raise
        except Exception:
            pass  # Continue if flag check fails
            
        service = await _resolve_service(conn, item.service_id, item.panel_id)
        if not service:
            raise HTTPException(status_code=404, detail=f"Service not found for {item.service_id}")
        unit_price = _compute_unit_price(service, pricing)
        total = unit_price * item.quantity
        lines.append(
            GuestQuoteLine(
                label=service.get("name") or item.service_id,
                quantity=item.quantity,
                unit_price=unit_price,
                total=round(total, 2),
            )
        )
    return lines


async def _quote_subscription(conn, payload: GuestSubscriptionPayload, pricing: Dict[str, Any]) -> GuestQuoteLine:
    # Check for flagged services (same logic as orders.py)
    try:
        flag = await conn.fetchrow(
            """
            SELECT 1 FROM smm_service_flags 
            WHERE panel_id = $1 AND service_id = $2 AND (flagged_until IS NULL OR flagged_until > NOW())
            """,
            payload.panel_id or 0, payload.service_id,
        )
        if flag:
            raise HTTPException(status_code=400, detail="This service is temporarily unavailable")
    except HTTPException:
        raise
    except Exception:
        pass  # Continue if flag check fails
        
    service = await _resolve_service(conn, payload.service_id, payload.panel_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    unit_price = _compute_unit_price(service, pricing)
    duration_minutes = payload.duration_minutes or 60
    if payload.renewal_period == "minutely":
        periods = max(1, duration_minutes)
    elif payload.renewal_period == "hourly":
        periods = max(1, duration_minutes // 60)
    elif payload.renewal_period == "weekly":
        periods = max(1, duration_minutes // (60 * 24 * 7))
    elif payload.renewal_period == "bi-weekly":
        periods = max(1, duration_minutes // (60 * 24 * 14))
    elif payload.renewal_period == "monthly":
        periods = max(1, duration_minutes // (60 * 24 * 30))
    else:
        periods = max(1, duration_minutes // (60 * 24))
    total_units = payload.quantity_per_period * max(1, periods)
    total = unit_price * total_units
    return GuestQuoteLine(
        label=f"Subscription · {service.get('name') or payload.service_id}",
        quantity=total_units,
        unit_price=unit_price,
        total=round(total, 2),
    )


async def _quote_package(conn, payload: GuestPackagePayload) -> GuestQuoteLine:
    row = await conn.fetchrow(
        """
        SELECT package_id, name, package_price
        FROM packages
        WHERE package_id = $1 AND is_active = TRUE
        """,
        payload.package_id,
    )
    if not row:
        raise HTTPException(status_code=404, detail="Package not found")
    name = row["name"] or f"Package #{row['package_id']}"
    price = float(row["package_price"] or 0)
    return GuestQuoteLine(
        label=f"Package · {name}",
        quantity=1,
        unit_price=round(price, 2),
        total=round(price, 2),
    )


@router.post("/quote", response_model=GuestQuoteResponse)
async def guest_quote(request: GuestQuoteRequest):
    currency = _normalize_currency(request.currency)
    async with app.state.pool.acquire() as conn:
        pricing = await _load_pricing()
        if request.order_type == "single":
            line = await _quote_single(conn, request.single, pricing)  # type: ignore[arg-type]
            items = [line]
        elif request.order_type == "mass":
            items = await _quote_mass(conn, request.mass or [], pricing)
        elif request.order_type == "subscription":
            line = await _quote_subscription(conn, request.subscription, pricing)  # type: ignore[arg-type]
            items = [line]
        else:
            line = await _quote_package(conn, request.package)  # type: ignore[arg-type]
            items = [line]

    amount = round(sum(item.total for item in items), 2)
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Calculated amount invalid")
    return GuestQuoteResponse(amount=amount, currency=currency, items=items, order_type=request.order_type)


async def _ensure_guest_user(conn) -> int:
    user_id = await conn.fetchval("SELECT user_id FROM users WHERE role_custom = 'guest' ORDER BY user_id LIMIT 1")
    if user_id:
        return int(user_id)
    raise HTTPException(status_code=500, detail="Guest user not configured")


async def _create_guest_order_record(conn, checkout: GuestCheckoutRequest, quote: GuestQuoteResponse) -> Dict[str, Any]:
    guest_user_id = await _ensure_guest_user(conn)
    payload = json.loads(checkout.order.json())
    payment_method = checkout.payment_method
    token = uuid.uuid4()
    row = await conn.fetchrow(
        """
        INSERT INTO guest_orders (
            public_token,
            user_id,
            service_payload,
            payment_method,
            payment_state,
            order_state,
            total_amount,
            currency
        )
        VALUES ($1, $2, $3, $4, 'pending', 'pending', $5, $6)
        RETURNING guest_order_id, public_token
        """,
        token,
        guest_user_id,
        json.dumps(payload),
        payment_method,
        quote.amount,
        quote.currency,
    )
    if not row:
        raise HTTPException(status_code=500, detail="Failed to allocate guest order")
    return {"guest_order_id": int(row["guest_order_id"]), "public_token": str(row["public_token"]) }


async def _record_receipt(conn, guest_order_id: int, provider: str, amount: float, currency: str, reference: Optional[str], payload: Dict[str, Any]) -> None:
    await conn.execute(
        """
        INSERT INTO guest_payment_receipts (guest_order_id, provider, provider_reference, amount, currency, status, payload)
        VALUES ($1, $2, $3, $4, $5, 'pending', $6)
        """,
        guest_order_id,
        provider,
        reference,
        amount,
        currency,
        json.dumps(payload),
    )


async def _create_cryptomus_invoice(amount: float, order_ref: str, return_url: Optional[str]) -> Dict[str, Any]:
    merchant = getattr(app.state, "CRYPTOMUS_MERCHANT_ID", "")
    key = getattr(app.state, "CRYPTOMUS_PAYMENT_KEY", "")
    if not merchant or not key:
        raise HTTPException(status_code=503, detail="Cryptomus is not configured")
    payload = {
        "amount": f"{amount:.2f}",
        "currency": "USD",
        "order_id": order_ref,
        "url_return": return_url or getattr(app.state, "frontend_url", ""),
    }
    import base64
    import hashlib

    payload_b64 = base64.b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode()
    signature = hashlib.md5((payload_b64 + key).encode()).hexdigest()
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(
            "https://api.cryptomus.com/v1/payment",
            headers={"merchant": merchant, "sign": signature, "Content-Type": "application/json"},
            json=payload,
        )
        resp.raise_for_status()
        data = resp.json().get("result") or {}
        return {
            "payment_url": data.get("url") or data.get("link"),
            "payload": data,
        }


async def _create_stripe_checkout(amount: float, currency: str, public_token: str, return_url: Optional[str], cancel_url: Optional[str]) -> Dict[str, Any]:
    try:
        import stripe  # type: ignore
    except Exception:
        raise HTTPException(status_code=503, detail="Stripe SDK not installed on server")
    secret_key = getattr(app.state, "STRIPE_SECRET_KEY", None) or getattr(app.state, "stripe_secret_key", None)
    if not secret_key:
        raise HTTPException(status_code=503, detail="Stripe is not configured")
    stripe.api_key = secret_key
    session = stripe.checkout.Session.create(
        mode="payment",
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": currency.lower(),
                    "product_data": {"name": "Digital Software"},
                    "unit_amount": int(round(amount * 100)),
                },
                "quantity": 1,
            }
        ],
        success_url=(return_url or "https://paiement.botagram.fr/order-success") + f"?guest_token={public_token}",
        cancel_url=cancel_url or "https://paiement.botagram.fr/order-cancelled",
        metadata={"guest_token": public_token},
    )
    return {"payment_url": session.get("url"), "session_id": session.get("id")}


async def _create_wise_payment_link(amount: float, currency: str, public_token: str, return_url: Optional[str], cancel_url: Optional[str]) -> Dict[str, Any]:
    """Create a Wise transfer for guest checkout using the current API structure."""
    try:
        import httpx
        from routers.payments_wise import WiseSettings
        
        # Ensure Wise is configured
        WiseSettings.ensure_ready()
        
        # Create Wise transfer payload
        wise_payload = {
            "amount": amount,
            "currency": currency,
            "description": f"Digital Software - {public_token}",
            "metadata": {
                "guest_token": public_token,
                "order_type": "guest_checkout",
            },
            "callback_url": return_url or "https://paiement.botagram.fr/success"
        }
        
        # Use Wise API to create a transfer (simplified for guest checkout)
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Authorization": f"Bearer {WiseSettings.api_key()}",
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            
            # For guest checkout, we'll create a simplified transfer
            # Note: This is a simplified implementation - in production you'd need proper recipient setup
            transfer_data = {
                "type": "BALANCE",
                "profile": WiseSettings.profile_id(),
                "targetAccount": "balance",  # Simplified for guest checkout
                "quoteUuid": f"guest_{public_token}",
                "customerTransactionId": f"guest_{public_token}",
                "details": {
                    "reference": wise_payload["description"],
                    "transferPurpose": "OTHER",
                    "sourceOfFunds": "OTHER"
                },
                "metadata": wise_payload["metadata"]
            }
            
            # Create transfer
            transfer_resp = await client.post(
                f"{WiseSettings.api_base_url()}/v1/transfers",
                headers=headers,
                json=transfer_data,
            )
            transfer_resp.raise_for_status()
            transfer_data = transfer_resp.json()
            
            # For guest checkout, return a payment URL that redirects to Wise's payment page
            payment_url = f"https://wise.com/pay/{transfer_data.get('id', public_token)}"
            
            return {
                "payment_url": payment_url,
                "transfer_id": transfer_data.get("id"),
                "transfer": transfer_data,
            }
            
    except Exception as e:
        logger.error(f"Wise payment creation failed: {e}")
        raise HTTPException(status_code=503, detail="Wise payment service is temporarily unavailable")


async def _create_paypal_order(amount: float, currency: str, public_token: str, return_url: Optional[str], cancel_url: Optional[str]) -> Dict[str, Any]:
    client_id = getattr(app.state, "PAYPAL_CLIENT_ID", None)
    secret = getattr(app.state, "PAYPAL_SECRET", None)
    if not client_id or not secret:
        raise HTTPException(status_code=503, detail="PayPal is not configured")
    auth = httpx.BasicAuth(client_id, secret)
    async with httpx.AsyncClient(timeout=15.0) as client:
        token_resp = await client.post(
            "https://api-m.paypal.com/v1/oauth2/token",
            auth=auth,
            data={"grant_type": "client_credentials"},
        )
        token_resp.raise_for_status()
        access_token = token_resp.json().get("access_token")
        order_payload = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": currency,
                        "value": f"{amount:.2f}",
                    },
                    "custom_id": public_token,
                }
            ],
            "application_context": {
                "brand_name": "Botagram",
                "return_url": return_url or "https://paiement.botagram.fr/order-success",
                "cancel_url": cancel_url or "https://paiement.botagram.fr/order-cancelled",
            },
        }
        order_resp = await client.post(
            "https://api-m.paypal.com/v2/checkout/orders",
            headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
            json=order_payload,
        )
        order_resp.raise_for_status()
        data = order_resp.json()
        approval_url = next((link["href"] for link in data.get("links", []) if link.get("rel") == "approve"), None)
        return {"payment_url": approval_url, "order_id": data.get("id")}


async def _create_dodo_product_for_guest(
    amount: float,
    currency: str,
    name: str,
    description: Optional[str] = None,
) -> str:
    """
    Create a Dodo Payments product dynamically with a fixed price for guest orders.
    
    Args:
        amount: Amount in major currency units (e.g., 10.50 for $10.50)
        currency: ISO 4217 currency code (e.g., "USD")
        name: Product name
        description: Optional product description
        
    Returns:
        product_id: The created product ID
    """
    api_key = getattr(app.state, "DODO_PAYMENTS_API_KEY", None)
    base_url = getattr(app.state, "DODO_API_BASE_URL", None) or "https://test.dodopayments.com"
    timeout = float(getattr(app.state, "DODO_TIMEOUT_SECONDS", 30.0))
    
    if not api_key:
        raise HTTPException(status_code=503, detail="Dodo Payments is not configured")
    
    # Convert amount to cents (minor currency units)
    price_in_cents = int(round(amount * 100))
    
    # Build product payload
    product_payload = {
        "name": name,
        "description": description or f"{name} - ${amount:.2f}",
        "price": {
            "currency": currency.upper(),
            "price": price_in_cents,
            "discount": 0,  # Required field - no discount for fixed price products
            "type": "one_time_price",
            "pay_what_you_want": False,  # Fixed price
            "purchasing_power_parity": False,  # Required field - no PPP for guest orders
            "tax_inclusive": True,
        },
        "tax_category": "digital_products",
        "metadata": {
            "created_for": "guest_order",
            "amount": str(amount),
            "currency": currency,
            "created_at": datetime.utcnow().isoformat(),
        }
    }
    
    # Headers for API request
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Origin": "https://paiement.botagram.fr",
        "Referer": "https://paiement.botagram.fr",
        "User-Agent": "Botagram-Payment-System/1.0",
    }
    
    try:
        async with httpx.AsyncClient(base_url=base_url, timeout=timeout) as client:
            response = await client.post("/products", json=product_payload, headers=headers)
            response.raise_for_status()
            product_data = response.json()
            
            product_id = product_data.get("product_id")
            if not product_id:
                logger.error(f"Dodo product creation response missing product_id: {product_data}")
                raise HTTPException(status_code=500, detail="Failed to create product - no product_id returned")
            
            logger.info(f"✓ Created Dodo product for guest: {product_id} - {name} - ${amount} {currency}")
            return product_id
            
    except httpx.HTTPStatusError as exc:
        logger.error(f"Dodo guest product creation API error: {exc.response.text}")
        raise HTTPException(status_code=503, detail="Failed to create payment product")
    except httpx.HTTPError as exc:
        logger.error(f"Dodo guest product creation connectivity error: {exc}")
        raise HTTPException(status_code=503, detail="Failed to reach Dodo Payments API")


async def _create_dodo_checkout(
    amount: float, 
    currency: str, 
    public_token: str, 
    order_details: Dict[str, Any],
    contact_email: Optional[str],
    return_url: Optional[str], 
    cancel_url: Optional[str]
) -> Dict[str, Any]:
    """
    Create Dodo Payments checkout for guest orders with dynamic product creation.
    """
    api_key = getattr(app.state, "DODO_PAYMENTS_API_KEY", None)
    base_url = getattr(app.state, "DODO_API_BASE_URL", None) or "https://test.dodopayments.com"
    timeout = float(getattr(app.state, "DODO_TIMEOUT_SECONDS", 30.0))
    dodo_return_url = getattr(app.state, "DODO_RETURN_URL", None)
    dodo_cancel_url = getattr(app.state, "DODO_CANCEL_URL", None)
    
    if not api_key:
        raise HTTPException(status_code=503, detail="Dodo Payments is not configured")
    
    # Build order description from order details
    description = f"Digital Software - {public_token}"
    product_name = f"Digital Software - {public_token[:12]}"
    
    if order_details.get("order_type") == "single":
        single = order_details.get("single", {})
        service_id = single.get('service_id', 'Unknown')
        quantity = single.get('quantity', 'N/A')
        
        # Check if it's a bot purchase
        if service_id in BOT_PRICES:
            description = f"Bot d'automatisation {service_id} - Fonctionnalités avancées"
            product_name = f"{service_id} Bot - Automatisation"
        else:
            description = f"Digital Software - {quantity} items"
            product_name = f"Digital Software - {quantity} items"
    
    # Step 1: Create a unique product for this guest order with fixed price
    try:
        product_id = await _create_dodo_product_for_guest(
            amount=amount,
            currency=currency,
            name=product_name,
            description=description,
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to create Dodo product for guest order {public_token}: {exc}")
        raise HTTPException(status_code=503, detail="Failed to prepare payment session")
    
    # Step 2: Prepare checkout payload with the created product
    checkout_payload = {
        "product_cart": [
            {
                "product_id": product_id,
                "quantity": 1
            }
        ],
        "billing_currency": currency,
        "metadata": {
            "public_token": public_token,
            "order_type": order_details.get("order_type", "guest"),
            "description": description,
        },
        "allowed_payment_method_types": [
            "google_pay",
            "apple_pay",
            "credit",
            "debit"
        ],
    }
    
    # Convert any numeric values in metadata to strings (Dodo API requirement)
    for key, value in checkout_payload["metadata"].items():
        if isinstance(value, (int, float)):
            checkout_payload["metadata"][key] = str(value)
    
    # Add customer email if provided
    if contact_email:
        checkout_payload["customer"] = {"email": contact_email}
    
    # Use Dodo-specific return/cancel URLs with fallbacks
    final_return_url = return_url or dodo_return_url or "https://paiement.botagram.fr/dodo/payment/success"
    final_cancel_url = cancel_url or dodo_cancel_url or "https://paiement.botagram.fr/dodo/payment/failed"
    
    checkout_payload["return_url"] = final_return_url
    checkout_payload["cancel_url"] = final_cancel_url
    
    # Headers to mask domain
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Origin": "https://paiement.botagram.fr",
        "Referer": "https://paiement.botagram.fr",
        "User-Agent": "Botagram-Payment-System/1.0",
    }
    
    try:
        async with httpx.AsyncClient(base_url=base_url, timeout=timeout) as client:
            response = await client.post("/checkouts", json=checkout_payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            # Extract checkout URL from response
            checkout_url = (
                data.get("checkout_url") or 
                data.get("url") or 
                data.get("link") or 
                data.get("payment_url") or
                (data.get("data", {}).get("checkout_url") if isinstance(data.get("data"), dict) else None)
            )
            
            return {
                "payment_url": checkout_url,
                "session_id": data.get("session_id"),
                "checkout_id": data.get("id") or data.get("checkout_id"),
                "product_id": product_id,
                "dodo_response": data,
            }
    except httpx.HTTPStatusError as exc:
        logger.error(f"Dodo Payments API error: {exc.response.text}")
        raise HTTPException(status_code=503, detail="Dodo Payments service error")
    except httpx.HTTPError as exc:
        logger.error(f"Dodo Payments connectivity error: {exc}")
        raise HTTPException(status_code=503, detail="Failed to reach Dodo Payments")


@router.post("/checkout")
async def guest_checkout(request: GuestCheckoutRequest):
    quote = await guest_quote(request.order)  # type: ignore[arg-type]
    async with app.state.pool.acquire() as conn:
        async with conn.transaction():
            logger.info(f"Guest checkout, recording the order")
            record = await _create_guest_order_record(conn, request, quote)
            logger.info(f"Guest checkout, recording the receipt")
            order_ref = f"{record['public_token']}|{uuid.uuid4().hex}"
            logger.info(f"Guest checkout, creating the payment receipt")
            if quote.currency.lower() != "usd" and request.payment_method == "cryptomus":
                logger.info(f"Guest checkout, currency is not USD, using Cryptomus, order_ref: {order_ref} : payment_method: {request.payment_method}")
                raise HTTPException(status_code=400, detail="Cryptomus currently supports USD only")
            if request.payment_method == "cryptomus":
                logger.info(f"Guest checkout, using Cryptomus, order_ref: {order_ref} : payment_method: {request.payment_method}")
                provider_payload = await _create_cryptomus_invoice(quote.amount, order_ref, request.return_url)
            elif request.payment_method == "dodo":
                logger.info(f"Guest checkout, using Dodo Payments, order_ref: {order_ref} : payment_method: {request.payment_method}")
                provider_payload = await _create_dodo_checkout(
                    quote.amount,
                    quote.currency,
                    record["public_token"],
                    request.order.dict(),
                    request.contact_email,
                    request.return_url,
                    request.cancel_url,
                )
            elif request.payment_method == "stripe":
                logger.info(f"Guest checkout, using Stripe, order_ref: {order_ref} : payment_method: {request.payment_method}")
                provider_payload = await _create_stripe_checkout(
                    quote.amount,
                    quote.currency.lower(),
                    record["public_token"],
                    request.return_url,
                    request.cancel_url,
                )
            elif request.payment_method == "wise":
                logger.info(f"Guest checkout, using Wise, order_ref: {order_ref} : payment_method: {request.payment_method}")
                provider_payload = await _create_wise_payment_link(
                    quote.amount,
                    quote.currency,
                    record["public_token"],
                    request.return_url,
                    request.cancel_url,
                )
            else:
                logger.info(f"Guest checkout, using PayPal, order_ref: {order_ref} : payment_method: {request.payment_method}")
                provider_payload = await _create_paypal_order(
                    quote.amount,
                    quote.currency,
                    record["public_token"],
                    request.return_url,
                    request.cancel_url,
                )
            logger.info(f"Guest checkout, payment receipt created : PROVIDER PAYLOAD: {provider_payload}")
            provider_reference = (
                provider_payload.get("session_id")
                or provider_payload.get("order_id")
                or provider_payload.get("transfer_id")
                or provider_payload.get("payment_link_id")
                or provider_payload.get("payment_url")
                or order_ref
            )
            logger.info(f"Guest checkout, payment receipt created : PROVIDER REFERENCE: {provider_reference}")
            merged_payload = dict(provider_payload)
            merged_payload.setdefault("order_reference", order_ref)
            logger.info(f"Guest checkout, payment receipt created : MERGED PAYLOAD: {merged_payload}")
            await conn.execute(
                "UPDATE guest_orders SET payment_reference = $1 WHERE guest_order_id = $2",
                provider_reference,
                record["guest_order_id"],
            )
            logger.info(f"Guest checkout, recording the receipt")
            await _record_receipt(
                conn,
                record["guest_order_id"],
                request.payment_method,
                quote.amount,
                quote.currency,
                provider_reference,
                merged_payload,
            )
            logger.info(f"Guest checkout, receipt recorded")
    return {
        "public_token": record["public_token"],
        "payment_method": request.payment_method,
        "amount": quote.amount,
        "currency": quote.currency,
        "payment": {
            **provider_payload,
            "order_reference": provider_reference,
        },
    }




async def _update_guest_payment(
    conn,
    guest_order_id: int,
    provider_reference: str,
    payload: Dict[str, Any],
    is_final: bool,
) -> Dict[str, Any]:
    payment_state = "completed" if is_final else "pending"
    await conn.execute(
        """
        UPDATE guest_orders
        SET payment_state = $2,
            payment_reference = COALESCE(payment_reference, $3),
            payment_details = $4,
            updated_at = NOW()
        WHERE guest_order_id = $1
        """,
        guest_order_id,
        payment_state,
        provider_reference,
        json.dumps(payload),
    )
    await conn.execute(
        """
        UPDATE guest_payment_receipts
        SET status = $3, payload = $4
        WHERE guest_order_id = $1 AND provider_reference = $2
        """,
        guest_order_id,
        provider_reference,
        payment_state,
        json.dumps(payload),
    )
    return {"status": payment_state}


async def complete_guest_payment(
    public_token: str,
    provider: str,
    provider_reference: str,
    amount: float,
    currency: str,
    payload: Dict[str, Any],
    is_final: bool = True,
) -> Dict[str, Any]:
    async with app.state.pool.acquire() as conn:
        async with conn.transaction():
            guest_order = await conn.fetchrow(
                "SELECT guest_order_id, payment_state FROM guest_orders WHERE public_token = $1 FOR UPDATE",
                public_token,
            )
            if not guest_order:
                raise HTTPException(status_code=404, detail="Guest order not found")
            guest_order_id = int(guest_order["guest_order_id"])
            if guest_order["payment_state"] == "completed":
                return {"status": "already_completed"}
            return await _update_guest_payment(
                conn,
                guest_order_id,
                provider_reference,
                payload,
                is_final,
            )


async def complete_guest_payment_by_reference(
    provider: str,
    provider_reference: str,
    payload: Dict[str, Any],
    is_final: bool = True,
) -> Dict[str, Any]:
    async with app.state.pool.acquire() as conn:
        async with conn.transaction():
            receipt = await conn.fetchrow(
                """
                SELECT guest_order_id
                FROM guest_payment_receipts
                WHERE provider = $1 AND provider_reference = $2
                FOR UPDATE
                """,
                provider,
                provider_reference,
            )
            if not receipt:
                return {"status": "unknown_reference"}
            guest_order_id = int(receipt["guest_order_id"])
            row = await conn.fetchrow(
                "SELECT payment_state FROM guest_orders WHERE guest_order_id = $1 FOR UPDATE",
                guest_order_id,
            )
            if not row:
                return {"status": "order_missing"}
            if row["payment_state"] == "completed":
                return {"status": "already_completed"}
            return await _update_guest_payment(
                conn,
                guest_order_id,
                provider_reference,
                payload,
                is_final,
            )


@router.get("/status/{public_token}")
async def guest_status(public_token: str):
    async with app.state.pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            SELECT guest_order_id, service_payload, payment_method, payment_state,
                   order_state, payment_reference, total_amount, currency, created_at, updated_at
            FROM guest_orders
            WHERE public_token = $1
            """,
            public_token,
        )
        if not row:
            raise HTTPException(status_code=404, detail="Guest order not found")
        receipts = await conn.fetch(
            """
            SELECT provider, provider_reference, status, amount, currency, created_at
            FROM guest_payment_receipts
            WHERE guest_order_id = $1
            ORDER BY created_at DESC
            """,
            row["guest_order_id"],
        )
    return JSONResponse(
        content={
            "public_token": public_token,
            "payment_method": row["payment_method"],
            "payment_state": row["payment_state"],
            "order_state": row["order_state"],
            "total_amount": float(row["total_amount"] or 0),
            "currency": row["currency"],
            "payment_reference": row["payment_reference"],
            "service_payload": row["service_payload"],
            "created_at": (row["created_at"].isoformat() if row["created_at"] else None),
            "updated_at": (row["updated_at"].isoformat() if row["updated_at"] else None),
            "receipts": [
                {
                    "provider": rec["provider"],
                    "provider_reference": rec["provider_reference"],
                    "status": rec["status"],
                    "amount": float(rec["amount"] or 0),
                    "currency": rec["currency"],
                    "created_at": rec["created_at"].isoformat() if rec["created_at"] else None,
                }
                for rec in receipts
            ],
        }
    )


__all__ = [
    "router",
    "guest_quote",
    "guest_checkout",
    "guest_status",
    "complete_guest_payment",
    "complete_guest_payment_by_reference",
]
