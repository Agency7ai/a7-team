import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import { getTeam } from '~/data/agency.server';

export const meta: MetaFunction = () => [
  { title: 'Team — Agency7' },
  {
    name: 'description',
    content: 'Meet the senior operators behind Agency7.',
  },
];

export const loader = async () => {
  return json({ team: getTeam() });
};

export default function TeamRoute() {
  const { team } = useLoaderData<typeof loader>();

  return (
    <section>
      <div className='container-page py-24'>
        <div className='max-w-2xl'>
          <p className='text-sm font-semibold uppercase tracking-widest text-brand-300'>
            The people
          </p>
          <h1 className='mt-3 text-4xl font-extrabold sm:text-5xl'>
            Senior by default.
          </h1>
          <p className='mt-4 text-slate-400'>
            No juniors learning on your dime. Every Agency7 pod is staffed with
            operators who have shipped and scaled real products.
          </p>
        </div>

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {team.map((member) => (
            <article key={member.name} className='card flex items-center gap-4'>
              <span className='flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-500/20 text-lg font-bold text-brand-200'>
                {member.initials}
              </span>
              <div>
                <h2 className='text-lg font-semibold'>{member.name}</h2>
                <p className='text-sm text-brand-300'>{member.role}</p>
                <p className='mt-1 text-sm text-slate-400'>{member.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
