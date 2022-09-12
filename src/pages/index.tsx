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
      <section className="flex flex-col items-center">
        <div className="h-32 w-32">
          <Image
            className="rounded-full"
            src={avatarImage}
            priority={true}
            alt="Avatar"
          />
        </div>
        <h2 className="font-sans leading-tight text-xl font-bold mt-4">
          Leo Pradel
        </h2>
        <p className="text-sm text-gray-800">
          Oss contributor passionate about nodejs, react and graphql.
        </p>
      </section>

      <section>
        <h4 className="font-sans leading-tight text-4xl font-bold mt-20 mb-6">
          Latest posts
        </h4>

        <div className="flex flex-col space-y-6">
          {latestPosts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
        </div>

        <NextLink href={`/blog`} passHref>
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
