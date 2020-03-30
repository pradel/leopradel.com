import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Link, Heading, Text } from '@chakra-ui/core';
import { format } from 'date-fns';
// @ts-ignore
import { frontMatter as blogPosts } from '../blog/**/index.mdx';

interface BlogProps {
  posts: {
    slug: string;
    date: string;
    title: string;
    description: string;
  }[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Box margin="auto" maxWidth="42rem" px={6}>
      {posts.map((post) => (
        <NextLink key={post.slug} href={`/blog/${post.slug}`} passHref>
          <Link>
            <Heading as="h3">{post.title}</Heading>
            <Text>{post.date}</Text>
            <Text>{post.description}</Text>
          </Link>
        </NextLink>
      ))}
    </Box>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = blogPosts.map(
    (blogPost: { [key: string]: string }): BlogProps['posts'][0] => {
      // First step is to go through all the posts and check that they are well formatted
      if (!blogPost.title) {
        throw new Error(`Title required for ${blogPost.__resourcePath}`);
      }
      if (!blogPost.date) {
        throw new Error(`Date required for ${blogPost.__resourcePath}`);
      }
      if (!blogPost.description) {
        throw new Error(`Date required for ${blogPost.__resourcePath}`);
      }

      const slug = blogPost.__resourcePath.split('/');
      return {
        slug: slug[slug.length - 2],
        date: format(new Date(blogPost.date), 'MMMM d, yyyy'),
        title: blogPost.title,
        description: blogPost.description,
      };
    }
  );

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
