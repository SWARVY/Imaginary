import { NoOp } from 'convex-helpers/server/customFunctions';
import { zCustomMutation, zCustomQuery, zid } from 'convex-helpers/server/zod';

import { mutation, query } from './_generated/server';
import { PostSchema, PostTypeSchema } from './schema';

const zMutation = zCustomMutation(mutation, NoOp);

const zQuery = zCustomQuery(query, NoOp);

export const createPost = zMutation({
  args: { input: PostSchema.omit({ _id: true, _creationTime: true }) },
  handler: async (ctx, args) => {
    await ctx.db.insert('post', args.input);
  },
});

export const editPost = zMutation({
  args: { input: PostSchema },
  handler: async (ctx, args) => {
    ctx.db.patch(args.input._id, args.input);
  },
});

export const getPosts = zQuery({
  args: { type: PostTypeSchema },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('post')
      .filter((q) => q.eq(q.field('type'), args.type))
      .collect();
    return posts;
  },
});

export const getPostDetail = zQuery({
  args: { id: zid('post') },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    return post;
  },
});
