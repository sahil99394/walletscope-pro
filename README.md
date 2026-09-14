# WalletScope Pro V2

V2 adds:
- Live EVM wallet data through a server-side Alchemy integration.
- Token balance lookup.
- Recent outgoing/incoming transfer lookup.
- Whale-alert UI and webhook endpoint.
- Paid subscription pricing UI.
- Demo fallback when no API key is configured.
- Server-only environment variables.

## Run
Node.js 18+:
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add `ALCHEMY_API_KEY=...`
4. `npm run dev`
5. Open http://localhost:3000

The Alchemy key is intentionally server-side; do not prefix it with `NEXT_PUBLIC_`.

## Live data
The `/api/wallet` route uses Alchemy JSON-RPC/Data APIs for supported EVM networks. The Token API can retrieve ERC-20 balances and the Transfers API can retrieve historical transfers. Alchemy Address Activity webhooks can be used for real-time transfer events.

## Whale alerts
`/api/webhook/alchemy` is a starter listener. Before production:
- Configure an Address Activity webhook.
- Verify the provider's webhook signature according to its current documentation.
- Store watched wallets and per-user thresholds in a database.
- Deduplicate webhook event IDs.
- Queue alert processing.
- Send email/Telegram/Discord/push notifications.
- Enforce subscription limits server-side.

## Paid subscriptions
The pricing UI is included, but no real payment credentials are included. Connect Stripe/Razorpay or a compliant crypto payment provider on the server. Verify payments through provider webhooks before upgrading a user's plan.

## Security
- Never request seed phrases/private keys.
- Keep API/payment secrets in server-only environment variables.
- Validate addresses server-side.
- Add rate limiting, authentication, database persistence and audit logging before launch.
- This app is analytics/monitoring software, not investment advice or a trading system.
