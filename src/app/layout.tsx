import clsx from 'clsx';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './header';
import { Footer } from './footer';
import Fathom from './fathom';

const inter = Inter({ subsets: ['latin'] });

const title = "Léo Pradel's blog";
const description =
  'Co-founder @sigleapp • @ledokku • @accountsjs • Sharing the journey and thoughts on Web3 and tech.';

export const metadata: Metadata = {
  metadataBase: new URL('https://leopradel.com'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://www.leopradel.com',
    siteName: title,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    site: '@leopradel',
    creator: '@leopradel',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://www.leopradel.com/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(inter.className, 'text-gray-900 antialiased')}
        suppressHydrationWarning={true}
      >
        <Fathom />
        <Header />
        <main className="mx-auto mb-12 mt-20 max-w-3xl px-6 xl:px-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
