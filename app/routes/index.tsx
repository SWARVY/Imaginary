import { createFileRoute } from '@tanstack/react-router';
import { Introduce } from '~/widgets/introduce';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="size-full">
      <Introduce />
    </div>
  );
}
