import allPosts from '../blog/posts.json';

export default async function sitemap() {
  const url = 'https://www.leopradel.com';

  const posts = allPosts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  const routes = ['', '/projects', '/blog'].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
