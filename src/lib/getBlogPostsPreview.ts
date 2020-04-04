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

  return posts;
};
