# API Testing Commands for Botagram Payment Integration

## 1. Test Quote Endpoint (GET pricing first)
```bash
curl -X POST "https://paiement.botagram.fr/api/guest/quote" \
  -H "Content-Type: application/json" \
  -H "Origin: https://botagram.fr" \
  -H "Referer: https://botagram.fr/bots" \
  -d '{
    "order_type": "single",
    "currency": "EUR",
    "single": {
      "service_id": "Instagram",
      "quantity": 1,
      "target_url": "https://botagram.fr/bots/instagram",
      "comments": "Bot d'\''automatisation pour Instagram"
    }
  }'
```

## 2. Test Checkout Endpoint (Create payment link)
```bash
curl -X POST "https://paiement.botagram.fr/api/guest/checkout" \
  -H "Content-Type: application/json" \
  -H "Origin: https://botagram.fr" \
  -H "Referer: https://botagram.fr/bots" \
  -d '{
    "order": {
      "order_type": "single",
      "currency": "EUR",
      "single": {
        "service_id": "Instagram",
        "quantity": 1,
        "target_url": "https://botagram.fr/bots/instagram",
        "comments": "Bot d'\''automatisation pour Instagram"
      }
    },
    "payment_method": "dodo",
    "return_url": "https://paiement.botagram.fr/dodo/payment/success",
    "cancel_url": "https://paiement.botagram.fr/dodo/payment/failed",
    "contact_email": "test@example.com"
  }'
```

## 3. Test with Different Bot (Twitter)
```bash
curl -X POST "https://paiement.botagram.fr/api/guest/checkout" \
  -H "Content-Type: application/json" \
  -H "Origin: https://botagram.fr" \
  -H "Referer: https://botagram.fr/bots" \
  -d '{
    "order": {
      "order_type": "single",
      "currency": "EUR",
      "single": {
        "service_id": "Twitter",
        "quantity": 1,
        "target_url": "https://botagram.fr/bots/twitter",
        "comments": "Bot d'\''automatisation pour Twitter"
      }
    },
    "payment_method": "dodo",
    "return_url": "https://paiement.botagram.fr/dodo/payment/success",
    "cancel_url": "https://paiement.botagram.fr/dodo/payment/failed"
  }'
```

## 4. Test with Real SMM Service (should fail for bot purchase)
```bash
curl -X POST "https://paiement.botagram.fr/api/guest/checkout" \
  -H "Content-Type: application/json" \
  -H "Origin: https://botagram.fr" \
  -H "Referer: https://botagram.fr/bots" \
  -d '{
    "order": {
      "order_type": "single",
      "currency": "EUR",
      "single": {
        "service_id": "some_real_service_id",
        "quantity": 1,
        "target_url": "https://example.com",
        "comments": "Real SMM service test"
      }
    },
    "payment_method": "dodo",
    "return_url": "https://paiement.botagram.fr/dodo/payment/success",
    "cancel_url": "https://paiement.botagram.fr/dodo/payment/failed"
  }'
```

## 5. Test CORS Preflight (OPTIONS request)
```bash
curl -X OPTIONS "https://paiement.botagram.fr/api/guest/checkout" \
  -H "Origin: https://botagram.fr" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

## 6. Test Status Endpoint (after getting public_token)
```bash
# Replace YOUR_PUBLIC_TOKEN with actual token from checkout response
curl -X GET "https://paiement.botagram.fr/api/guest/status/YOUR_PUBLIC_TOKEN" \
  -H "Origin: https://botagram.fr" \
  -H "Referer: https://botagram.fr/bots"
```

## Expected Responses:

### Quote Response (should work):
```json
{
  "amount": 29.99,
  "currency": "EUR",
  "items": [
    {
      "label": "Instagram Bot - Automatisation",
      "quantity": 1,
      "unit_price": 29.99,
      "total": 29.99
    }
  ],
  "order_type": "single"
}
```

### Checkout Response (should work):
```json
{
  "public_token": "uuid-here",
  "payment_method": "dodo",
  "amount": 29.99,
  "currency": "EUR",
  "payment": {
    "payment_url": "https://dodo-payment-link-here",
    "order_reference": "reference-here"
  }
}
```

## Debugging Steps:

1. **Test Quote first** - This should work and show bot pricing
2. **Check CORS** - The OPTIONS request should return 200, not 400
3. **Test Checkout** - This should create the Dodo payment link
4. **Check server logs** - Look for any errors in the guest_actions.py processing

## Common Issues:

- **CORS Error**: Add proper CORS headers in your FastAPI app
- **Validation Error**: Check the payload structure matches exactly
- **Database Error**: Make sure the guest user exists in the database
- **Dodo API Error**: Check Dodo API configuration and keys
