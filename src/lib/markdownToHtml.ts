import remark from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import autolinkHeadings from 'remark-autolink-headings';
import highlight from 'remark-highlight.js';

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(slug)
    .use(autolinkHeadings)
    .use(highlight)
    .use(html)
    .process(markdown);
  return result.toString();
};
