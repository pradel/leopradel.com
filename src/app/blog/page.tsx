import { getYear } from 'date-fns';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { getBlogPostsPreview } from '@/lib/get-blog-posts-preview';
import { BlogPostPreview } from '@/components/blog-post-preview';

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  readingTime: string;
  description: string;
}

export default async function Page() {
  const posts = getBlogPostsPreview();

  const postsByYears: { [key: number]: BlogPost[] } = {};
  posts.forEach((post) => {
    const postYear = getYear(new Date(post.date));
    if (!postsByYears[postYear]) {
      postsByYears[postYear] = [];
    }
    postsByYears[postYear].push(post);
  });

  return (
    <>
      <h4 className="mb-4 mt-20 font-sans text-4xl font-bold leading-tight">
        Blog
      </h4>

      <div className="flex flex-col space-y-5">
        {Object.keys(postsByYears)
          .reverse()
          .map((year) => (
            <div key={year}>
              <div className="mb-2 flex items-center text-sm font-bold text-gray-800">
                <span className="mr-2 text-watermelon">
                  <ChevronRightIcon />
                </span>
                {year}
              </div>
              <div className="flex flex-col space-y-6">
                {postsByYears[Number(year)].map((post) => (
                  <BlogPostPreview key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
