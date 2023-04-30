import { format } from 'date-fns';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

export interface BlogPostPreview {
  slug: string;
  date: string;
  title: string;
  readingTime: string;
  description: string;
}

export const getBlogPostsPreview = (): BlogPostPreview[] => {
  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const folderNames = readdirSync(postsDirectory, {
    withFileTypes: true,
  }).filter((dirent) => dirent.isDirectory());

  const posts = folderNames.map((dirent) => {
    const fullPath = join(postsDirectory, dirent.name, 'index.md');
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
      slug: dirent.name,
      date: format(new Date(data.date), 'MMMM d, yyyy'),
      title: data.title,
      description: data.description,
      readingTime: readingTime(content).text,
    };
  });

  // @ts-ignore
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
};
