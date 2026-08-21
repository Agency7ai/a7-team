import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import { SiteFooter } from '~/components/site-footer';
import { SiteHeader } from '~/components/site-header';
import styles from '~/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  },
  { rel: 'stylesheet', href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='min-h-screen bg-ink-950'>
        <div className='flex min-h-screen flex-col'>
          <SiteHeader />
          <main className='flex-1'>{children}</main>
          <SiteFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong';

  const message = isRouteErrorResponse(error)
    ? error.data ?? 'The page you are looking for could not be found.'
    : 'An unexpected error occurred. Please try again.';

  return (
    <div className='container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center'>
      <p className='text-sm font-semibold uppercase tracking-widest text-brand-300'>
        Error
      </p>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='max-w-md text-slate-400'>{message}</p>
      <a className='btn-primary mt-2' href='/'>
        Back to home
      </a>
    </div>
  );
}
