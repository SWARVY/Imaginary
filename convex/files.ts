import { zid } from 'convex-helpers/server/zod';
import { zMutation, zQuery } from '~/shared/lib/zod-convex';

import { mutation } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = zMutation({
  args: { storageId: zid('_storage') },
  handler: async (ctx, args) => {
    await ctx.db.insert('file', {
      body: args.storageId,
      format: 'image',
    });
  },
});

export const getImageUrl = zQuery({
  args: { storageId: zid('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
