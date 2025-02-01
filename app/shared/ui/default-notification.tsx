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
    <div className={cn('hero size-full', 'pt-14 pb-16 md:pt-28 md:pb-32')}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <DotLottieReact src="/astronaut.lottie" loop autoplay />
          <h2 className="text-4xl font-bold break-keep">{title}</h2>
          <p className="py-6 break-keep">{message}</p>
        </div>
      </div>
    </div>
  );
}
