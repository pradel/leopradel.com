import { NextApiHandler } from 'next';
import { Feed } from 'feed';
import posts from '../../blog/posts.json';

const websiteUrl = 'https://www.leopradel.com';

const author = {
  name: 'Leo Pradel',
  link: websiteUrl,
};

const rss: NextApiHandler = async (_, res) => {
  const feed = new Feed({
    title: 'Leo Pradel',
    description: 'Oss contributor passionate about nodejs, react and graphql.',
    id: websiteUrl,
    link: websiteUrl,
    language: 'en',
    // image: 'http://example.com/image.png',
    favicon: 'http://leopradel.com/apple-touch-icon.png',
    copyright: `All rights reserved ${new Date().getFullYear()}, Leo Pradel`,
    author,
  });

  posts.forEach((post) => {
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

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });
  return res.end(feed.rss2());
};

export default rss;
