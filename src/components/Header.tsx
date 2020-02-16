import React from 'react';
import { Link } from 'gatsby';
import { containerClasses } from '../utils';

export const Header = () => {
  return (
    <header className={`${containerClasses} py-4`}>
      <nav>
        <ul className="flex justify-end">
          <li className="mr-4">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
