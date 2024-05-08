'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
];

export const Header = () => {
  const path = usePathname();

  return (
    <header className="mx-auto mt-6 max-w-3xl px-6 font-sans xl:px-12">
      <ul className="flex justify-end space-x-3">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
            >
              <Link
                href={href}
                className={cn(
                  'transition-colors rounded px-3 py-2 font-medium hover:bg-gray-100',
                  {
                    'font-bold': path === href,
                  },
                )}
              >
                {label}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </header>
  );
};
