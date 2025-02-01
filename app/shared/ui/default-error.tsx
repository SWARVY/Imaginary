import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from '@tanstack/react-router';

import cn from '../lib/cn';

interface DefaultErrorProps {
  message: string;
}

export default function DefaultError({ message }: DefaultErrorProps) {
  return (
    <div className="hero size-full">
      <div
        className={cn(
          'hero-content flex-col text-center',
          'pt-14 pb-16 md:pt-28 md:pb-32',
        )}
      >
        <DotLottieReact src="/astronaut.lottie" loop autoplay />
        <div>
          <h2 className="text-5xl font-bold">
            Houston, <br />
            We have a problem
          </h2>
          <p className="py-6">{message}</p>
          <div className="grid grid-cols-2 gap-x-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              이전 화면
            </button>
            <Link to="/" className="btn btn-outline">
              홈으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
