import remark from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import autolinkHeadings from 'remark-autolink-headings';

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(slug)
    // TODO setup an clickable icon https://github.com/remarkjs/remark-autolink-headings
    .use(autolinkHeadings)
    .use(html)
    .process(markdown);
  return result.toString();
};
