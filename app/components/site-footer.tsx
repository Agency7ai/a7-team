import { Link } from '@remix-run/react';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-white/10 bg-ink-900'>
      <div className='container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row'>
        <div className='flex items-center gap-2 text-sm font-semibold'>
          <span className='flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-xs text-white'>
            a7
          </span>
          <span className='text-slate-300'>a7.team</span>
        </div>

        <p className='text-sm text-slate-500'>
          &copy; {year} Agency7. Building teams that ship.
        </p>

        <div className='flex items-center gap-6 text-sm text-slate-400'>
          <Link to='/team' prefetch='intent' className='transition hover:text-white'>
            Team
          </Link>
          <Link
            to='/contact'
            prefetch='intent'
            className='transition hover:text-white'
          >
            Contact
          </Link>
          <a
            href='mailto:hello@a7.team'
            className='transition hover:text-white'
          >
            hello@a7.team
          </a>
        </div>
      </div>
    </footer>
  );
}
