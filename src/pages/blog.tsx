import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BlogPostPreview } from '../components/BlogPostPreview';
import { getBlogPostsPreview } from '../lib/getBlogPostsPreview';

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  readingTime: string;
  description: string;
}

interface BlogProps {
  posts: BlogPost[];
}

const title = 'Blog - Leo Pradel';
const url = 'https://leopradel.com/blog';

const Blog = ({ posts }: BlogProps) => {
  return (
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
        <h4 className="leading-tight text-4xl font-bold mt-20 mb-4">Blog</h4>
        <div className="text-sm font-bold text-gray-800 mb-2">
          <span className="text-watermelon mr-2">—</span>2022
        </div>
        {posts.map((post) => (
          <BlogPostPreview key={post.slug} post={post} />
        ))}
      </main>

      <Footer />
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = getBlogPostsPreview();

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
