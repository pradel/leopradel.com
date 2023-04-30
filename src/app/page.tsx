import Image from 'next/image';
import avatarImage from '../../public/avatar.jpg';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { BlogPostPreview } from '../components/blog-post-preview';
import { getBlogPostsPreview } from '../lib/get-blog-posts-preview';

export default async function Page() {
  const latestPosts = getBlogPostsPreview().slice(0, 3);

  return (
    <>
      <section className="flex items-center">
        <div className="h-16 w-16">
          <Image
            className="rounded-full"
            src={avatarImage}
            height={80}
            width={80}
            priority={true}
            alt="Avatar"
          />
        </div>
        <div className="ml-4">
          <h2 className="font-sans text-xl font-bold leading-tight">
            Leo Pradel
          </h2>
          <p className="text-sm text-gray-800">
            Co-founder of{' '}
            <a
              href="https://www.sigle.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sigleapp
            </a>{' '}
            | Maker,{' '}
            <a
              href="https://www.ledokku.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ledokku
            </a>
            ,{' '}
            <a
              href="https://www.accountsjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @accountsjs
            </a>{' '}
            | oss contributor
          </p>
        </div>
      </section>

      <section>
        <h4 className="mb-6 mt-16 font-sans text-4xl font-bold leading-tight">
          Latest posts
        </h4>

        <div className="flex flex-col space-y-6">
          {latestPosts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
        </div>

        <Link href={`/blog`} className="mt-6 flex items-center hover:underline">
          See all posts
          <span className="ml-2">
            <ArrowRightIcon />
          </span>
        </Link>
      </section>
    </>
  );
}
