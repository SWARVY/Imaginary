import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/tanstack-start';
import { Link } from '@tanstack/react-router';

export default function TopNavigator() {
  return (
    <nav className="flex h-8 items-center justify-between">
      <div className="flex gap-2 p-2 text-lg">
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
      <div>
        <SignedIn>
          <SignOutButton>Sign out</SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">Sign in</SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
