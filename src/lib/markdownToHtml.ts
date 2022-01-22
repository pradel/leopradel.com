import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import html from 'remark-html';
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

// https://github.com/highlightjs/highlight.js/issues/1471
// var low = require('lowlight/lib/core');
// low.registerLanguage('graphql', function (e: any) {
//   return {
//     aliases: ['gql'],
//     keywords: {
//       keyword:
//         'query mutation subscription|10 type input schema directive interface union scalar fragment|10 enum on ...',
//       literal: 'true false null',
//     },
//     contains: [
//       e.HASH_COMMENT_MODE,
//       e.QUOTE_STRING_MODE,
//       e.NUMBER_MODE,
//       {
//         className: 'type',
//         begin: '[^\\w][A-Z][a-z]',
//         end: '\\W',
//         excludeEnd: !0,
//       },
//       {
//         className: 'literal',
//         begin: '[^\\w][A-Z][A-Z]',
//         end: '\\W',
//         excludeEnd: !0,
//       },
//       {
//         className: 'variable',
//         begin: '\\$',
//         end: '\\W',
//         excludeEnd: !0,
//       },
//       {
//         className: 'keyword',
//         begin: '[.]{2}',
//         end: '\\.',
//       },
//       {
//         className: 'meta',
//         begin: '@',
//         end: '\\W',
//         excludeEnd: !0,
//       },
//     ],
//     illegal: /([;<']|BEGIN)/,
//   };
// });

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    // .use(rehypeHighlight)
    // .use(html)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};
