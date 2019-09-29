import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'reset-css/reset.css';
import 'typeface-raleway';
import '../styles/style.css';
import SEO from '../components/seo';
import twitter from '../icons/twitter.svg';
import github from '../icons/github.svg';

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
    <div className="container">
      <SEO title="Home" />

      <h1>{data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
      <div className="social-icons">
        <a href={data.site.siteMetadata.twitter} target="_blank">
          <img src={twitter} alt="twitter" />
        </a>
        <a href={data.site.siteMetadata.github} target="_blank">
          <img src={github} alt="github" />
        </a>
      </div>
    </div>
  );
};

export default Home;
