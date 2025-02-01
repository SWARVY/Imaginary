import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
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
      <DarkModeButton />
      <SearchButton />
    </div>
  );
}

function DarkModeButton() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <label className="swap swap-rotate size-full">
      <input
        type="checkbox"
        className="theme-controller"
        data-toggle-theme="sunset,lofi"
        data-act-class="ACTIVECLASS"
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
        <p className="py-4">검색 dialog에요</p>
      </Dialog>
    </>
  );
}
