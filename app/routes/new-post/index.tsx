import { createFileRoute } from '@tanstack/react-router';
import { PostEditor } from '~/widget/post-editor';

export const Route = createFileRoute('/new-post/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PostEditor />
    </div>
  );
}
