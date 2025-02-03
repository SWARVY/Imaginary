import { ClerkProvider, useAuth } from '@clerk/tanstack-start';
import { getAuth } from '@clerk/tanstack-start/server';
import { ConvexQueryClient } from '@convex-dev/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  useRouteContext,
} from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts, createServerFn } from '@tanstack/start';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import * as React from 'react';
import { Toaster } from 'sonner';
import { getWebRequest } from 'vinxi/http';
import { BottomNavigator, TopNavigator } from '~/features/navigator';
import cn from '~/shared/lib/cn';
import { seo } from '~/shared/lib/seo';
import { DefaultCatchBoundary } from '~/shared/ui/default-catch-boundary';
import { NotFound } from '~/shared/ui/not-found';
import appCss from '~/styles/app.css?url';
import editorCss from '~/styles/editor.css?url';

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const auth = await getAuth(getWebRequest()!);
  const token = await auth.getToken({ template: 'convex' });

  return {
    userId: auth.userId,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Imaginary',
        description: `for the Imaginary`,
        image: '/og-image.webp',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: editorCss },
      {
        rel: 'canonical',
        href: 'https://forimaginary.dev',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchClerkAuth();
    const { userId, token } = auth;

    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const context = useRouteContext({ from: Route.id });

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div
          className={cn(
            'flex min-h-full w-full flex-col items-center',
            'font-pretendard px-4 pt-4 pb-32 md:px-0 md:pt-20',
          )}
        >
          <div className="flex size-full max-w-3xl flex-col">
            <TopNavigator />
            {children}
          </div>
          <Toaster position="top-right" />
          <BottomNavigator />
          <ScrollRestoration />
          {/* <TanStackRouterDevtools position="bottom-right" /> */}
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
