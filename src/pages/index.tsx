import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'typeface-raleway';
import SEO from '../components/seo';
import twitter from '../icons/twitter.svg';
import github from '../icons/github.svg';

const projects = [
  {
    name: 'accounts-js',
    description:
      'Fullstack authentication and accounts-management for JavaScript.',
    githubUrl: 'https://github.com/accounts-js/accounts',
  },
  {
    name: 'Sigle',
    description: 'A beautiful decentralized and open source blog maker.',
    githubUrl: 'https://github.com/pradel/sigle',
  },
  {
    name: 'react-responsive-modal',
    description: 'A simple responsive and accessible react modal.',
    githubUrl: 'https://github.com/pradel/react-responsive-modal',
  },
  {
    name: 'Twoblocks',
    description: 'Free and open source 2fa manager built with Blockstack.',
    githubUrl: 'https://github.com/pradel/twoblocks',
  },
  {
    name: 'node-intagram',
    description: 'Instagram api client for node that support promises.',
    githubUrl: 'https://github.com/pradel/node-instagram',
  },
  {
    name: 'react-google-photo',
    description: 'React lightbox component using the google photo style.',
    githubUrl: 'https://github.com/pradel/react-google-photo',
  },
  {
    name: 'react-minimalist-portal',
    description: 'A minimalist portal for react.',
    githubUrl: 'https://github.com/pradel/react-minimalist-portal',
  },
  {
    name: 'react-blockstack-button',
    description: 'React component to display a login with blockstack button.',
    githubUrl: 'https://github.com/pradel/react-blockstack-button',
  },
  {
    name: 'craco-blockstack',
    description: 'A craco plugin to use Blockstack with create-react-app.',
    githubUrl: 'https://github.com/pradel/craco-blockstack',
  },
];

const Home = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          twitter
          github
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <SEO title="Home" />

      <div className="container-head">
        <h1>{data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.description}</p>
        <div className="social-icons">
          <a
            href={data.site.siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            href={data.site.siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" />
          </a>
        </div>
      </div>

      <div className="container-projects">
        <h1>Some projects</h1>

        <div className="list">
          {projects.map((project, index) => (
            <article key={index}>
              <a href={project.githubUrl}>
                <span className="title">{project.name}</span>
                <span className="description">{project.description}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
