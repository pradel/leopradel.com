import React from 'react';
import { AppProps } from 'next/app';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from '@chakra-ui/core';
import 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="light">
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
