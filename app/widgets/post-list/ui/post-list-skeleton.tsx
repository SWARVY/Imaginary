import cn from '~/shared/lib/cn';

export default function PostListSkeleton() {
  return (
    <div
      className={cn(
        'w-full divide-y divide-black border-y border-black',
        'dark:divide-gray-400 dark:border-gray-400',
      )}
    >
      {Array.from({ length: 3 }, () => (
        <div className="flex gap-x-8 py-8 text-lg">
          <div className="skeleton h-8 w-12 px-1 py-0.5" />
          <ul className="grow space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <PostListSkeletonItem key={idx} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PostListSkeletonItem() {
  return (
    <div className="group/item flex justify-between">
      <div className="skeleton h-8 w-60 px-1 py-0.5" />
      <div className="skeleton h-8 w-20 px-1 py-0.5" />
    </div>
  );
}
