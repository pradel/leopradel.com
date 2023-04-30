'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { GithubIcon } from '../icons/Github';
import { ProducthuntIcon } from '../icons/Producthunt';
import { RssIcon } from '../icons/Rss';
import { TwitterIcon } from '../icons/Twitter';

const links = [
  { href: config.twitterUrl, icon: <TwitterIcon className="h-5 w-5" /> },
  { href: config.githubUrl, icon: <GithubIcon className="h-5 w-5" /> },
  {
    href: config.productHunturl,
    icon: <ProducthuntIcon className="h-5 w-5" />,
  },
  { href: config.rssUrl, icon: <RssIcon className="h-5 w-5" /> },
];

export const Footer = () => {
  return (
    <footer className="mx-auto mb-4 mt-20 max-w-3xl px-6 xl:px-12">
      <ul className="flex justify-center space-x-3">
        {links.map(({ href, icon }) => (
          <li key={href}>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
            >
              <a
                className="inline-block rounded p-2 text-gray-600 transition-colors hover:bg-gray-100"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            </motion.div>
          </li>
        ))}
      </ul>
    </footer>
  );
};
