import { Link } from '@tanstack/react-router';
import { FaSearch } from 'react-icons/fa';

export default function TopNavigator() {
  return (
    <nav className="navbar justify-between">
      <h1 className="font-bold select-none">
        <Link to="/">IMAGINARY</Link>
      </h1>
      <UtilityButtons />
    </nav>
  );
}

function UtilityButtons() {
  return (
    <div>
      <button className="btn btn-square btn-ghost">
        <FaSearch />
      </button>
    </div>
  );
}
