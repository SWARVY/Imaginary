import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import { api } from 'convex/_generated/api';

export default function useInsertPost() {
  return useMutation({
    mutationKey: ['post'],
    mutationFn: useConvexMutation(api.posts.createPost),
  });
}
