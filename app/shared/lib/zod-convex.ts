import { NoOp } from 'convex-helpers/server/customFunctions';
import { zCustomMutation, zCustomQuery } from 'convex-helpers/server/zod';
import { mutation, query } from 'convex/_generated/server';

export const zMutation = zCustomMutation(mutation, NoOp);

export const zQuery = zCustomQuery(query, NoOp);
