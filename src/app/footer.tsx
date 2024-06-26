import React from 'react';
import { config } from '../config';
import { GithubIcon } from '../icons/Github';
import { ProducthuntIcon } from '../icons/Producthunt';
import { RssIcon } from '../icons/Rss';
import { TwitterIcon } from '../icons/Twitter';

const links = [
  {
    href: config.twitterUrl,
    icon: <TwitterIcon className="size-5" />,
    label: 'Twitter',
  },
  {
    href: config.githubUrl,
    icon: <GithubIcon className="size-5" />,
    label: 'Github',
  },
  {
    href: config.productHunturl,
    icon: <ProducthuntIcon className="size-5" />,
    label: 'Product Hunt',
  },
  { href: config.rssUrl, icon: <RssIcon className="size-5" />, label: 'RSS' },
];

export const Footer = () => {
  return (
    <footer className="mx-auto mb-4 mt-20 max-w-3xl px-6 xl:px-12">
      <ul className="flex justify-center space-x-3">
        {links.map(({ href, icon, label }) => (
          <li key={href}>
            <a
              className="inline-block rounded p-2 text-gray-600 transition hover:scale-110 hover:bg-gray-100"
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
