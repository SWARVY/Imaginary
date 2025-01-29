import { zodToConvex } from 'convex-helpers/server/zod';
import { defineSchema, defineTable } from 'convex/server';
import { z } from 'zod';

export const PostsSchema = z.object({
  title: z.string().min(1),
  createdAt: z.string().datetime(),
  contents: z.string(),
  relatedPosts: z.array(z.union([z.string().url(), z.literal('')])),
});

export default defineSchema({
  posts: defineTable(zodToConvex(PostsSchema)),
});
