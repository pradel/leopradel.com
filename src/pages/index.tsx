import React from 'react';
import { Header } from '../components/Header';

const Home = () => (
  <React.Fragment>
    <Header />

    <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-12">
      Latest Posts
    </main>
  </React.Fragment>
);

export default Home;
