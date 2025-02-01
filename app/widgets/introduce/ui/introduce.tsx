import { TiDropbox, TiSocialGithub, TiSpiral } from 'react-icons/ti';

export default function Introduce() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-4 divide-y">
        <h3 className="py-2 text-lg font-bold">🔮 Introduce</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-x-1 text-sm font-bold">
            <p>신현호</p>
            <span>&middot;</span>
            <p>SWARVY</p>
          </div>
          <div>
            <p>React, Next, Typescript Enthusiast</p>
            <p className="flex flex-wrap items-center gap-x-1">
              I am keenly passionate about
              <a
                href="https://tanstack.com/start/latest/docs/framework/react/overview"
                target="_blank"
                className="link link-primary font-bold"
              >
                @tanstack/start
              </a>
              &
              <a
                href="https://tanstack.com/router/latest/docs/framework/react/overview"
                target="_blank"
                className="link link-primary font-bold"
              >
                @tanstack/router
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 divide-y">
        <h3 className="py-2 text-lg font-bold">🚀 Work</h3>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-x-1">
            2024.12.02 ~
            <a
              href="https://buttersoft.io/"
              target="_blank"
              className="link link-primary font-bold"
            >
              Buttersoft
            </a>
            Frontend Developer
          </p>
        </div>
      </div>
      <div className="space-y-4 divide-y">
        <h3 className="py-2 text-lg font-bold">🛠️ ETC</h3>
        <p className="space-x-1 text-sm">
          This site is built with
          <span className="font-bold"> @tanstack/start</span>
          <br />
          If you’re curious about the source code, check out this {''}
          <a
            href="https://github.com/SWARVY/Imaginary"
            target="_blank"
            className="link link-primary font-bold"
          >
            github repository
          </a>{' '}
          ✨
        </p>
      </div>
      <SnsList />
    </div>
  );
}

function SnsList() {
  return (
    <div className="grid w-fit grid-cols-3 gap-x-1 self-end">
      <div className="lg:tooltip" data-tip="email">
        <a
          href="mailto:swarvy0826@naver.com"
          target="_blank"
          className="btn btn-ghost btn-xs size-10 p-2"
        >
          <TiSpiral className="size-8" />
        </a>
      </div>
      <div className="lg:tooltip" data-tip="github">
        <a
          href="https://github.com/SWARVY"
          target="_blank"
          className="btn btn-ghost btn-xs size-10 p-2"
        >
          <TiSocialGithub className="size-8" />
        </a>
      </div>
      <div className="lg:tooltip" data-tip="previous blog">
        <a
          href="https://caffhheiene.vercel.app/"
          target="_blank"
          className="btn btn-ghost btn-xs size-10 p-2"
        >
          <TiDropbox className="size-8" />
        </a>
      </div>
    </div>
  );
}
