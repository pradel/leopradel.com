import React from 'react';
import NextApp from 'next/app';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from '@chakra-ui/core';

class App extends NextApp {
  render() {
    const { Component } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset />
          <Component />
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
