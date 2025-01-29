export default function NeedAuth() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h2 className="text-5xl font-bold">권한이 필요해요</h2>
          <p className="py-6">
            해당 동작을 수행하기위해서는 Clerk의 회원 인증이 필요해요.
          </p>
        </div>
      </div>
    </div>
  );
}
