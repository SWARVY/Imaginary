import { PostType } from 'convex/schema';

const CATEGORIES: Array<{ type: PostType; value: string }> = [
  { type: 'POST', value: 'Post' },
  { type: 'DEBUG', value: 'Debug' },
  { type: 'SNIPPET', value: 'Snippet' },
];

export default CATEGORIES;
