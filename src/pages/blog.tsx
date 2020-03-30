import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import fs from 'fs';
import path from 'path';
import { Button, Link, Heading, Text } from '@chakra-ui/core';

interface BlogProps {
  posts: {
    slug: string;
    title: string;
    content: string;
  }[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <React.Fragment>
      {posts.map((post) => (
        <NextLink key={post.slug} href={`/blog/${post.slug}`} passHref>
          <Link>
            <Heading as="h3">{post.title}</Heading>
            <Text>{post.content}</Text>
          </Link>
        </NextLink>
      ))}
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const postsDirectory = path.join(process.cwd(), 'src', 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    // const filePath = path.join(postsDirectory, filename, 'index.md');
    // const fileContents = fs.readFileSync(filePath, 'utf8');

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      slug: filename,
      title: 'TODO',
      content: 'TODO',
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
