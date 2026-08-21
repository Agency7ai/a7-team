import { Link, NavLink } from '@remix-run/react';

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: 'Services', to: '/#services' },
  { label: 'Work', to: '/#work' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur'>
      <nav
        aria-label='Primary'
        className='container-page flex h-16 items-center justify-between'
      >
        <Link
          to='/'
          prefetch='intent'
          className='flex items-center gap-2 text-lg font-extrabold tracking-tight'
        >
          <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-glow'>
            a7
          </span>
          <span>
            Agency<span className='text-brand-400'>7</span>
          </span>
        </Link>

        <ul className='hidden items-center gap-8 md:flex'>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                prefetch='intent'
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-white ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to='/contact' prefetch='intent' className='btn-primary'>
          Start a project
        </Link>
      </nav>
    </header>
  );
}
