import React from 'react';
import Link from 'next/link';

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
    <Link href={`/blog/${post.slug}`} className="group">
      <article key={post.slug}>
        <header>
          <h3 className="font-sans text-lg font-bold leading-tight group-hover:underline">
            {post.title}
          </h3>
          <p className="my-1 text-sm text-gray-500">
            {post.date} • {post.readingTime}
          </p>
        </header>
        <section>
          <p className="text-gray-700">{post.description}</p>
        </section>
      </article>
    </Link>
  );
};
