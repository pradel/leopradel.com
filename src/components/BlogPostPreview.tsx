import React from 'react';
import NextLink from 'next/link';

interface BlogPostPreviewProps {
  post: {
    slug: string;
    date: string;
    title: string;
    readingTime: string;
    description: string;
  };
}

export const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    <article key={post.slug} className="mb-10">
      <header>
        <h3 className="leading-tight text-2xl font-bold">
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
  );
};
