export default function PostViewerSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="skeleton h-6 w-3/4" />
        <div className="flex items-center gap-x-1 text-sm font-light">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>
      <div className="skeleton h-[18.75rem] w-full" />
      <div className="w-full space-y-2">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-24 w-full" />
      </div>
      <div className="skeleton h-40 w-full" />
    </div>
  );
}
