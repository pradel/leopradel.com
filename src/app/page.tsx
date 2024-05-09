import Image from 'next/image';
import avatarImage from '../../public/avatar.jpg';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { BlogPostPreview } from '../components/blog-post-preview';
import { getBlogPostsPreview } from '../lib/get-blog-posts-preview';
import { PageWrapper } from './page-wrapper';

export default async function Page() {
  const latestPosts = getBlogPostsPreview().slice(0, 4);

  return (
    <PageWrapper>
      <section className="flex items-center">
        <div className="size-16">
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
          <h1 className="font-sans text-xl font-bold leading-tight">
            Léo Pradel
          </h1>
          <p className="mt-1 text-sm text-gray-800">
            Hi, I{"'"}m Léo, a software engineer passionate about open-source
            and web3. I write about my journey, projects, and things I am
            excited about.
          </p>
          <p className="mt-1 text-sm text-gray-800">
            Curently working at{' '}
            <a
              className="hover:underline"
              href=" https://www.fxhash.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              fx(hash)
            </a>
            , prev{' '}
            <a
              className="hover:underline"
              href="https://bitwala.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Bitwala (Nuri)
            </a>
            ,{' '}
            <a
              className="hover:underline"
              href="https://www.aestetype.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Aestetype
            </a>
            . Co-founder of{' '}
            <a
              className="hover:underline"
              href="https://www.sigle.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sigleapp
            </a>{' '}
            ,{' '}
            <a
              className="hover:underline"
              href="https://github.com/ledokku/ledokku"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ledokku
            </a>
            ,{' '}
            <a
              className="hover:underline"
              href="https://www.accountsjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @accountsjs
            </a>
            .
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-6 mt-16 font-sans text-4xl font-bold leading-tight">
          Latest posts
        </h2>

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
    </PageWrapper>
  );
}
