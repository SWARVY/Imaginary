import { zodResolver } from '@hookform/resolvers/zod';
import { Doc } from 'convex/_generated/dataModel';
import { PostSchema } from 'convex/schema';
import { Suspense, lazy } from 'react';
import {
  type FieldErrors,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { TiLinkOutline } from 'react-icons/ti';
import { toast } from 'sonner';
import { useEditPost, useInsertPost } from '~/entities/post';
import { useEditorStore } from '~/store/editor-store';

import { CATEGORIES } from '../model';

const EditorComponent = lazy(() => import('~/shared/ui/editor'));

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

    const outputData = await editor.save();

    if (outputData.blocks.length === 0) {
      return toast.error('작성된 글이 없습니다.');
    }

    const input = { ...data, contents: JSON.stringify(outputData) };

    // for Debug
    console.log(input);
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
          <div className="rounded-md py-4 ring-black focus-within:ring-2 dark:ring-white">
            <Suspense fallback="...loading">
              <EditorComponent
                className="w-full"
                data={
                  defaultValue ? JSON.parse(defaultValue.contents) : undefined
                }
              />
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
            className="btn btn-sm btn-outline filter-reset"
            type="radio"
            name="type"
            aria-label="All"
          />
          {...CATEGORIES.map(({ type, value }) => (
            <input
              key={type}
              className="btn btn-sm btn-outline"
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
            className="fill-black opacity-50 dark:fill-gray-200"
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
  return (
    <div className="fixed right-10 bottom-10 z-20">
      <div className="lg:tooltip" data-tip="save">
        <button
          type="submit"
          className="btn btn-xl btn-outline btn-circle bg-white transition-colors hover:bg-gray-200"
        >
          <IoIosSave className="size-6 fill-black" />
        </button>
      </div>
    </div>
  );
}
