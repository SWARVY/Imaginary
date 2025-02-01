import { SignedIn } from '@clerk/tanstack-start';
import { convexQuery } from '@convex-dev/react-query';
import Giscus from '@giscus/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { api } from 'convex/_generated/api';
import type { Doc, Id } from 'convex/_generated/dataModel';
import { format } from 'date-fns';
import { Suspense, lazy, useEffect, useState } from 'react';
import { TiDelete, TiEdit } from 'react-icons/ti';
import { useDeletePost } from '~/entities/post';
import { PostEditor } from '~/features/post-editor';
import openModal from '~/shared/lib/open-modal';
import AlertDialog from '~/shared/ui/alert-dialog';
import { NotFound } from '~/shared/ui/not-found';

const EditorComponent = lazy(() => import('~/shared/ui/editor'));

interface PostViewerProps {
  postId: Id<'post'>;
}

interface PostViewerContentsProps {
  data: Doc<'post'>;
}

interface PostManageButtonsProps {
  edit: () => void;
  remove: () => void;
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
  const { mutateAsync } = useDeletePost();

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
      <Suspense fallback="...loading">
        <EditorComponent
          className="w-full"
          readOnly
          data={JSON.parse(data.contents)}
        />
      </Suspense>
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
            <div className="py-8 text-center">연관된 게시글이 없어요 📭</div>
          )}
        </div>
      </ul>
      <PostComments />
      <SignedIn>
        <PostManageButtonsProps
          edit={() => setEditMode(true)}
          remove={() => mutateAsync({ id: data._id })}
        />
      </SignedIn>
    </div>
  ) : (
    <PostEditor type="EDIT" defaultValue={data} />
  );
}

function PostComments() {
  const [theme, setTheme] = useState<string>(
    document.documentElement.getAttribute('data-theme') === 'lofi'
      ? 'light_high_contrast'
      : 'https://giscus.app/themes/custom_example.css',
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currTheme =
        document.documentElement.getAttribute('data-theme') ?? 'lofi';
      const giscusTheme =
        currTheme === 'lofi'
          ? 'light_high_contrast'
          : 'https://giscus.app/themes/custom_example.css';
      setTheme(giscusTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Giscus
      id="comments"
      repo="SWARVY/Imaginary"
      repoId="R_kgDONrtNMw="
      category="Announcements"
      categoryId="DIC_kwDONrtNM84Cmfgt"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}

function PostManageButtonsProps({ edit, remove }: PostManageButtonsProps) {
  return (
    <div className="fixed right-10 bottom-10 z-40 flex flex-col gap-y-2">
      <div className="lg:tooltip" data-tip="delete">
        <button
          type="button"
          className="btn btn-xl btn-outline btn-circle bg-white transition-colors hover:bg-gray-200"
          onClick={() => openModal('delete-dialog')}
        >
          <TiDelete className="size-6 fill-black" />
        </button>
        <AlertDialog id="delete-dialog" onClick={remove}>
          <h3 className="text-lg font-bold">포스트를 삭제하실건가요?</h3>
          <p className="py-4">포스트를 삭제하면 복구가 불가능해요 😢</p>
        </AlertDialog>
      </div>
      <div className="lg:tooltip" data-tip="edit">
        <button
          type="button"
          className="btn btn-xl btn-outline btn-circle bg-white transition-colors hover:bg-gray-200"
          onClick={edit}
        >
          <TiEdit className="size-6 fill-black" />
        </button>
      </div>
    </div>
  );
}
