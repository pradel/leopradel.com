import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import twitter from '../icons/twitter.svg';
import github from '../icons/github.svg';
import { containerClasses } from '../utils';

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query SiteMetadataFooter {
      site {
        siteMetadata {
          twitter
          github
        }
      }
    }
  `);

  return (
    <footer className={`${containerClasses} py-8`}>
      <ul className="flex justify-end">
        <li className="mr-4">
          <a
            href={data.site.siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="h-6" src={twitter} alt="twitter" />
          </a>
        </li>
        <li>
          <a
            href={data.site.siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="h-6" src={github} alt="github" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
