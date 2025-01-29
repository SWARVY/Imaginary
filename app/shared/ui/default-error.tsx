import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from '@tanstack/react-router';

interface DefaultErrorProps {
  message: string;
}

export default function DefaultError({ message }: DefaultErrorProps) {
  return (
    <div className="hero h-full self-center">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <DotLottieReact src="/astronaut.lottie" loop autoplay />
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
