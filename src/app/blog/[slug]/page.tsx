import { Metadata } from 'next';
import readingTime from 'reading-time';
import Balancer from 'react-wrap-balancer';
import { format } from 'date-fns';
import { join } from 'path';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { markdownToHtml } from '@/lib/markdownToHtml';
import allPosts from '../../../blog/posts.json';
import { PageWrapper } from '@/app/page-wrapper';

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
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  const url = `https://leopradel.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <PageWrapper>
      <article>
        <header className="text-center">
          <h1 className="font-sans text-4xl font-semibold leading-tight text-black">
            <Balancer>{post.title}</Balancer>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {post.date} • {post.readingTime}
          </p>
        </header>
        <hr className="my-8 border-b-2 border-gray-100 md:my-12" />
        <section
          className="prose lg:prose-lg prose-h1:font-sans prose-h2:font-sans prose-h3:font-sans prose-h4:font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PageWrapper>
  );
}
