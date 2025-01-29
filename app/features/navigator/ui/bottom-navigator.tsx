import { SignInButton, SignOutButton, useAuth } from '@clerk/tanstack-start';
import { Link } from '@tanstack/react-router';
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
    <div className="absolute bottom-12 flex items-center justify-center">
      <Dock direction="middle" className="bg-white">
        <DockIcon>
          <div className="lg:tooltip" data-tip="home">
            <Link to="/">
              <TiHomeOutline fill="black" />
            </Link>
          </div>
        </DockIcon>
        {isSignedIn && (
          <DockIcon>
            <div className="lg:tooltip" data-tip="new post">
              <Link to="/new-post">
                <TiPen fill="black" />
              </Link>
            </div>
          </DockIcon>
        )}
        <DockIcon>
          <div className="lg:tooltip" data-tip="post">
            <Link to="/">
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
