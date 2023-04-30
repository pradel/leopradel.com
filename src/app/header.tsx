import React from 'react';
import Link from 'next/link';

export const Header = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <header className="mx-auto mt-6 max-w-3xl px-6 font-sans xl:px-12">
      <ul className="flex justify-end space-x-3">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              className="rounded border border-white px-3 py-2 font-medium hover:bg-gray-100 hover:text-gray-700"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
