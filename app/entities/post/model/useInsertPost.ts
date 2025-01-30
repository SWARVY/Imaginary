import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { toast } from 'react-toastify';

export default function useInsertPost() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['insert'],
    mutationFn: useConvexMutation(api.posts.createPost),
    onSuccess: () => {
      toast.success('게시글이 등록되었습니다!');
      router.navigate({
        to: '/posts/list/$type',
        params: { type: 'POST' },
      });
    },
  });
}
