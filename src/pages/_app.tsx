import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

// TODO default SEO
// TODO add fathom

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
