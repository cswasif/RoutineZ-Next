# RoutineZ Frontend

This is a [Next.js](https://nextjs.org) project for RoutineZ, a schedule management application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages.

### Prerequisites

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

### Deployment Steps

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
wrangler pages deploy .next
```

### Environment Variables

Configure the following environment variables in the Cloudflare Pages dashboard:
- `NEXT_TELEMETRY_DISABLED`: 1

## Local Development with Wrangler

To test the Cloudflare Pages setup locally:

```bash
wrangler pages dev .next --compatibility-date=2023-12-01
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
