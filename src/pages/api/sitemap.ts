import { NextApiHandler } from 'next';
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import posts from '../../blog/posts.json';

const sitemap: NextApiHandler = async (_, res) => {
  const smStream = new SitemapStream({
    hostname: 'https://www.leopradel.com',
  });
  smStream.write({
    url: '/',
    changefreq: EnumChangefreq.WEEKLY,
  });
  smStream.write({
    url: '/blog',
    changefreq: EnumChangefreq.WEEKLY,
  });
  posts.map((post) => {
    smStream.write({
      url: `/blog/${post.slug}`,
      changefreq: EnumChangefreq.WEEKLY,
    });
  });
  smStream.write({
    url: '/projects',
    changefreq: EnumChangefreq.MONTHLY,
  });
  smStream.end();

  const generatedSitemap = await streamToPromise(smStream).then((sm) =>
    sm.toString()
  );

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });
  res.end(generatedSitemap);
};

export default sitemap;
