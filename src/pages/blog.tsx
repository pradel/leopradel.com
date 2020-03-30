import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Link, Heading, Text } from '@chakra-ui/core';
import { format } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

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
