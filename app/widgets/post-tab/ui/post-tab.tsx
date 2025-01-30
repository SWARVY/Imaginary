import { Link, useMatchRoute } from '@tanstack/react-router';
import { CATEGORIES } from '~/features/post-editor';
import cn from '~/shared/lib/cn';

export default function PostTab() {
  const matchRoute = useMatchRoute();

  return (
    <div role="tablist" className="tabs tabs-border tabs-lg">
      {CATEGORIES.map(({ type, value }) => (
        <Link
          to="/posts/list/$type"
          params={{ type }}
          role="tab"
          className={cn(
            'tab',
            matchRoute({ to: '/posts/list/$type', params: { type } }) &&
              'tab-active',
          )}
        >
          {value}
        </Link>
      ))}
    </div>
  );
}
