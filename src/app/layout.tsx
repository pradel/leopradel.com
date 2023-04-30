import clsx from 'clsx';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './header';
import { Footer } from './footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'antialiased')}>
        <Header />
        <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
