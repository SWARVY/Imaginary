/// <reference types="vinxi/types/server" />
import { createClerkHandler } from '@clerk/tanstack-start/server';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';

import { createRouter } from './router';

const handler = createStartHandler({
  createRouter,
  getRouterManifest,
});

const clerkHandler = createClerkHandler(handler);

/*
 * // You can also override Clerk options by passing an object as second argument
 * const clerkHandler = createClerkHandler(handler, {
 *   afterSignInUrl: '/dashboard',
 * });
 */

export default clerkHandler(defaultStreamHandler);
