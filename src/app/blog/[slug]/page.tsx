import readingTime from 'reading-time';
import { format } from 'date-fns';
import { join } from 'path';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { markdownToHtml } from '@/lib/markdownToHtml';
import allPosts from '../../../blog/posts.json';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  const blogPostPath = join(process.cwd(), 'src', 'blog', slug, 'index.md');
  const fileContents = readFileSync(blogPostPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post = {
    slug,
    date: format(new Date(data.date), 'MMMM d, yyyy'),
    title: data.title,
    description: data.description,
    readingTime: readingTime(content).text,
    content: await markdownToHtml(content),
  };

  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const url = `https://leopradel.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      article: {
        publishedTime: new Date(post.date).toISOString(),
      },
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <article>
      <header>
        <h1 className="font-sans text-4xl font-bold leading-tight text-black">
          {post.title}
        </h1>
        <p className="mb-4 mt-1 text-sm text-gray-500">
          {post.date} • {post.readingTime}
        </p>
      </header>
      <hr className="my-8 border-b-2 border-gray-100" />
      <section
        className="prose lg:prose-lg prose-h1:font-sans prose-h2:font-sans prose-h3:font-sans prose-h4:font-sans"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
