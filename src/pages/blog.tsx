import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BlogPostPreview } from '../components/BlogPostPreview';
import { getBlogPostsPreview } from '../lib/getBlogPostsPreview';
import { getYear } from 'date-fns';

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
  const postsByYears: { [key: number]: BlogPost[] } = {};
  posts.forEach((post) => {
    const postYear = getYear(new Date(post.date));
    if (!postsByYears[postYear]) {
      postsByYears[postYear] = [];
    }
    postsByYears[postYear].push(post);
  });

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
        <h4 className="font-sans leading-tight text-4xl font-bold mt-20 mb-4">
          Blog
        </h4>

        <div className="flex flex-col space-y-5">
          {Object.keys(postsByYears)
            .reverse()
            .map((year) => (
              <div key={year}>
                <div className="text-sm font-bold text-gray-800 mb-2">
                  <span className="text-watermelon mr-2">—</span>
                  {year}
                  <span className="text-watermelon ml-2">—</span>
                </div>
                <div className="flex flex-col space-y-6">
                  {postsByYears[Number(year)].map((post) => (
                    <BlogPostPreview key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ))}
        </div>
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
