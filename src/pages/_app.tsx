import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import * as Fathom from 'fathom-client';
import { DefaultSeo } from 'next-seo';
import 'typeface-quicksand';
// highlight.js theme
import '../styles/kimbie.light.css';
import '../styles/index.css';
import { config } from '../config';

// TODO default SEO

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load();
      Fathom.setSiteId(config.fathomSiteId);
      Fathom.trackPageview();
    }
  }, []);

  return (
    <React.Fragment>
      <DefaultSeo
        openGraph={{
          type: 'website',
          url: 'https://leopradel.com/',
          site_name: 'leopradel',
          title: 'Leo Pradel',
          description:
            'Oss contributor passionate about nodejs, react and graphql.',
        }}
        twitter={{
          handle: '@leopradel',
          site: '@leopradel',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default App;
