import { Doc } from './_generated/dataModel';
import { mutation } from './_generated/server';

export const createPost = mutation({
  handler: async (ctx, args: Doc<'posts'>) => {
    await ctx.db.insert('posts', { ...args });
  },
});
