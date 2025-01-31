import { Protect } from '@clerk/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';
import { PostEditor } from '~/features/post-editor';
import NeedAuth from '~/shared/ui/need-auth';

export const Route = createFileRoute('/new-post/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="size-full">
      <Protect fallback={<NeedAuth />}>
        <PostEditor />
      </Protect>
    </div>
  );
}
