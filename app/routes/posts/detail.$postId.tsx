import { createFileRoute } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';
import { ConvexHttpClient } from 'convex/browser';
import { seo } from '~/shared/lib/seo';
import { PostViewer } from '~/widgets/post-viewer';

const convexClient = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL!);

export const Route = createFileRoute('/posts/detail/$postId')({
  loader: async ({ params }) => {
    const { postId } = params;
    const data = await convexClient.query(api.posts.getPostDetail, {
      id: postId as Id<'post'>,
    });

    return { data };
  },
  head: ({ loaderData }) => ({
    meta: [
      ...seo({
        title: `Imaginary | ${loaderData?.data?.title}`,
        description: `기술에 대한 깊이 있는 분석, 트러블슈팅 경험, 유용한 스니펫과 인사이트를 공유합니다.`,
      }),
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <div className="size-full">
      <PostViewer data={data} />
    </div>
  );
}
