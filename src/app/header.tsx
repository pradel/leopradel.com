import React from 'react';
import NextLink from 'next/link';

export const Header = () => {
  return (
    <header className="mx-auto mt-6 max-w-3xl px-6 font-sans xl:px-12">
      <ul className="flex justify-end">
        <li className="mr-3">
          <NextLink
            href="/"
            className="inline-block rounded border border-white px-3 py-1 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
          >
            Home
          </NextLink>
        </li>
        <li className="mr-3">
          <NextLink
            href="/blog"
            className="inline-block rounded border border-white px-3 py-1 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
          >
            Blog
          </NextLink>
        </li>
        <li>
          <NextLink
            href="/projects"
            className="inline-block rounded border border-white px-3 py-1 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
          >
            Projects
          </NextLink>
        </li>
      </ul>
    </header>
  );
};
