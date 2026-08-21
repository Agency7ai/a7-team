# a7-team

Public site for **a7.team** — Agency7 sales and team identity.

Built with [Remix](https://remix.run) (Vite), [Tailwind CSS](https://tailwindcss.com), and TypeScript.

## Requirements

- Node.js `>=20`
- npm (repo ships an `package-lock.json`)

## Getting started

```sh
npm install
npm run dev
```

The dev server runs on [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (HMR) on port 3000 |
| `npm run build` | Production build (`build/server` + `build/client`) |
| `npm run start` | Serve the production build with `remix-serve` |
| `npm run typecheck` | Type-check the project with `tsc` |
| `npm run lint` | Lint with ESLint |

## Project structure

```
app/
  components/     Shared layout components (header, footer)
  data/           Server-side content (services, work, team)
  routes/         Route modules (_index, team, contact)
  root.tsx        Root layout + error boundary
  tailwind.css    Tailwind entrypoint + component styles
```

## Pages

- `/` — Landing page: hero, stats, services, selected work, CTA.
- `/team` — Team roster (server-loaded).
- `/contact` — Contact form with server-side validation via a Remix action.
