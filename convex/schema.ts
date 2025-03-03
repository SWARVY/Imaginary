import { zid, zodToConvex } from 'convex-helpers/server/zod';
import { defineSchema, defineTable } from 'convex/server';
import { z } from 'zod';

export const PostTypeSchema = z.union([
  z.literal('POST'),
  z.literal('DEBUG'),
  z.literal('SNIPPET'),
]);

export type PostType = z.infer<typeof PostTypeSchema>;

export const PostSchema = z.object({
  _id: zid('post').optional(),
  _creationTime: z.number().optional(),
  type: PostTypeSchema,
  title: z.string().min(1),
  contents: z.string(),
  relatedPosts: z.array(z.union([z.string().url(), z.literal('')])),
});

export type Post = z.infer<typeof PostSchema>;

export const FileSchema = z.object({
  body: z.string(),
});

export default defineSchema({
  post: defineTable(zodToConvex(PostSchema)),
  file: defineTable(zodToConvex(FileSchema)),
});
