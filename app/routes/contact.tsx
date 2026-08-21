import { json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'Contact — Agency7' },
  {
    name: 'description',
    content: 'Tell Agency7 about your project and we will be in touch.',
  },
];

interface ContactFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactActionData {
  ok: boolean;
  errors?: ContactFieldErrors;
  values?: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const errors: ContactFieldErrors = {};

  if (name.length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (message.length < 10) {
    errors.message = 'Please tell us a little more (10+ characters).';
  }

  if (Object.keys(errors).length > 0) {
    return json<ContactActionData>(
      { ok: false, errors, values: { name, email, company, message } },
      { status: 400 },
    );
  }

  // In production this is where the lead would be persisted or forwarded.
  return json<ContactActionData>({ ok: true });
};

export default function ContactRoute() {
  const fetcher = useFetcher<ContactActionData>();
  const data = fetcher.data;
  const isSubmitting = fetcher.state !== 'idle';
  const errors = data?.errors;
  const values = data?.values;

  if (data?.ok) {
    return (
      <section>
        <div className='container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center'>
          <span className='flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20 text-2xl text-accent-400'>
            ✓
          </span>
          <h1 className='text-3xl font-bold'>Thanks — message received.</h1>
          <p className='max-w-md text-slate-400'>
            A member of the Agency7 team will reach out within one business day.
          </p>
          <a className='btn-ghost mt-2' href='/'>
            Back to home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='container-page grid gap-12 py-24 lg:grid-cols-2'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-widest text-brand-300'>
            Start a project
          </p>
          <h1 className='mt-3 text-4xl font-extrabold sm:text-5xl'>
            Let&apos;s build together.
          </h1>
          <p className='mt-4 max-w-md text-slate-400'>
            Share a few details about what you&apos;re working on. We reply to
            every inquiry, usually within a day.
          </p>

          <dl className='mt-10 space-y-4 text-sm'>
            <div>
              <dt className='text-slate-500'>Email</dt>
              <dd className='text-slate-200'>hello@a7.team</dd>
            </div>
            <div>
              <dt className='text-slate-500'>Engagements</dt>
              <dd className='text-slate-200'>
                Product pods, from 6-week sprints to embedded teams.
              </dd>
            </div>
          </dl>
        </div>

        <fetcher.Form method='post' noValidate className='card space-y-5'>
          <Field
            label='Name'
            name='name'
            defaultValue={values?.name}
            error={errors?.name}
            required
          />
          <Field
            label='Work email'
            name='email'
            type='email'
            defaultValue={values?.email}
            error={errors?.email}
            required
          />
          <Field
            label='Company'
            name='company'
            defaultValue={values?.company}
          />

          <div>
            <label
              htmlFor='message'
              className='mb-2 block text-sm font-medium text-slate-200'
            >
              What are you building?
              <span className='text-brand-400'> *</span>
            </label>
            <textarea
              id='message'
              name='message'
              rows={5}
              defaultValue={values?.message}
              aria-invalid={errors?.message ? true : undefined}
              aria-describedby={errors?.message ? 'message-error' : undefined}
              className='w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40'
            />
            {errors?.message ? (
              <p id='message-error' className='mt-1.5 text-sm text-red-400'>
                {errors.message}
              </p>
            ) : null}
          </div>

          <button
            type='submit'
            className='btn-primary w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </fetcher.Form>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  error,
  required,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-sm font-medium text-slate-200'
      >
        {label}
        {required ? <span className='text-brand-400'> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className='w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40'
      />
      {error ? (
        <p id={`${name}-error`} className='mt-1.5 text-sm text-red-400'>
          {error}
        </p>
      ) : null}
    </div>
  );
}
