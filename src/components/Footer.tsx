import React from 'react';
import { config } from '../config';
import { GithubIcon } from '../icons/Github';
import { ProducthuntIcon } from '../icons/Producthunt';
import { RssIcon } from '../icons/Rss';
import { TwitterIcon } from '../icons/Twitter';

export const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-4">
      <ul className="flex justify-center space-x-3">
        <li>
          <a
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 p-3"
            href={config.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 p-3"
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 p-3"
            href={config.productHunturl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProducthuntIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="inline-block border border-white rounded hover:border-gray-200 text-gray-600 hover:bg-gray-100 p-3"
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
