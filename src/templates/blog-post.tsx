import React from 'react';
import { Link, graphql } from 'gatsby';
import '../styles/tailwind.css';
import { containerClasses } from '../utils';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const BlogPostTemplate = ({ data, pageContext, location }: any) => {
  const post = data.markdownRemark;

  // TODO SEO

  return (
    <React.Fragment>
      <Header />

      <div className={`${containerClasses} mt-16 mb-4`}>
        <article>
          <header>
            <h1 className="leading-tight text-3xl font-bold text-black">
              {post.frontmatter.title}
            </h1>
            <p className="text-sm mt-0 mb-4 text-gray-600">
              {post.frontmatter.date}
            </p>
          </header>
          <hr className="my-8 border-b-2 border-gray-200" />
          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
