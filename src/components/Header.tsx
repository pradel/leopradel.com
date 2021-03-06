import React from 'react';
import NextLink from 'next/link';

export const Header = () => {
  return (
    <header className="mx-auto max-w-3xl px-6 xl:px-12 mt-6">
      <ul className="flex justify-end">
        <li className="mr-3">
          <NextLink href="/" passHref>
            <a className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-200 py-1 px-3">
              Home
            </a>
          </NextLink>
        </li>
        <li className="mr-3">
          <NextLink href="/blog" passHref>
            <a className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-200 py-1 px-3">
              Blog
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/projects" passHref>
            <a className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-200 py-1 px-3">
              Projects
            </a>
          </NextLink>
        </li>
      </ul>
    </header>
  );
};
