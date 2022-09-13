import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getBlogPostsPreview } from '../lib/getBlogPostsPreview';
import { BlogPostPreview } from '../components/BlogPostPreview';
import avatarImage from '../../public/avatar.jpg';

interface HomeProps {
  latestPosts: {
    slug: string;
    date: string;
    title: string;
    readingTime: string;
    description: string;
  }[];
}

const title = 'Leo Pradel';
const url = 'https://leopradel.com';

const Home = ({ latestPosts }: HomeProps) => (
  <React.Fragment>
    <NextSeo
      title={title}
      canonical={url}
      openGraph={{
        url,
        title,
      }}
    />

    <Header />

    <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-12">
      <section className="flex items-center">
        <div className="h-16 w-16">
          <Image
            className="rounded-full"
            src={avatarImage}
            height={80}
            width={80}
            priority={true}
            alt="Avatar"
          />
        </div>
        <div className="ml-4">
          <h2 className="font-sans leading-tight text-xl font-bold">
            Leo Pradel
          </h2>
          <p className="text-sm text-gray-800">
            Co-founder of <a
              href="https://www.sigle.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sigleapp
            </a>
            | Maker, <a
              href="https://www.ledokku.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ledokku
            </a>
            , <a
              href="https://www.accountsjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @accountsjs
            </a>
            | oss contributor
          </p>
        </div>
      </section>

      <section>
        <h4 className="font-sans leading-tight text-4xl font-bold mt-16 mb-6">
          Latest posts
        </h4>

        <div className="flex flex-col space-y-6">
          {latestPosts.map(
            (post) => (
              <BlogPostPreview key={post.slug} post={post} />
            ),
          )}
        </div>

        <NextLink href="/blog" passHref={true}>
          <a className="mt-6 flex items-center hover:underline">
            See all posts
            <span className="ml-2">
              <ArrowRightIcon />
            </span>
          </a>
        </NextLink>
      </section>
    </main>

    <Footer />
  </React.Fragment>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const latestPosts = getBlogPostsPreview().slice(0, 3);

  return {
    props: {
      latestPosts,
    },
  };
};

export default Home;
