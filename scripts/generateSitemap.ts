import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const generateSitemap = async () => {
  const postsDirectory = join(process.cwd(), 'src', 'blog');
  const publicDirectory = join(process.cwd(), 'src', 'public');
  const folderNames = readdirSync(postsDirectory);

  const smStream = new SitemapStream({
    hostname: 'https://www.leopradel.com',
  });
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

  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
  writeFileSync(join(publicDirectory, 'sitemap.xml'), sitemap);
};

generateSitemap();
