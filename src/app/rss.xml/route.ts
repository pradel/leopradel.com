import { Feed } from 'feed';
import allPosts from '../../blog/posts.json';

const websiteUrl = 'https://www.leopradel.com';

const author = {
  name: 'Léo Pradel',
  link: websiteUrl,
};

export async function GET() {
  const feed = new Feed({
    title: 'Léo Pradel',
    description: 'Oss contributor passionate about nodejs, react and graphql.',
    id: websiteUrl,
    link: websiteUrl,
    language: 'en',
    favicon: 'http://www.leopradel.com/apple-touch-icon.png',
    copyright: `All rights reserved ${new Date().getFullYear()}, Léo Pradel`,
    author,
  });

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${websiteUrl}/blog/${post.slug}`,
      description: post.description,
      // content: post.content,
      author: [author],
      contributor: [],
      date: new Date(post.date),
      // image: post.image,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
