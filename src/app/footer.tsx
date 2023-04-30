import React from 'react';
import { config } from '../config';
import { GithubIcon } from '../icons/Github';
import { ProducthuntIcon } from '../icons/Producthunt';
import { RssIcon } from '../icons/Rss';
import { TwitterIcon } from '../icons/Twitter';

export const Footer = () => {
  return (
    <footer className="mx-auto mb-4 mt-20 max-w-3xl px-6 xl:px-12">
      <ul className="flex justify-center space-x-3">
        <li>
          <a
            className="inline-block rounded border border-white p-2 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
            href={config.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block rounded border border-white p-2 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block rounded border border-white p-2 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
            href={config.productHunturl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProducthuntIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block rounded border border-white p-2 text-gray-600 hover:border-gray-200 hover:bg-gray-100"
            href={config.rssUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RssIcon className="h-5 w-5" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
