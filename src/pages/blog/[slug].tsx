import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { format } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface BlogPostProps {
  post: {
    title: string;
    date: string;
    readingTime: string;
    content: string;
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  // TODO SEO

  return (
    <React.Fragment>
      <Header />

      <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-4">
        <article>
          <header>
            <h1 className="leading-tight text-3xl font-bold text-black">
              {post.title}
            </h1>
            <p className="text-sm mt-0 mb-4 text-gray-600">
              {post.date} • {post.readingTime}
            </p>
          </header>
          <hr className="my-8 border-b-2 border-gray-200" />
          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <Footer />
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const slug = params && (params.slug as string);
  if (!slug) {
    throw new Error('Slug not set');
  }

  const blogPostPath = join(process.cwd(), 'src', 'blog', slug, 'index.md');
  const fileContents = readFileSync(blogPostPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post = {
    date: format(new Date(data.date), 'MMMM d, yyyy'),
    title: data.title,
    readingTime: readingTime(content).text,
    content: await markdownToHtml(content),
  };

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const folderNames = readdirSync(postsDirectory);

  return {
    paths: folderNames.map((folderName) => ({
      params: {
        slug: folderName,
      },
    })),
    fallback: false,
  };
};

export default BlogPost;
