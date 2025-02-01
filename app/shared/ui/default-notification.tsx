import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import cn from '../lib/cn';

interface DefaultNotificationProps {
  title: string;
  message: string;
}

export default function DefaultNotification({
  title,
  message,
}: DefaultNotificationProps) {
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
          <h2 className="text-4xl font-bold break-keep">{title}</h2>
          <p className="py-6 break-keep">{message}</p>
        </div>
      </div>
    </div>
  );
}
