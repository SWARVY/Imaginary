import { Protect } from '@clerk/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';
import NeedAuth from '~/shared/ui/need-auth';
import { PostEditor } from '~/widget/post-editor';

export const Route = createFileRoute('/new-post/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Protect fallback={<NeedAuth />}>
      <PostEditor />
    </Protect>
  );
}
