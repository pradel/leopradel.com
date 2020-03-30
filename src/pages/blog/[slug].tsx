import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import NextLink from 'next/link';
import { Box, Link, Heading, Text } from '@chakra-ui/core';
import { format } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

interface BlogPostProps {
  post: {
    title: string;
    date: string;
    readingTime: string;
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Box margin="auto" maxWidth="42rem" px={6} as="main">
      Yo
    </Box>
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
