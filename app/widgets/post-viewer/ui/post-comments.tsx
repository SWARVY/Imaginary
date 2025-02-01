import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function PostComments() {
  const [theme, setTheme] = useState<string>(
    document.documentElement.getAttribute('data-theme') === 'lofi'
      ? 'light_high_contrast'
      : 'https://giscus.app/themes/custom_example.css',
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currTheme =
        document.documentElement.getAttribute('data-theme') ?? 'lofi';
      const giscusTheme =
        currTheme === 'lofi'
          ? 'light_high_contrast'
          : 'https://giscus.app/themes/custom_example.css';
      setTheme(giscusTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Giscus
      id="comments"
      repo="SWARVY/Imaginary"
      repoId="R_kgDONrtNMw="
      category="Announcements"
      categoryId="DIC_kwDONrtNM84Cmfgt"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}
