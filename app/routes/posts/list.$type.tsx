import { createFileRoute, notFound } from '@tanstack/react-router';
import { PostType, PostTypeSchema } from 'convex/schema';
import { PostList } from '~/widgets/post-list';
import { PostTab } from '~/widgets/post-tab';

export const Route = createFileRoute('/posts/list/$type')({
  component: RouteComponent,
  loader: (ctx) => {
    const validationResult = PostTypeSchema.safeParse(ctx.params.type);

    if (!validationResult.success) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { type } = Route.useParams();

  return (
    <div className="space-y-8">
      <PostTab />
      <PostList type={type as PostType} />
    </div>
  );
}
