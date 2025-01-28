import { Link } from '@tanstack/react-router';
import { FaSearch } from 'react-icons/fa';

export default function TopNavigator() {
  return (
    <nav className="navbar justify-between">
      <div className="flex gap-x-2 p-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/new-post"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Write
        </Link>
      </div>
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
