import remark from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import autolinkHeadings from 'remark-autolink-headings';

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(slug)
    .use(autolinkHeadings)
    .use(html)
    .process(markdown);
  return result.toString();
};
