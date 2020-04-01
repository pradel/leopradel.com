import React from 'react';
import { AppProps } from 'next/app';
// TODO move this to the blog post page once next.js support css imports in files
import 'prismjs/themes/prism-okaidia.css';
import '../styles/index.css';

// TODO default SEO
// TODO add fathom

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
