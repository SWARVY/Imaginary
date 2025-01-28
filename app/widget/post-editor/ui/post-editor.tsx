import { TiPen } from 'react-icons/ti';
import EditorComponent from '~/shared/ui/editor';

const mockCategories = ['포스트', '디버그', '스니펫'];

export default function PostEditor() {
  return (
    <div className="w-full space-y-4">
      <Title />
      <div className="rounded-md py-4">
        <EditorComponent className="w-full" />
      </div>
      <RelatedPosts />
      <SaveButtons />
    </div>
  );
}

function Title() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="input input-xl input-ghost grow px-0"
          maxLength={100}
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
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Related Posts</legend>
      <input
        type="text"
        className="input w-full"
        placeholder="관련 링크를 적어주세요."
      />
      <input
        type="text"
        className="input w-full"
        placeholder="관련 링크를 적어주세요."
      />
      <input
        type="text"
        className="input w-full"
        placeholder="관련 링크를 적어주세요."
      />
      <input
        type="text"
        className="input w-full"
        placeholder="관련 링크를 적어주세요."
      />
    </fieldset>
  );
}

function SaveButtons() {
  return (
    <button className="btn btn-xl btn-circle absolute right-10 bottom-10 bg-white transition-colors hover:bg-gray-200">
      <TiPen className="size-6 fill-black" />
    </button>
  );
}
