import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'a7.team — Agency7 Inc.',
  description: 'Anders Kitson at Agency7: we make teams AI-native. Based in Edmonton, Alberta.',
  metadataBase: new URL('https://a7.team'),
  openGraph: {
    title: 'a7.team — Agency7 Inc.',
    description: 'Anders Kitson at Agency7: we make teams AI-native. Based in Edmonton, Alberta.',
    url: 'https://a7.team',
    siteName: 'a7.team',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} antialiased`}
    >
      <body data-theme="dark">{children}</body>
    </html>
  );
}
