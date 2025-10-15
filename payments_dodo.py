from __future__ import annotations

import json
import logging
import os
import uuid
from datetime import datetime
from typing import Any, Dict, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field, validator

from dependencies import app
from services.promotions import evaluate_deposit_promotion
from .affiliate import process_affiliate_deposit_commission
from .auth import UserAuth, get_user_data_verify

try:  # pragma: no cover - optional CRUD helpers
    from crud import payment as crud_payment  # type: ignore
except Exception:  # pragma: no cover - optional
    crud_payment = None  # type: ignore

from dotenv import load_dotenv
load_dotenv()

DODO_PAYMENTS_API_KEY = os.getenv("DODO_PAYMENTS_API_KEY")
DODO_API_BASE_URL = os.getenv("DODO_API_BASE_URL")
DODO_RETURN_URL = os.getenv("DODO_RETURN_URL")
DODO_CANCEL_URL = os.getenv("DODO_CANCEL_URL")
DODO_TIMEOUT_SECONDS = os.getenv("DODO_TIMEOUT_SECONDS")
DODO_WEBHOOK_SECRET = os.getenv("DODO_WEBHOOK_SECRET")


async def _test_dodo_connectivity() -> bool:
    """Test basic connectivity to Dodo API"""
    try:
        import socket
        from urllib.parse import urlparse
        
        api_url = DodoSettings.api_base_url()
        parsed = urlparse(api_url)
        hostname = parsed.hostname
        
        logger.info(f"🔍 Testing DNS resolution for: {hostname}")
        
        # Test DNS resolution
        try:
            ip = socket.gethostbyname(hostname)
            logger.info(f"✅ DNS resolution successful: {hostname} -> {ip}")
        except socket.gaierror as e:
            logger.error(f"❌ DNS resolution failed for {hostname}: {e}")
            return False
        
        # Test basic HTTP connectivity
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{api_url}/health", follow_redirects=True)
                logger.info(f"✅ HTTP connectivity test: {response.status_code}")
                return True
        except httpx.HTTPError as e:
            logger.warning(f"⚠️ HTTP connectivity test failed (expected for /health): {e}")
            # This is expected since /health might not exist, but DNS worked
            return True
            
    except Exception as e:
        logger.error(f"❌ Connectivity test failed: {e}")
        return False


logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/payments/dodo", tags=["payments-dodo"])


# Helper function to create Dodo products dynamically
async def _create_dodo_product(
    amount: float,
    currency: str,
    name: str,
    description: Optional[str] = None,
) -> str:
    """
    Create a Dodo Payments product dynamically with a fixed price.
    
    Args:
        amount: Amount in major currency units (e.g., 10.50 for $10.50)
        currency: ISO 4217 currency code (e.g., "USD")
        name: Product name
        description: Optional product description
        
    Returns:
        product_id: The created product ID
        
    According to Dodo API docs, prices are stored in cents (minor units).
    For example, $10.50 should be sent as 1050.
    """
    DodoSettings.ensure_ready()
    
    # Test connectivity before attempting API calls
    logger.info("🔍 Testing Dodo API connectivity before product creation...")
    connectivity_ok = await _test_dodo_connectivity()
    if not connectivity_ok:
        logger.error("❌ Dodo API connectivity test failed - cannot create product")
        raise HTTPException(status_code=503, detail="Dodo Payments API is not reachable")
    
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
            "purchasing_power_parity": False,  # Required field - no PPP for dynamic products
            "tax_inclusive": True,
        },
        "tax_category": "digital_products",
        "metadata": {
            "created_for": "dynamic_payment",
            "amount": str(amount),
            "currency": currency,
            "created_at": datetime.utcnow().isoformat(),
        }
    }
    
    # Headers for API request
    headers = {
        "Authorization": f"Bearer {DodoSettings.api_key()}",
        "Content-Type": "application/json",
        "Origin": "https://paiement.botagram.fr",
        "Referer": "https://paiement.botagram.fr",
        "User-Agent": "Botagram-Payment-System/1.0",
    }
    
    try:
        async with httpx.AsyncClient(
            base_url=DodoSettings.api_base_url(),
            timeout=DodoSettings.timeout_seconds(),
        ) as client:
            response = await client.post("/products", json=product_payload, headers=headers)
            response.raise_for_status()
            product_data = response.json()
            
            product_id = product_data.get("product_id")
            if not product_id:
                logger.error(f"Dodo product creation response missing product_id: {product_data}")
                raise HTTPException(status_code=500, detail="Failed to create product - no product_id returned")
            
            logger.info(f"✓ Created Dodo product: {product_id} - {name} - ${amount} {currency}")
            return product_id
            
    except httpx.HTTPStatusError as exc:
        logger.error(f"Dodo product creation API error: {exc.response.text}")
        raise HTTPException(status_code=503, detail="Failed to create payment product")
    except httpx.HTTPError as exc:
        logger.error(f"Dodo product creation connectivity error: {exc}")
        raise HTTPException(status_code=503, detail="Failed to reach Dodo Payments API")


class DodoSettings:
    @staticmethod
    def api_key() -> str:
        return getattr(app.state, "DODO_PAYMENTS_API_KEY", None) or os.getenv("DODO_PAYMENTS_API_KEY", "")

    @staticmethod
    def api_base_url() -> str:
        return getattr(app.state, "DODO_API_BASE_URL", None) or os.getenv(
            "DODO_API_BASE_URL", "https://test.dodopayments.com"
        )

    @staticmethod
    def return_url() -> Optional[str]:
        return getattr(app.state, "DODO_RETURN_URL", None) or os.getenv("DODO_RETURN_URL")

    @staticmethod
    def cancel_url() -> Optional[str]:
        return getattr(app.state, "DODO_CANCEL_URL", None) or os.getenv("DODO_CANCEL_URL")

    @staticmethod
    def timeout_seconds() -> float:
        return float(getattr(app.state, "DODO_TIMEOUT_SECONDS", 30.0))

    @staticmethod
    def webhook_secret() -> str:
        return getattr(app.state, "DODO_WEBHOOK_SECRET", None) or os.getenv("DODO_WEBHOOK_SECRET", "")

    @staticmethod
    def ensure_ready() -> None:
        if not DodoSettings.api_key():
            raise HTTPException(status_code=500, detail="Dodo Payments provider is not configured")


class DodoCreateLinkRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Amount in major currency units (e.g. 10.50)")
    currency: str = Field(..., min_length=3, max_length=3)
    description: Optional[str] = Field(default=None, max_length=255)
    metadata: Optional[Dict[str, Any]] = None
    return_url: Optional[str] = Field(
        default=None,
        description="Optional return URL appended to Dodo checkout configuration",
    )
    customer_email: Optional[str] = Field(default=None, description="Customer email address")
    customer_name: Optional[str] = Field(default=None, description="Customer name")
    product_id: Optional[str] = Field(
        default=None,
        description="Dodo product ID. If not provided, amount-based product will be used.",
    )
    provider_payload: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Advanced override payload sent directly to Dodo. Standard fields will still be merged if missing.",
    )

    @validator("currency", pre=True, always=True)
    def uppercase_currency(cls, value: str) -> str:  # noqa: N805
        return (value or "").upper()


async def _persist_pending_transaction(
    user_id: int,
    order_id: str,
    amount: float,
    currency: str,
    payment_details: Dict[str, Any],
) -> None:
    if crud_payment is not None:
        await crud_payment.create_transaction(  # type: ignore[attr-defined]
            user_id=user_id,
            order_id=order_id,
            amount=float(amount),
            currency=currency,
            payment_method="dodo",
            status="pending",
            payment_details=payment_details,
            tx_type="deposit",
        )
        return

    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        await conn.execute(
            """
            INSERT INTO wallet_transactions (
                user_id, order_id, amount, currency, type, status, payment_method, payment_details
            ) VALUES ($1, $2, $3, $4, 'deposit', 'pending', 'dodo', $5)
            """,
            user_id,
            order_id,
            float(amount),
            currency,
            json.dumps(payment_details),
        )


def _extract_checkout_url(payload: Dict[str, Any]) -> Optional[str]:
    candidates = [
        payload.get("checkout_url"),
        payload.get("url"),
        payload.get("link"),
        payload.get("payment_url"),
    ]

    data_field = payload.get("data")
    if isinstance(data_field, dict):
        candidates.extend(
            [
                data_field.get("checkout_url"),
                data_field.get("url"),
                data_field.get("link"),
                data_field.get("payment_url"),
            ]
        )

    for candidate in candidates:
        if isinstance(candidate, str) and candidate.strip():
            return candidate
    return None


def _build_payload(
    order_id: str,
    product_id: str,
    request_payload: DodoCreateLinkRequest,
) -> Dict[str, Any]:
    """
    Build Dodo Payments checkout session payload.
    According to Dodo API docs, checkout sessions require:
    - product_cart: Array of products (product_id must be created first via API)
    - customer: Optional customer info (email, name, phone_number)
    - return_url: Where to redirect after payment
    - billing_currency: Currency code (ISO 4217)
    - metadata: Custom data (will be returned in webhooks)
    - allowed_payment_method_types: Payment methods to enable
    """
    if request_payload.provider_payload:
        provider_body = dict(request_payload.provider_payload)
    else:
        provider_body = {}

    # Product cart is REQUIRED by Dodo API - use the dynamically created product
    provider_body.setdefault("product_cart", [
        {
            "product_id": product_id,
            "quantity": 1  # For wallet deposits, always 1
        }
    ])

    # Customer information (optional but recommended for conversion)
    customer_data = {}
    if request_payload.customer_email:
        customer_data["email"] = request_payload.customer_email
    if request_payload.customer_name:
        customer_data["name"] = request_payload.customer_name
    if customer_data:
        provider_body.setdefault("customer", customer_data)

    # Return and Cancel URLs - use paiement.botagram.fr to mask zovaboost.tech
    return_url = request_payload.return_url or DodoSettings.return_url()
    if return_url:
        provider_body.setdefault("return_url", return_url)
    
    cancel_url = DodoSettings.cancel_url()
    if cancel_url:
        provider_body.setdefault("cancel_url", cancel_url)

    # Metadata - stored with session and returned in webhooks
    if request_payload.metadata:
        metadata = dict(request_payload.metadata)
    else:
        metadata = {}
    
    metadata.setdefault("order_id", order_id)
    metadata.setdefault("description", request_payload.description or f"Digital Software {order_id}")
    
    # Convert any numeric values in metadata to strings (Dodo API requirement)
    for key, value in metadata.items():
        if isinstance(value, (int, float)):
            metadata[key] = str(value)
    
    provider_body.setdefault("metadata", metadata)

    # Billing currency (ISO 4217 code)
    provider_body.setdefault("billing_currency", request_payload.currency)

    # Payment methods - Always include credit/debit as fallback
    provider_body.setdefault("allowed_payment_method_types", [
        "google_pay",
        "apple_pay",
        "credit",
        "debit"
    ])

    return provider_body


@router.post("/create-link")
async def create_payment_link(
    payload: DodoCreateLinkRequest,
    auth: UserAuth = Depends(get_user_data_verify),
):
    DodoSettings.ensure_ready()

    # Check minimum amount (admin exception: $0.1, regular: $5)
    is_admin = False
    try:
        async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
            # Check by role first (same logic as admin endpoint)
            role = await conn.fetchval("SELECT role_custom FROM users WHERE user_id = $1", auth.user_id)
            if role == 'admin':
                is_admin = True
            else:
                # Check by email (legacy admin emails)
                email = await conn.fetchval("SELECT email FROM users WHERE user_id = $1", auth.user_id)
                if email:
                    from utils import get_all_admin_emails
                    admin_emails = get_all_admin_emails()
                    is_admin = email.strip().lower() in admin_emails
    except Exception:
        pass
    
    min_amount = 0.1 if is_admin else 5.0
    if payload.amount < min_amount:
        raise HTTPException(
            status_code=400,
            detail=f"Minimum deposit amount is ${min_amount:.2f}"
        )

    order_id = f"dodo_{auth.user_id}_{int(datetime.utcnow().timestamp())}"

    # Step 1: Create a unique product for this transaction with fixed price
    product_name = f"Digital Software - {order_id}"
    product_description = payload.description or f"Digital Software ${payload.amount:.2f} {payload.currency}"
    
    try:
        product_id = await _create_dodo_product(
            amount=payload.amount,
            currency=payload.currency,
            name=product_name,
            description=product_description,
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to create Dodo product for order {order_id}: {exc}")
        raise HTTPException(status_code=503, detail="Failed to prepare payment session")

    # Step 2: Build checkout session payload with the created product
    request_body = _build_payload(order_id, product_id, payload)

    # Headers to mask our domain - use botagram.fr as the origin
    headers = {
        "Authorization": f"Bearer {DodoSettings.api_key()}",
        "Content-Type": "application/json",
        "Origin": "https://paiement.botagram.fr",
        "Referer": "https://paiement.botagram.fr",
        "User-Agent": "Botagram-Payment-System/1.0",
    }

    try:
        async with httpx.AsyncClient(
            base_url=DodoSettings.api_base_url(),
            timeout=DodoSettings.timeout_seconds(),
        ) as client:
            response = await client.post("/checkouts", json=request_body, headers=headers)
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:  # pragma: no cover - network failure handling
        logger.error("Dodo Payments API error: %s", exc.response.text)
        raise HTTPException(status_code=exc.response.status_code, detail="Dodo Payments API request failed")
    except httpx.HTTPError as exc:  # pragma: no cover - network failure handling
        logger.error("Dodo Payments connectivity error: %s", exc)
        raise HTTPException(status_code=502, detail="Failed to reach Dodo Payments API")

    provider_response: Dict[str, Any]
    try:
        provider_response = response.json()
        logger.info(f"📄 Checkout response data: {json.dumps(provider_response, indent=2)}")
    except ValueError:  # pragma: no cover - defensive
        provider_response = {"raw_body": response.text}
        logger.error(f"❌ Failed to parse JSON response: {response.text}")

    checkout_url = _extract_checkout_url(provider_response)
    session_id = provider_response.get("session_id")

    await _persist_pending_transaction(
        auth.user_id,
        order_id,
        payload.amount,
        payload.currency,
        {
            "provider": "dodo",
            "session_id": session_id,
            "product_id": product_id,
            "request": request_body,
            "response": provider_response,
            "created_at": datetime.utcnow().isoformat(),
        },
    )

    result = {
        "order_id": order_id,
        "session_id": session_id,
        "product_id": product_id,
        "checkout_url": checkout_url,
        "provider_response": provider_response,
    }

    if not checkout_url:
        result["warning"] = "Dodo Payments response did not include a checkout link. Inspect provider_response for details."

    return result


async def _complete_transaction(order_id: str, amount: float, user_id: int) -> None:
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        await conn.execute(
            """
            UPDATE wallet_transactions
            SET status = 'completed'
            WHERE order_id = $1 AND payment_method = 'dodo'
            """,
            order_id,
        )
        await conn.execute(
            "UPDATE users SET balance = COALESCE(balance, 0) + $1 WHERE user_id = $2",
            amount,
            user_id,
        )

    try:
        await process_affiliate_deposit_commission(user_id, amount)
    except Exception as exc:  # pragma: no cover - defensive
        logger.error("Dodo affiliate commission error: %s", exc)
    try:
        await evaluate_deposit_promotion(user_id, amount)
    except Exception as exc:  # pragma: no cover - defensive
        logger.error("Dodo promotion evaluation error: %s", exc)


# Webhook integration for Dodo Payments
# Dodo Payments uses Standard Webhooks specification
# See: https://docs.dodopayments.com/developer-resources/webhooks/

async def _handle_payment_succeeded(order_id: str) -> None:
    """Handle successful payment webhook"""
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        row = await conn.fetchrow(
            """
            SELECT user_id, amount FROM wallet_transactions
            WHERE order_id = $1 AND payment_method = 'dodo' AND status = 'pending'
            """,
            order_id
        )
        
        if row:
            await _complete_transaction(order_id, row["amount"], row["user_id"])
            logger.info(f"✓ Payment succeeded for order {order_id} - User {row['user_id']} - ${row['amount']}")
        else:
            logger.warning(f"⚠ Payment succeeded webhook received for unknown order: {order_id}")


async def _handle_payment_failed(order_id: str, reason: str = "unknown") -> None:
    """Handle failed payment webhook"""
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        await conn.execute(
            """
            UPDATE wallet_transactions
            SET status = 'failed',
                payment_details = payment_details || $2::jsonb
            WHERE order_id = $1 AND payment_method = 'dodo' AND status = 'pending'
            """,
            order_id,
            json.dumps({"failure_reason": reason, "failed_at": datetime.utcnow().isoformat()})
        )
    logger.info(f"✗ Payment failed for order {order_id} - Reason: {reason}")


async def _handle_payment_cancelled(order_id: str) -> None:
    """Handle cancelled payment webhook"""
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        await conn.execute(
            """
            UPDATE wallet_transactions
            SET status = 'cancelled',
                payment_details = payment_details || $2::jsonb
            WHERE order_id = $1 AND payment_method = 'dodo' AND status = 'pending'
            """,
            order_id,
            json.dumps({"cancelled_at": datetime.utcnow().isoformat()})
        )
    logger.info(f"⊘ Payment cancelled for order {order_id}")


async def _handle_refund_succeeded(order_id: str, refund_amount: float) -> None:
    """Handle successful refund webhook"""
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        # Find the original transaction
        row = await conn.fetchrow(
            """
            SELECT user_id, amount FROM wallet_transactions
            WHERE order_id = $1 AND payment_method = 'dodo' AND status = 'completed'
            """,
            order_id
        )
        
        if row:
            # Deduct refund amount from user balance
            await conn.execute(
                "UPDATE users SET balance = GREATEST(0, COALESCE(balance, 0) - $1) WHERE user_id = $2",
                refund_amount,
                row["user_id"]
            )
            
            # Create refund transaction record
            await conn.execute(
                """
                INSERT INTO wallet_transactions (
                    user_id, order_id, amount, currency, type, status, payment_method, payment_details
                ) VALUES ($1, $2, $3, 'USD', 'refund', 'completed', 'dodo', $4)
                """,
                row["user_id"],
                f"refund_{order_id}",
                -refund_amount,
                json.dumps({
                    "original_order_id": order_id,
                    "refunded_at": datetime.utcnow().isoformat()
                })
            )
            logger.info(f"↩ Refund succeeded for order {order_id} - User {row['user_id']} - ${refund_amount}")


async def _handle_refund_failed(order_id: str, reason: str = "unknown") -> None:
    """Handle failed refund webhook"""
    logger.error(f"✗ Refund failed for order {order_id} - Reason: {reason}")
    # You might want to create an admin alert here


async def _verify_webhook_signature(payload: bytes, headers: Dict[str, str]) -> bool:
    """
    Verify Dodo Payments webhook signature using Standard Webhooks.
    Returns True if signature is valid, False otherwise.
    """
    webhook_secret = DodoSettings.webhook_secret()
    
    # Log webhook headers for debugging
    logger.info(f"🔍 Webhook headers: {dict(headers)}")
    logger.info(f"🔍 Webhook payload size: {len(payload)} bytes")
    
    if not webhook_secret:
        logger.warning("⚠ DODO_WEBHOOK_SECRET not configured - webhook verification disabled (INSECURE)")
        # For debugging, allow webhooks to pass through if no secret is configured
        return True
    
    try:
        # Standard Webhooks headers
        webhook_id = headers.get("webhook-id") or headers.get("svix-id")
        webhook_timestamp = headers.get("webhook-timestamp") or headers.get("svix-timestamp")
        webhook_signature = headers.get("webhook-signature") or headers.get("svix-signature")
        
        if not all([webhook_id, webhook_timestamp, webhook_signature]):
            logger.error("❌ Missing webhook verification headers")
            return False
        
        # Verify timestamp is recent (within 5 minutes)
        try:
            timestamp = int(webhook_timestamp)
            current_time = int(datetime.utcnow().timestamp())
            if abs(current_time - timestamp) > 300:  # 5 minutes
                logger.error(f"❌ Webhook timestamp too old or in future: {timestamp} vs {current_time}")
                return False
        except ValueError:
            logger.error(f"❌ Invalid webhook timestamp: {webhook_timestamp}")
            return False
        
        # Construct signed content: webhook_id.timestamp.payload
        signed_content = f"{webhook_id}.{webhook_timestamp}.{payload.decode('utf-8')}"
        
        # Calculate expected signature using HMAC SHA256
        import hmac
        import hashlib
        import base64
        
        expected_signature = base64.b64encode(
            hmac.new(
                webhook_secret.encode('utf-8'),
                signed_content.encode('utf-8'),
                hashlib.sha256
            ).digest()
        ).decode('utf-8')
        
        # Dodo may send multiple signatures (v1=sig1,v2=sig2)
        # We need to check if any of them match
        signatures = webhook_signature.split(',')
        for sig in signatures:
            sig = sig.strip()
            if sig.startswith('v1='):
                sig_value = sig[3:]  # Remove 'v1=' prefix
                if hmac.compare_digest(sig_value, expected_signature):
                    return True
        
        logger.error(f"❌ Webhook signature mismatch")
        return False
        
    except Exception as exc:
        logger.error(f"❌ Webhook signature verification error: {exc}")
        return False


async def _check_webhook_idempotency(webhook_id: str, event_type: str) -> bool:
    """
    Check if webhook has already been processed.
    Returns True if this is a new webhook, False if already processed.
    """
    async with app.state.pool.acquire() as conn:  # type: ignore[attr-defined]
        # Check if webhook_id already exists
        existing = await conn.fetchval(
            """
            SELECT 1 FROM processed_webhooks 
            WHERE webhook_id = $1 AND provider = 'dodo'
            """,
            webhook_id
        )
        
        if existing:
            logger.warning(f"⚠ Duplicate webhook detected: {webhook_id}")
            return False
        
        # Store webhook_id to prevent reprocessing
        try:
            await conn.execute(
                """
                INSERT INTO processed_webhooks (webhook_id, provider, event_type, processed_at)
                VALUES ($1, 'dodo', $2, NOW())
                """,
                webhook_id,
                event_type
            )
        except Exception:
            # Unique constraint violation - webhook already processed
            logger.warning(f"⚠ Webhook {webhook_id} already processed (race condition)")
            return False
        
        return True


async def _handle_guest_payment_succeeded(public_token: str, amount: float) -> None:
    """Handle successful payment for guest orders"""
    from routers.guest_actions import complete_guest_payment
    
    try:
        result = await complete_guest_payment(
            public_token=public_token,
            provider="dodo",
            provider_reference=public_token,
            amount=amount,
            currency="USD",
            payload={"completed_at": datetime.utcnow().isoformat()},
            is_final=True
        )
        logger.info(f"✓ Guest payment succeeded: {public_token} - ${amount}")
    except Exception as exc:
        logger.error(f"❌ Failed to complete guest payment {public_token}: {exc}")
        raise


@router.post("/webhook")
async def dodo_webhook(request: Request):
    """
    Webhook endpoint for Dodo Payments notifications.
    Called by Apache proxy from https://paiement.botagram.fr/webhook/dodo
    
    Handles the following events:
    - payment.succeeded: Payment completed successfully
    - payment.failed: Payment failed
    - payment.cancelled: Payment cancelled by user
    - payment.processing: Payment is being processed (informational)
    - refund.succeeded: Refund completed successfully
    - refund.failed: Refund failed
    
    Webhook uses Standard Webhooks specification.
    See: https://standardwebhooks.com/
    
    Required headers for verification:
    - webhook-id (or svix-id)
    - webhook-signature (or svix-signature)
    - webhook-timestamp (or svix-timestamp)
    """
    # Get raw body for signature verification
    raw_body = await request.body()
    headers = dict(request.headers)
    
    # Verify webhook signature
    if not await _verify_webhook_signature(raw_body, headers):
        logger.error("❌ Webhook signature verification failed")
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    # Parse body
    try:
        payload = json.loads(raw_body)
        logger.info(f"📄 Webhook payload: {json.dumps(payload, indent=2)}")
    except json.JSONDecodeError:
        logger.error("❌ Invalid JSON in webhook body")
        raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = payload.get("event_type") or payload.get("type")
    data = payload.get("data", {})
    metadata = data.get("metadata", {})
    
    # Extract identifiers
    order_id = metadata.get("order_id")
    public_token = metadata.get("public_token")  # For guest orders
    webhook_id = headers.get("webhook-id") or headers.get("svix-id") or str(uuid.uuid4())
    
    logger.info(f"📥 Received Dodo webhook: {event_type} | order_id={order_id} | public_token={public_token} | webhook_id={webhook_id}")
    logger.info(f"📄 Webhook data: {json.dumps(data, indent=2)}")
    logger.info(f"📄 Webhook metadata: {json.dumps(metadata, indent=2)}")
    
    # Check idempotency
    if not await _check_webhook_idempotency(webhook_id, event_type):
        logger.info(f"ℹ Webhook {webhook_id} already processed - returning success")
        return {"status": "already_processed", "webhook_id": webhook_id}
    
    try:
        # Extract payment amount from webhook data (Dodo sends amounts in cents)
        webhook_amount = float(data.get("amount", 0)) / 100.0 if data.get("amount") else None
        
        # Handle based on order type
        is_guest_order = bool(public_token and not order_id)
        
        if event_type in ["payment.succeeded", "charge.succeeded"]:
            if is_guest_order:
                await _handle_guest_payment_succeeded(public_token, webhook_amount or 0)
            elif order_id:
                await _handle_payment_succeeded(order_id)
            else:
                logger.warning(f"⚠ Payment succeeded webhook without order_id or public_token")
                return {"status": "received", "warning": "no_identifier"}
            
        elif event_type in ["payment.failed", "charge.failed"]:
            if order_id:
                reason = data.get("failure_reason") or data.get("error_message", "unknown")
                await _handle_payment_failed(order_id, reason)
            else:
                logger.info(f"ℹ Payment failed for guest order {public_token}")
            
        elif event_type in ["payment.cancelled", "charge.cancelled"]:
            if order_id:
                await _handle_payment_cancelled(order_id)
            else:
                logger.info(f"ℹ Payment cancelled for guest order {public_token}")
            
        elif event_type == "payment.processing":
            logger.info(f"ℹ Payment processing for order {order_id or public_token}")
            
        elif event_type == "refund.succeeded":
            if order_id:
                refund_amount = float(data.get("refund_amount", 0))
                await _handle_refund_succeeded(order_id, refund_amount)
            
        elif event_type == "refund.failed":
            if order_id:
                reason = data.get("failure_reason") or data.get("error_message", "unknown")
                await _handle_refund_failed(order_id, reason)
            
        else:
            logger.warning(f"⚠ Unhandled webhook event type: {event_type}")
            return {"status": "received", "warning": "unhandled_event_type"}
        
        return {"status": "processed", "event_type": event_type, "webhook_id": webhook_id}
        
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"❌ Error processing Dodo webhook {event_type}: {exc}")
        # Return 200 to prevent webhook retries for application errors
        return {"status": "error", "message": str(exc), "webhook_id": webhook_id}

