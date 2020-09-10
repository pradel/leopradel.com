import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import * as Fathom from 'fathom-client';
import { DefaultSeo } from 'next-seo';
import 'typeface-quicksand';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';
import { config } from '../config';
import Head from 'next/head';

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(config.fathomSiteId);
      Fathom.trackPageview();
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <DefaultSeo
        openGraph={{
          type: 'website',
          url: 'https://www.leopradel.com/',
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
        additionalMetaTags={[
          {
            name: 'monetization',
            content: '$ilp.uphold.com/W3NakGUezfKy',
          },
        ]}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default App;
