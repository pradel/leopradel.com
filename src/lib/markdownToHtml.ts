import remark from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import autolinkHeadings from 'remark-autolink-headings';
import highlight from 'remark-highlight.js';
var low = require('lowlight/lib/core');

low.registerLanguage('graphql', function (e: any) {
  return {
    aliases: ['gql'],
    keywords: {
      keyword:
        'query mutation subscription|10 type input schema directive interface union scalar fragment|10 enum on ...',
      literal: 'true false null',
    },
    contains: [
      e.HASH_COMMENT_MODE,
      e.QUOTE_STRING_MODE,
      e.NUMBER_MODE,
      {
        className: 'type',
        begin: '[^\\w][A-Z][a-z]',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'literal',
        begin: '[^\\w][A-Z][A-Z]',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'variable',
        begin: '\\$',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'keyword',
        begin: '[.]{2}',
        end: '\\.',
      },
      {
        className: 'meta',
        begin: '@',
        end: '\\W',
        excludeEnd: !0,
      },
    ],
    illegal: /([;<']|BEGIN)/,
  };
});

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(slug)
    .use(autolinkHeadings)
    .use(highlight)
    .use(html)
    .process(markdown);
  return result.toString();
};
