import { SignedIn } from '@clerk/tanstack-start';
import { convexQuery } from '@convex-dev/react-query';
import { SuspenseQuery } from '@suspensive/react-query';
import { api } from 'convex/_generated/api';
import type { Doc, Id } from 'convex/_generated/dataModel';
import { format } from 'date-fns';
import { Suspense, useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { PostEditor } from '~/features/post-editor';
import EditorComponent from '~/shared/ui/editor';
import { NotFound } from '~/shared/ui/not-found';

interface PostViewerProps {
  postId: Id<'post'>;
}

interface PostViewerContentsProps {
  data: Doc<'post'>;
}

interface EditButtonProps {
  onClick: () => void;
}

export default function PostViewer({ postId }: PostViewerProps) {
  return (
    <Suspense>
      <SuspenseQuery {...convexQuery(api.posts.getPostDetail, { id: postId })}>
        {({ data }) =>
          data ? <PostViewerContents data={data} /> : <NotFound />
        }
      </SuspenseQuery>
    </Suspense>
  );
}

function PostViewerContents({ data }: PostViewerContentsProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const relatedPosts = data.relatedPosts.filter((link) => link !== '');

  return !editMode ? (
    <div className="space-y-8">
      <div>
        <h2 className="font-bold">{data.title}</h2>
        <div className="flex items-center gap-x-1 text-sm font-light">
          <time>{format(data._creationTime, 'MMM dd, yyyy')}</time>
          <p>&middot;</p>
          <p className="font-medium">신현호</p>
        </div>
      </div>
      <EditorComponent
        className="w-full"
        readOnly
        data={JSON.parse(data.contents)}
      />
      <ul className="w-full space-y-2">
        <h3 className="text-sm font-medium">Related Posts</h3>
        <div className="rounded-md border p-2">
          {relatedPosts.length > 0 ? (
            <>
              {relatedPosts.map((link, idx) => (
                <a key={`${link}-${idx}`} href={link} target="_blank">
                  {link}
                </a>
              ))}
            </>
          ) : (
            <div className="py-8 text-center">연관된 게시글이 없습니다.</div>
          )}
        </div>
      </ul>
      <SignedIn>
        <EditButton onClick={() => setEditMode(true)} />
      </SignedIn>
    </div>
  ) : (
    <PostEditor type="EDIT" defaultValue={data} />
  );
}

function EditButton({ onClick }: EditButtonProps) {
  return (
    <div className="absolute right-10 bottom-10 z-20">
      <div className="lg:tooltip" data-tip="edit">
        <button
          type="button"
          className="btn btn-xl btn-outline btn-circle bg-white transition-colors hover:bg-gray-200"
          onClick={onClick}
        >
          <TiEdit className="size-6 fill-black" />
        </button>
      </div>
    </div>
  );
}
