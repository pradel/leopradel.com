import React from 'react';
import NextLink from 'next/link';

export const Header = () => {
  return (
    <header className="mx-auto max-w-3xl px-6 xl:px-12 mt-6 font-sans">
      <ul className="flex justify-end">
        <li className="mr-3">
          <NextLink
            href="/"
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 py-1 px-3"
          >
            Home
          </NextLink>
        </li>
        <li className="mr-3">
          <NextLink
            href="/blog"
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 py-1 px-3"
          >
            Blog
          </NextLink>
        </li>
        <li>
          <NextLink
            href="/projects"
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 py-1 px-3"
          >
            Projects
          </NextLink>
        </li>
      </ul>
    </header>
  );
};
