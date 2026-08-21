import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900">
              Agency7
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 max-w-2xl mx-auto">
              We make teams AI-native.
            </p>
          </div>

          <div className="space-y-6 text-lg text-zinc-700 max-w-2xl mx-auto">
            <p>
              Agency7 Inc. is an AI automation and web development agency based in Edmonton, Alberta.
              We deploy AI into your business, train your company, and install the first workflows your team will actually use.
            </p>
            <p>
              We ship software, not strategy decks.
            </p>
          </div>

          <div className="pt-6 space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-medium text-zinc-900">Contact Anders Kitson</p>
              <a
                href="mailto:anders@a7.team"
                className="text-lg text-blue-600 hover:text-blue-700 transition-colors"
              >
                anders@a7.team
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://agency7.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Visit Agency7.ca
              </a>
              <a
                href="https://agency7.ca/#book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-900 bg-white border-2 border-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/about"
              className="text-base text-zinc-600 hover:text-zinc-900 transition-colors underline underline-offset-4"
            >
              About this domain
            </Link>
          </div>
        </div>
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
