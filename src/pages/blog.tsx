import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { format } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { Header } from '../components/Header';

interface BlogProps {
  posts: {
    slug: string;
    date: string;
    title: string;
    readingTime: string;
    description: string;
  }[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <React.Fragment>
      <Header />

      <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-12">
        {posts.map((post) => (
          <article key={post.slug} className="mb-12">
            <header>
              <h3 className="leading-tight text-3xl font-bold">
                <NextLink href={`/blog/${post.slug}`} passHref>
                  <a className="text-watermelon">{post.title}</a>
                </NextLink>
              </h3>
              <p className="text-sm mt-0 mb-2 text-gray-600">
                {post.date} • {post.readingTime}
              </p>
            </header>
            <section>
              <p className="text-black">{post.description}</p>
            </section>
          </article>
        ))}
      </main>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const folderNames = readdirSync(postsDirectory);

  const posts = folderNames.map((folderName) => {
    const fullPath = join(postsDirectory, folderName, 'index.md');
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // First we go through all the posts and check that they are well formatted
    if (!data.title) {
      throw new Error(`Title required for ${fullPath}`);
    }
    if (!data.date) {
      throw new Error(`Date required for ${fullPath}`);
    }
    if (!data.description) {
      throw new Error(`Date required for ${fullPath}`);
    }

    return {
      slug: folderName,
      date: format(new Date(data.date), 'MMMM d, yyyy'),
      title: data.title,
      description: data.description,
      readingTime: readingTime(content).text,
    };
  });

  // TODO sort by date

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
