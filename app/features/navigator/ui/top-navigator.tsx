import { ClientOnly, Suspense } from '@suspensive/react';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TiWeatherNight, TiWeatherSunny } from 'react-icons/ti';
import { themeChange } from 'theme-change';
import openModal from '~/shared/lib/open-modal';
import Dialog from '~/shared/ui/dialog';

export default function TopNavigator() {
  return (
    <nav className="navbar justify-between px-0">
      <h1 className="font-bold select-none">
        <Link to="/">IMAGINARY</Link>
      </h1>
      <UtilityButtons />
    </nav>
  );
}

function UtilityButtons() {
  return (
    <div className="grid grid-cols-2 gap-x-1">
      <Suspense fallback={<TiWeatherNight className="swap-on size-5" />}>
        <ClientOnly>
          <DarkModeButton />
        </ClientOnly>
      </Suspense>
      <SearchButton />
    </div>
  );
}

function DarkModeButton() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'sunset',
  );

  const handleThemeChange = () => {
    const newTheme = isDark ? 'lofi' : 'sunset';
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'lofi');
      setIsDark(false);
    }

    themeChange(false);
  }, []);

  return (
    <label className="swap swap-rotate size-full">
      <input
        type="checkbox"
        className="theme-controller"
        data-toggle-theme="sunset,lofi"
        data-act-class="ACTIVECLASS"
        checked={isDark}
        onChange={handleThemeChange}
      />
      <TiWeatherNight className="swap-on size-5" />
      <TiWeatherSunny className="swap-off size-5" />
    </label>
  );
}

function SearchButton() {
  return (
    <>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => openModal('search-dialog')}
      >
        <FaSearch />
      </button>
      <Dialog id="search-dialog">
        <h3 className="text-lg font-bold">검색</h3>
        <p className="py-4">검색 기능은 추후 개발 예정이에요 🔧</p>
      </Dialog>
    </>
  );
}
