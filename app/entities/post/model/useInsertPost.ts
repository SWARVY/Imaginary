import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { toast } from 'sonner';

export default function useInsertPost() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['insert'],
    mutationFn: useConvexMutation(api.posts.createPost),
    onSuccess: () => {
      toast.success('포스트가 등록되었어요 🚀');
      router.navigate({
        to: '/posts/list/$type',
        params: { type: 'POST' },
      });
    },
    onError: () => {
      toast.error('포스트 등록에 실패했어요 😢');
    },
  });
}
