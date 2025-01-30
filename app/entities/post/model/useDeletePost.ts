import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { toast } from 'sonner';

export default function useDeletePost() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['delete'],
    mutationFn: useConvexMutation(api.posts.deletePost),
    onSuccess: () => {
      router.navigate({
        to: '/posts/list/$type',
        params: { type: 'POST' },
      });
      toast.success('포스트가 삭제되었어요 🗑️');
    },
  });
}
