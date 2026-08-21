import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import {
  getCaseStudies,
  getServices,
  getStats,
} from '~/data/agency.server';

export const meta: MetaFunction = () => [
  { title: 'Agency7 — Teams that ship' },
  {
    name: 'description',
    content:
      'Agency7 is a senior product studio. We embed with your team to design, build, and grow software that ships.',
  },
];

export const loader = async () => {
  return json({
    services: getServices(),
    stats: getStats(),
    caseStudies: getCaseStudies(),
  });
};

export default function IndexRoute() {
  const { services, stats, caseStudies } = useLoaderData<typeof loader>();

  return (
    <>
      <section className='relative overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(51,85,255,0.35),transparent)]' />
        <div className='container-page relative flex flex-col items-center gap-8 py-28 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300'>
            <span className='h-2 w-2 rounded-full bg-accent-500' />
            Now booking Q3 engagements
          </span>
          <h1 className='max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl'>
            The senior team behind
            <span className='block bg-gradient-to-r from-brand-300 to-accent-400 bg-clip-text text-transparent'>
              products that ship.
            </span>
          </h1>
          <p className='max-w-2xl text-lg text-slate-400'>
            Agency7 embeds strategists, designers, and engineers with your team
            to take ideas from whiteboard to production — fast, and without the
            hand-off.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link to='/contact' prefetch='intent' className='btn-primary'>
              Start a project
            </Link>
            <Link to='/team' prefetch='intent' className='btn-ghost'>
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className='border-y border-white/10 bg-ink-900/50'>
        <div className='container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-center'>
              <p className='text-3xl font-extrabold text-white sm:text-4xl'>
                {stat.value}
              </p>
              <p className='mt-1 text-sm text-slate-400'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id='services' className='scroll-mt-20'>
        <div className='container-page py-24'>
          <div className='max-w-2xl'>
            <p className='text-sm font-semibold uppercase tracking-widest text-brand-300'>
              What we do
            </p>
            <h2 className='mt-3 text-3xl font-bold sm:text-4xl'>
              One team, the whole product surface.
            </h2>
            <p className='mt-4 text-slate-400'>
              Skip the agency relay race. Every engagement is a cross-functional
              pod that owns outcomes end to end.
            </p>
          </div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {services.map((service) => (
              <article key={service.title} className='card'>
                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-xl text-brand-300'>
                  {service.icon}
                </span>
                <h3 className='mt-5 text-lg font-semibold'>{service.title}</h3>
                <p className='mt-2 text-sm text-slate-400'>
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='work' className='scroll-mt-20 border-t border-white/10'>
        <div className='container-page py-24'>
          <div className='max-w-2xl'>
            <p className='text-sm font-semibold uppercase tracking-widest text-brand-300'>
              Selected work
            </p>
            <h2 className='mt-3 text-3xl font-bold sm:text-4xl'>
              Outcomes, not deliverables.
            </h2>
          </div>

          <div className='mt-12 grid gap-6 md:grid-cols-3'>
            {caseStudies.map((study) => (
              <article
                key={study.client}
                className='card flex flex-col justify-between'
              >
                <div>
                  <span className='inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300'>
                    {study.tag}
                  </span>
                  <h3 className='mt-4 text-lg font-semibold'>{study.client}</h3>
                  <p className='mt-2 text-sm text-slate-400'>{study.outcome}</p>
                </div>
                <p className='mt-6 text-2xl font-extrabold text-accent-400'>
                  {study.metric}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='border-t border-white/10'>
        <div className='container-page py-24'>
          <div className='card flex flex-col items-center gap-6 bg-gradient-to-br from-brand-600/20 to-accent-500/10 p-12 text-center'>
            <h2 className='max-w-2xl text-3xl font-bold sm:text-4xl'>
              Ready to ship something your users love?
            </h2>
            <p className='max-w-xl text-slate-300'>
              Tell us what you&apos;re building. We&apos;ll come back with a plan
              and a team within days.
            </p>
            <Link to='/contact' prefetch='intent' className='btn-primary'>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
