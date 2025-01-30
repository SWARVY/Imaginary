import { createFileRoute } from '@tanstack/react-router';
import { Id } from 'convex/_generated/dataModel';
import { PostViewer } from '~/widgets/post-viewer';

export const Route = createFileRoute('/posts/detail/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <PostViewer postId={postId as Id<'post'>} />;
}
