import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About a7.team — Agency7',
  description: 'a7.team is the sales inbox domain for Agency7 Inc., Anders Kitson and team.',
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-zinc-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto space-y-8 text-lg text-zinc-700">
          <h1 className="text-4xl font-bold text-zinc-900">About this domain</h1>

          <div className="space-y-4">
            <p>
              <strong className="text-zinc-900">a7.team</strong> is the sales inbox domain for Agency7 Inc.
            </p>

            <p>
              If you received an email from Anders Kitson at{' '}
              <a href="mailto:anders@a7.team" className="text-blue-600 hover:text-blue-700">
                anders@a7.team
              </a>
              , this is Agency7 — a real Edmonton company building AI automation and web development for Alberta businesses.
            </p>

            <p>
              We use this dedicated domain for outbound sales to keep our primary business domain clean
              and maintain clear identity separation between operational email and outreach.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Who is Agency7?</h2>

            <p>
              Agency7 Inc. is an AI automation and web development agency based in Edmonton and Sherwood Park, Alberta.
              We deploy AI into businesses, train companies to be AI-native, and install the first workflows
              teams will actually use.
            </p>

            <p>
              Founded by Anders Kitson (engineer) and Salim Aden, we ship software, not consulting decks.
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Main agency site: <a href="https://agency7.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">agency7.ca</a></li>
              <li>OpenClaw + Paperclip automation: <a href="https://agency7.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">agency7.ai</a></li>
            </ul>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-zinc-900">What we do</h2>

            <p>
              We make teams AI-native. That means deploying real AI workflows, training your team on those tools,
              and ensuring the first AI implementations actually get used.
            </p>

            <p>
              We work with Edmonton and Alberta-based businesses: trades, clinics, law firms, real estate,
              home services, and local B2B companies.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Contact</h2>

            <p>
              Reach Anders Kitson at{' '}
              <a href="mailto:anders@a7.team" className="text-blue-600 hover:text-blue-700">
                anders@a7.team
              </a>
              {' '}or visit{' '}
              <a href="https://agency7.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                agency7.ca
              </a>
              {' '}to learn more and book a call.
            </p>
          </div>
        </article>
      </main>

      <footer className="border-t border-zinc-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-zinc-600">
          <p>Agency7 Inc.</p>
          <p>Edmonton, Alberta, Canada</p>
        </div>
      </footer>
    </div>
  );
}
