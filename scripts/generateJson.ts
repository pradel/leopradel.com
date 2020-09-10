/**
 * This script is needed to expose the posts to the api routes as they don't have access
 * to the filesystem once they are deployed.
 * We generate a json containing the info for the blog posts.
 */
import { readdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

const generateJson = async () => {
  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const folderNames = readdirSync(postsDirectory, {
    withFileTypes: true,
  }).filter((dirent) => dirent.isDirectory());

  const posts = folderNames.map((dirent) => {
    const fullPath = join(postsDirectory, dirent.name, 'index.md');
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: dirent.name,
      date: format(new Date(data.date), 'MMMM d, yyyy'),
      title: data.title,
    };
  });

  writeFileSync(
    join(process.cwd(), 'src', 'blog', 'posts.json'),
    JSON.stringify(posts)
  );
};

generateJson();
