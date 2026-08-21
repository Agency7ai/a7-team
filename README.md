# a7.team

Public site for **a7.team** — Agency7's sales inbox domain.

This is the public face of Agency7 Inc. If someone Googles `a7.team` after getting an email from Anders Kitson, they see this site: clear identification that this is Agency7, a real Edmonton company, not a spam domain.

## About

- **Company**: Agency7 Inc., Edmonton / Sherwood Park, Alberta, Canada
- **Sites**: [agency7.ca](https://agency7.ca) (agency) and [agency7.ai](https://agency7.ai) (OpenClaw + Paperclip automation)
- **Founders**: Anders Kitson (engineer) and Salim Aden
- **What we do**: Deploy AI into businesses, train companies, make teams AI-native

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Cloudflare Pages** (deployment target)

## Local Development

### Prerequisites

- Node.js 20+ and npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Build the static site for production:

```bash
npm run build
```

The static output will be in the `out/` directory.

## Deploy to Cloudflare

### Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Wrangler CLI (already included as dev dependency)
- Domain `a7.team` configured in Cloudflare

### First-time setup

1. Authenticate with Cloudflare:

```bash
npx wrangler login
```

2. Create a Cloudflare Pages project:

```bash
npx wrangler pages project create a7-team
```

### Deploy

Deploy the site to Cloudflare Pages:

```bash
npm run pages:deploy
```

This command:
1. Builds the Next.js site as a static export
2. Deploys the `out/` directory to Cloudflare Pages

### Custom domain setup

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Select your `a7-team` project
3. Go to **Custom domains**
4. Add `a7.team` and follow DNS setup instructions

Cloudflare will automatically provision an SSL certificate.

## Project Structure

```
.
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage
│   ├── about/
│   │   └── page.tsx     # About page
│   └── globals.css      # Global styles
├── public/              # Static assets
├── next.config.ts       # Next.js config (static export)
├── wrangler.toml        # Cloudflare Pages config
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Scripts

- `npm run dev` — Start local development server
- `npm run build` — Build static export for production
- `npm run pages:deploy` — Build and deploy to Cloudflare Pages
- `npm run pages:dev` — Preview the built site locally with Wrangler
- `npm run lint` — Run ESLint

## Contact

**Anders Kitson**  
[anders@a7.team](mailto:anders@a7.team)

**Agency7 Inc.**  
Edmonton, Alberta, Canada  
[agency7.ca](https://agency7.ca)

## License

Copyright © 2026 Agency7 Inc. All rights reserved.
