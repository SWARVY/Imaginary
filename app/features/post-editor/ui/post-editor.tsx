import { PartialBlock } from '@blocknote/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientOnly } from '@suspensive/react';
import { Doc } from 'convex/_generated/dataModel';
import { PostSchema } from 'convex/schema';
import { Suspense, lazy } from 'react';
import {
  type FieldErrors,
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { TiLinkOutline } from 'react-icons/ti';
import { toast } from 'sonner';
import { useEditPost, useInsertPost } from '~/entities/post';
import Editor from '~/shared/ui/blocknote';
import { useEditorStore } from '~/store/editor-store';

import { CATEGORIES } from '../model';

interface PostEditorProps {
  defaultValue?: Doc<'post'>;
  type?: 'CREATE' | 'EDIT';
}

export default function PostEditor({
  defaultValue,
  type = 'CREATE',
}: PostEditorProps) {
  const { mutateAsync: createMutateAsync } = useInsertPost();
  const { mutateAsync: editMutateAsync } = useEditPost();
  const { editor } = useEditorStore();
  const methods = useForm<Doc<'post'>>({
    resolver: zodResolver(PostSchema),
    defaultValues: defaultValue ?? {
      type: 'POST',
      title: '',
      contents: '',
      relatedPosts: ['', '', '', ''],
    },
    mode: 'onSubmit',
  });

  const handleEditorSubmit = async (data: Doc<'post'>) => {
    if (!editor) return;

    const outputData = editor.document;

    if (outputData.length === 0) {
      return toast.error('작성된 글이 없습니다.');
    }

    const input = { ...data, contents: JSON.stringify(outputData) };

    if (type === 'CREATE') {
      createMutateAsync({ input });
    } else {
      editMutateAsync({ input });
    }
  };

  const handleSubmitError = (errors: FieldErrors<Doc<'post'>>) => {
    Object.values(errors).forEach((error) => {
      if (error && error.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-full space-y-4"
          onSubmit={methods.handleSubmit(handleEditorSubmit, handleSubmitError)}
        >
          <Title />
          <div className="rounded-md ring-black focus-within:ring-2 dark:ring-white">
            <Suspense
              fallback={
                <div className="flex size-full justify-center">
                  <span className="loading loading-infinity loading-xl" />
                </div>
              }
            >
              <ClientOnly>
                <Editor
                  className="py-4"
                  {...(defaultValue && {
                    initialContent: JSON.parse(defaultValue.contents),
                  })}
                />
              </ClientOnly>
            </Suspense>
          </div>
          <RelatedPosts />
          <SaveButtons />
        </form>
      </FormProvider>
    </>
  );
}

function Title() {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="input input-xl input-ghost grow px-0"
          maxLength={100}
          {...register('title', {
            required: { value: true, message: '제목을 입력해주세요.' },
          })}
        />
        <div className="shrink-0 filter">
          <input
            className="btn btn-sm btn-soft filter-reset"
            type="radio"
            name="type"
            aria-label="All"
          />
          {...CATEGORIES.map(({ type, value }) => (
            <input
              key={type}
              className="btn btn-sm btn-soft"
              type="radio"
              aria-label={value}
              value={type}
              {...register('type')}
            />
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
}

function RelatedPosts() {
  const { register } = useFormContext();

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Related post</legend>
      {[...Array(4)].map((_, index) => (
        <label key={index} className="input validator w-full">
          <TiLinkOutline
            size={16}
            className="fill-black opacity-80 dark:fill-gray-500"
          />
          <input
            type="url"
            placeholder="https://"
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
            {...register(`relatedPosts.${index}`)}
          />
        </label>
      ))}
    </fieldset>
  );
}

function SaveButtons() {
  const { isSubmitting } = useFormState();

  return (
    <div className="fixed right-4 bottom-4 z-40 md:right-10 md:bottom-10">
      <div className="lg:tooltip" data-tip="save">
        <button
          type="submit"
          className="btn btn-xl btn-soft btn-primary btn-circle"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner" />
          ) : (
            <IoIosSave className="size-6" />
          )}
        </button>
      </div>
    </div>
  );
}
