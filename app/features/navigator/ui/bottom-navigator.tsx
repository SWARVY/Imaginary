import { SignInButton, SignOutButton, useAuth } from '@clerk/tanstack-start';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import {
  TiHomeOutline,
  TiLockClosedOutline,
  TiLockOpenOutline,
  TiNews,
  TiPen,
} from 'react-icons/ti';
import { Dock, DockIcon } from '~/shared/ui/dock';

export default function BottomNavigator() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="fixed bottom-4 z-30 flex w-full items-center justify-center px-10 md:bottom-10">
        <Dock
          direction="middle"
          className="dark:btn-primary btn-soft btn mt-0 gap-x-4"
        >
          <DockIcon onClick={() => router.navigate({ to: '/' })}>
            <TiHomeOutline className="size-5" />
          </DockIcon>
          <DockIcon
            onClick={() =>
              router.navigate({
                to: '/posts/list/$type',
                params: { type: 'POST' },
              })
            }
          >
            <TiNews className="size-5" />
          </DockIcon>
          {isSignedIn ? (
            <DockIcon>
              <SignOutButton>
                <TiLockOpenOutline className="size-5" />
              </SignOutButton>
            </DockIcon>
          ) : (
            <DockIcon>
              <SignInButton mode="modal">
                <TiLockClosedOutline className="size-5" />
              </SignInButton>
            </DockIcon>
          )}
        </Dock>
      </div>
      {isSignedIn && <WritePost />}
    </>
  );
}

function WritePost() {
  const matchRoute = useMatchRoute();
  const router = useRouter();
  const visible =
    !matchRoute({ to: '/posts/detail/$postId', fuzzy: true }) &&
    !matchRoute({ to: '/new-post' });

  return (
    visible && (
      <div className="fixed right-4 bottom-4 z-40 md:right-10 md:bottom-10">
        <div className="lg:tooltip" data-tip="new post">
          <button
            className="btn btn-xl btn-soft btn-primary btn-circle"
            data-tip="new post"
            onClick={() => router.navigate({ to: '/new-post' })}
          >
            <TiPen className="size-6" />
          </button>
        </div>
      </div>
    )
  );
}
