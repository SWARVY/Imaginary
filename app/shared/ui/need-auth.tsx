import DefaultError from './default-error';

export default function NeedAuth() {
  return (
    <DefaultError message="해당 동작을 수행하기 위해서는 Clerk의 회원 인증이 필요해요." />
  );
}
