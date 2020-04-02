import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import * as Fathom from 'fathom-client';
// TODO move this to the blog post page once next.js support css imports in files
import 'highlight.js/styles/kimbie.light.css';
import 'typeface-quicksand';
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

  return <Component {...pageProps} />;
};

export default App;
