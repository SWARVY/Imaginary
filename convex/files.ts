import { zid } from 'convex-helpers/server/zod';
import { zMutation } from '~/shared/lib/zod-convex';

import type { Id } from './_generated/dataModel';
import { httpAction, mutation } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = zMutation({
  args: { storageId: zid('_storage') },
  handler: async (ctx, args) => {
    await ctx.db.insert('file', {
      body: args.storageId,
    });
  },
});

export const getImageUrl = httpAction(async (ctx, request) => {
  const { searchParams } = new URL(request.url);
  const storageId = searchParams.get('storageId')! as Id<'_storage'>;
  const blob = await ctx.storage.get(storageId);

  if (blob === null) {
    return new Response('Image not found', {
      status: 404,
    });
  }
  return new Response(blob);
});
