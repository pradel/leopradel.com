import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
// TODO only import the one used
import '@fontsource/lustria';
import '@fontsource/lato';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default App;
