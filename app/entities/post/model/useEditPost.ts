import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { toast } from 'react-toastify';

export default function useEditPost() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editPost = useConvexMutation(api.posts.editPost);

  return useMutation({
    mutationKey: ['edit'],
    mutationFn: editPost,
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [api.posts.getPostDetail, { id: variables.input._id }],
      });
      toast.success('게시글이 수정되었습니다!');
      router.navigate({
        to: '/posts/list/$type',
        params: { type: 'POST' },
      });
    },
  });
}
