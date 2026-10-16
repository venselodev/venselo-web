# venselo-web

Marketing site for Venselo: one landing page in Spanish (`/`) and English (`/en`).
Same stack and look as the app (webcore): Next.js 16, Tailwind v4, shadcn/ui restyled to the Swiss grid, IBM Plex, next-intl.

```bash
pnpm install
cp .env.example .env.local   # fill in the values
pnpm dev                     # http://localhost:3004
pnpm lint && pnpm typecheck && pnpm build
```

## Where things live

| What | Where |
| --- | --- |
| All copy, both languages | `messages/es.json`, `messages/en.json` |
| Page sections | `src/components/landing/*` (one file per section) |
| Prices and agent limits | `src/constants/pricing.ts` (mirror of webcore's `PLANS`, keep in sync) |
| App screenshots | `public/screenshots/{es,en}/{name}-{dark,light}.png`, picked by `src/lib/screenshots.ts` |
| Contact form endpoint | `src/app/api/contact/route.ts` (sends with Resend) |
| Swiss grid tokens | `src/app/globals.css` (copied from webcore) and `src/components/ui/*` |

## Screenshots

The captures come from webcore's `qa-screenshots/` and still show QA data. Replace them with captures from a demo
account, keeping the file names. Missing today: Spanish light-theme captures and a Spanish alerts calendar; the
page falls back to the Spanish dark capture and the English calendar until they exist.

## Environment

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site (canonical, sitemap, Open Graph). Use `https://…` in production. |
| `NEXT_PUBLIC_APP_URL` | The app. "Comenzar" opens `/sign-up`, "Ingresar" opens `/sign-in`. |
| `NEXT_PUBLIC_DEMO_URL` | Optional booking link for "Agendar demo". Empty: it scrolls to the contact form. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact form. Without them the form shows an error and the API answers 503. |

## Deploy

`output: "standalone"` and a Dockerfile like webcore's, so it runs on Cloud Run:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://venselo.com \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.venselo.com \
  -t venselo-web .
```

Set the Resend variables on the Cloud Run service. It also deploys as-is on Vercel.
