import { convexQuery } from '@convex-dev/react-query';
import { SuspenseQuery } from '@suspensive/react-query';
import { Link } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import type { Doc } from 'convex/_generated/dataModel';
import { PostType } from 'convex/schema';
import { format } from 'date-fns';
import { Suspense } from 'react';
import cn from '~/shared/lib/cn';

interface PostListProps {
  type: PostType;
}

interface YearlyPostListProps {
  data: Doc<'post'>[];
}

interface PostItemProps {
  post: Doc<'post'>;
}

export default function PostList({ type }: PostListProps) {
  return (
    <Suspense>
      <SuspenseQuery {...convexQuery(api.posts.getPosts, { type })}>
        {({ data }) => <YearlyPostList data={data} />}
      </SuspenseQuery>
    </Suspense>
  );
}

function YearlyPostList({ data }: YearlyPostListProps) {
  const postsByYear = data.reduce(
    (acc, post) => {
      const year = new Date(post._creationTime).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, Doc<'post'>[]>,
  );

  return (
    <div className="w-full divide-y-2">
      {Object.entries(postsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, posts]) => (
          <div key={year} className="group/base flex text-lg">
            <div className="w-20">
              <h3
                className={cn(
                  'w-fit cursor-pointer rounded-md px-1 py-0.5 font-light',
                  'transition-all group-hover/base:bg-gray-300',
                )}
              >
                {year}
              </h3>
            </div>
            <ul className="grow space-y-4">
              {posts.reverse().map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function PostItem({ post }: PostItemProps) {
  const createdAt = new Date(post._creationTime);

  return (
    <Link
      to="/posts/detail/$postId"
      params={{ postId: post._id }}
      className={cn(
        'group/item flex justify-between',
        'transition-opacity group-hover/base:opacity-60 hover:opacity-100',
      )}
    >
      <h4 className="rounded-md px-1 py-0.5 transition-colors group-hover/item:bg-gray-300">
        {post.title}
      </h4>
      <time className="rounded-md px-1 py-0.5 font-light transition-colors group-hover/item:bg-gray-300">
        {format(createdAt, 'MMM. dd.')}
      </time>
    </Link>
  );
}
