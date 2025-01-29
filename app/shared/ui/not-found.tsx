import DefaultError from './default-error';

export function NotFound() {
  return <DefaultError message="존재하지 않는 페이지입니다." />;
}
