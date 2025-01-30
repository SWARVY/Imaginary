import { SignInButton, SignOutButton, useAuth } from '@clerk/tanstack-start';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import {
  TiHomeOutline,
  TiLockClosedOutline,
  TiLockOpenOutline,
  TiNews,
  TiPen,
  TiWeatherNight,
  TiWeatherSunny,
} from 'react-icons/ti';
import { themeChange } from 'theme-change';
import { Dock, DockIcon } from '~/shared/ui/dock';

export default function BottomNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <div className="absolute bottom-10 flex w-full items-center justify-center px-10">
        <Dock direction="middle" className="mt-0 bg-white">
          <DockIcon>
            <div className="lg:tooltip" data-tip="home">
              <Link to="/">
                <TiHomeOutline fill="black" />
              </Link>
            </div>
          </DockIcon>
          <DockIcon>
            <div className="lg:tooltip" data-tip="post">
              <Link to="/posts/list/$type" params={{ type: 'POST' }}>
                <TiNews fill="black" />
              </Link>
            </div>
          </DockIcon>
          {isSignedIn ? (
            <DockIcon>
              <div className="lg:tooltip" data-tip="sign out">
                <SignOutButton>
                  <TiLockOpenOutline fill="black" />
                </SignOutButton>
              </div>
            </DockIcon>
          ) : (
            <DockIcon>
              <div className="lg:tooltip" data-tip="sign in">
                <SignInButton mode="modal">
                  <TiLockClosedOutline fill="black" />
                </SignInButton>
              </div>
            </DockIcon>
          )}
          <DockIcon>
            <div className="lg:tooltip" data-tip="dark mode">
              <DarkModeSwap />
            </div>
          </DockIcon>
        </Dock>
      </div>
      {isSignedIn && <WritePost />}
    </>
  );
}

function DarkModeSwap() {
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="dark"
        onChange={toggleTheme}
      />
      <TiWeatherNight className="swap-on" fill="black" />
      <TiWeatherSunny className="swap-off" fill="black" />
    </label>
  );
}

function WritePost() {
  const matchRoute = useMatchRoute();
  const visible =
    !matchRoute({ to: '/posts/detail/$postId', fuzzy: true }) &&
    !matchRoute({ to: '/new-post' });

  return (
    visible && (
      <div className="absolute right-10 bottom-10">
        <div className="lg:tooltip" data-tip="new post">
          <Link
            to="/new-post"
            className="btn btn-xl btn-outline btn-circle self-end bg-white transition-colors hover:bg-gray-200"
          >
            <TiPen className="size-6 fill-black" />
          </Link>
        </div>
      </div>
    )
  );
}
