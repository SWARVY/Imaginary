import cn from '~/shared/lib/cn';

export default function PostListSkeleton() {
  return (
    <div
      className={cn(
        'w-full divide-y divide-black border-y border-black',
        'dark:divide-gray-400 dark:border-gray-400',
      )}
    >
      {Array.from({ length: 3 }, (_, parentIdx) => (
        <div
          key={`skeleton-list-${parentIdx}`}
          className="flex gap-x-8 py-8 text-lg"
        >
          <div className="skeleton h-8 w-12 shrink-0 px-1 py-0.5" />
          <ul className="grow space-y-4">
            {Array.from({ length: 5 }).map((_, childIdx) => (
              <PostListSkeletonItem
                key={`skeleton-list-item-${parentIdx}-${childIdx}`}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PostListSkeletonItem() {
  return (
    <div className="group/item flex justify-between gap-x-2">
      <div className="skeleton h-8 w-full max-w-60 px-1 py-0.5" />
      <div className="skeleton h-8 w-20 shrink-0 px-1 py-0.5" />
    </div>
  );
}
