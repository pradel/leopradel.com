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
        <header className="space-y-1">
          <h3 className="font-sans text-xl font-semibold leading-tight group-hover:underline">
            {post.title}
          </h3>
          <p className="my-1 text-sm font-light text-gray-600">
            {post.date} • {post.readingTime}
          </p>
        </header>
        <section className="mt-1">
          <p className="text-gray-600">{post.description}</p>
        </section>
      </article>
    </Link>
  );
};
