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
    readingTime: string;
    description: string;
  }[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Box margin="auto" maxWidth="42rem" px={6} as="main">
      {posts.map((post) => (
        <Box key={post.slug} mt={8} as="article">
          <header>
            <Heading as="h3" size="lg" mb={1}>
              <NextLink href={`/blog/${post.slug}`} passHref>
                <Link
                  _hover={{ textDecoration: 'none' }}
                  style={{ color: '#FD4659' }}
                >
                  {post.title}
                </Link>
              </NextLink>
            </Heading>
            <Text fontSize="xs" color="gray.500" as="small">
              {post.date} • {post.readingTime}
            </Text>
          </header>
          <Text>{post.description}</Text>
        </Box>
      ))}
    </Box>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = blogPosts.map(
    (blogPost: { [key: string]: any }): BlogProps['posts'][0] => {
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
        readingTime: blogPost.readingTime.text,
      };
    }
  );

  // TODO sort by date

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
