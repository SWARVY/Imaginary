import { createFileRoute, notFound } from '@tanstack/react-router';
import { PostType, PostTypeSchema } from 'convex/schema';
import { seo } from '~/shared/lib/seo';
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
  head: ({ params }) => ({
    meta: [
      ...seo({
        title: `Imaginary | ${params.type}`,
        description: `기술에 대한 깊이 있는 분석, 트러블슈팅 경험, 유용한 스니펫과 인사이트를 공유합니다.`,
      }),
    ],
  }),
});

function RouteComponent() {
  const { type } = Route.useParams();

  return (
    <div className="size-full space-y-8">
      <PostTab />
      <PostList type={type as PostType} />
    </div>
  );
}
