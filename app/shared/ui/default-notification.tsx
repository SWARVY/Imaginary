import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface DefaultNotificationProps {
  title: string;
  message: string;
}

export default function DefaultNotification({
  title,
  message,
}: DefaultNotificationProps) {
  return (
    <div className="hero h-full self-center">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <DotLottieReact src="/astronaut.lottie" loop autoplay />
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="py-6">{message}</p>
        </div>
      </div>
    </div>
  );
}
