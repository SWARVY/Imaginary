import { useEffect, useState } from 'react';

export default function PostTOC() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    let editor = document.getElementById('bn-editor');

    const updateHeadings = () => {
      if (!editor) return;

      // Update selector to match BlockNote's heading structure
      const headingTags = editor.querySelectorAll(
        '[data-content-type="heading"]',
      );
      const seenIds = new Set();

      const generatedHeadings = Array.from(headingTags)
        .map((el) => {
          const text = el.textContent?.trim() || '';
          if (!text) return null;

          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

          let uniqueId = id;
          let count = 1;
          while (seenIds.has(uniqueId)) {
            uniqueId = `${id}-${count}`;
            count++;
          }
          seenIds.add(uniqueId);

          el.setAttribute('id', uniqueId);

          // Get heading level from data-level attribute
          const level = parseInt(el.getAttribute('data-level') || '1', 10);

          return {
            id: uniqueId,
            text,
            level,
          };
        })
        .filter(Boolean) as { id: string; text: string; level: number }[];

      setHeadings(generatedHeadings);
    };

    const observer = new MutationObserver(() => {
      editor = document.getElementById('bn-editor');
      updateHeadings();
    });

    if (!editor) {
      const bodyObserver = new MutationObserver(() => {
        editor = document.getElementById('bn-editor');
        if (editor) {
          bodyObserver.disconnect();
          observer.observe(editor, { childList: true, subtree: true });
          updateHeadings();
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    } else {
      observer.observe(editor, { childList: true, subtree: true });
      updateHeadings();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-20 left-10 hidden w-[18.75rem] p-4 2xl:block">
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`pl-${(level - 2) * 4}`}>
            <a href={`#${id}`} className="link link-hover text-sm break-keep">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
