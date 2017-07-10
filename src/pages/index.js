import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import 'reset-css/reset.css';
import 'typeface-raleway';
import '../styles/style.css';
import twitter from '../icons/twitter.svg';
import github from '../icons/github.svg';

const Home = ({ data }) => (
  <div className="container">
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {data.site.siteMetadata.title}
      </title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>

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

export default Home;

// eslint-disable-next-line
export const pageQuery = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        description
        twitter
        github
      }
    }
  }
`;
