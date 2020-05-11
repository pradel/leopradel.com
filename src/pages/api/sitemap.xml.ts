import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Encoding', 'gzip');

  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const folderNames = readdirSync(postsDirectory);

  try {
    const smStream = new SitemapStream({
      hostname: 'https://www.leopradel.com',
    });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    smStream.write({
      url: '/',
      changefreq: EnumChangefreq.WEEKLY,
    });
    smStream.write({
      url: '/blog',
      changefreq: EnumChangefreq.WEEKLY,
    });
    folderNames.forEach((folderName) => {
      smStream.write({
        url: `/blog/${folderName}`,
        changefreq: EnumChangefreq.WEEKLY,
      });
    });
    smStream.write({
      url: '/projects',
      changefreq: EnumChangefreq.MONTHLY,
    });
    smStream.end();

    // cache the response
    streamToPromise(pipeline);
    // stream write the response
    pipeline.pipe(res).on('error', (error: Error) => {
      throw error;
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
