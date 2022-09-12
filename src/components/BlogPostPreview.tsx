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
    <NextLink href={`/blog/${post.slug}`} passHref>
      <a className="group">
        <article key={post.slug}>
          <header>
            <h3 className="leading-tight text-lg font-bold group-hover:underline">
              {post.title}
            </h3>
            <p className="text-sm mt-1 mb-1 text-gray-500">
              {post.date} • {post.readingTime}
            </p>
          </header>
          <section>
            <p className="text-gray-700">{post.description}</p>
          </section>
        </article>
      </a>
    </NextLink>
  );
};
