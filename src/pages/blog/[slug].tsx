import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
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
    slug: string;
    description: string;
    date: string;
    readingTime: string;
    content: string;
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  const title = `${post.title} - Leo Pradel`;
  const url = `https://leopradel.com/blog/${post.slug}`;

  return (
    <React.Fragment>
      <NextSeo
        title={title}
        description={post.description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post.date,
          },
          url,
          title,
          description: post.description,
        }}
      />

      <Header />

      <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-4">
        <article>
          <header>
            <h1 className="leading-tight text-4xl font-bold text-black">
              {post.title}
            </h1>
            <p className="text-sm mt-1 mb-4 text-gray-500">
              {post.date} • {post.readingTime}
            </p>
          </header>
          <hr className="my-8 border-b-2 border-gray-100" />
          <section
            className="prose lg:prose-lg"
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
    slug,
    date: format(new Date(data.date), 'MMMM d, yyyy'),
    title: data.title,
    description: data.description,
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
  const folderNames = readdirSync(postsDirectory, {
    withFileTypes: true,
  }).filter((dirent) => dirent.isDirectory());

  return {
    paths: folderNames.map((dirent) => ({
      params: {
        slug: dirent.name,
      },
    })),
    fallback: false,
  };
};

export default BlogPost;
