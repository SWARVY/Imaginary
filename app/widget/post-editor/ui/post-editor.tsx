import { zodResolver } from '@hookform/resolvers/zod';
import { Doc } from 'convex/_generated/dataModel';
import { PostsSchema } from 'convex/schema';
import {
  type FieldErrors,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { TiLinkOutline, TiPen } from 'react-icons/ti';
import { ToastContainer, toast } from 'react-toastify';
import EditorComponent from '~/shared/ui/editor';
import { useEditorStore } from '~/store/editor-store';

import useInsertPost from '../model/useInsertPost';

const mockCategories = ['포스트', '디버그', '스니펫'];

export default function PostEditor() {
  const { mutateAsync } = useInsertPost();
  const { editor } = useEditorStore();
  const methods = useForm<Doc<'posts'>>({
    resolver: zodResolver(PostsSchema),
    defaultValues: {
      title: '',
      createdAt: new Date().toISOString(),
      contents: '',
      relatedPosts: ['', '', '', ''],
    },
    mode: 'onSubmit',
  });

  const handleEditorSubmit = async (data: Doc<'posts'>) => {
    if (!editor) return;

    const outputData = await editor.save();

    if (outputData.blocks.length === 0) {
      toast.error('작성된 글이 없습니다.');
    } else {
      console.log({ ...data, contents: JSON.stringify(outputData) });
      mutateAsync({ ...data, contents: JSON.stringify(outputData) });
    }
  };

  const handleSubmitError = (errors: FieldErrors<Doc<'posts'>>) => {
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
          <div className="rounded-md py-4 ring-black focus-within:ring-2">
            <EditorComponent className="w-full" />
          </div>
          <RelatedPosts />
          <SaveButtons />
        </form>
        <div className="toast">
          <div className="alert"></div>
        </div>
      </FormProvider>
      <ToastContainer />
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
            name="category"
            aria-label="All"
          />
          {...mockCategories.map((category) => (
            <input
              key={category}
              className="btn btn-sm btn-outline"
              type="radio"
              name="category"
              aria-label={category}
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
      <legend className="fieldset-legend">Related Posts</legend>
      {[...Array(4)].map((_, index) => (
        <label key={index} className="input validator w-full">
          <TiLinkOutline size={16} className="opacity-50" fill="black" />
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
    <button
      type="submit"
      className="btn btn-xl btn-outline btn-circle absolute right-10 bottom-10 bg-white transition-colors hover:bg-gray-200"
    >
      <TiPen className="size-6 fill-black" />
    </button>
  );
}
