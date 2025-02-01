import { useEffect, useState } from 'react';

export default function PostTOC() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    let editor = document.getElementById('editorjs');

    const updateHeadings = () => {
      if (!editor) return;

      const headingTags = editor.querySelectorAll('h2, h3, h4');
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

          // 동적으로 id 부여
          el.setAttribute('id', uniqueId);

          return {
            id: uniqueId,
            text,
            level: parseInt(el.tagName.substring(1), 10),
          };
        })
        .filter(Boolean) as { id: string; text: string; level: number }[];

      setHeadings(generatedHeadings);
    };

    const observer = new MutationObserver(() => {
      editor = document.getElementById('editorjs');
      updateHeadings();
    });

    if (!editor) {
      const bodyObserver = new MutationObserver(() => {
        editor = document.getElementById('editorjs');
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
    <nav className="fixed top-24 left-10 w-[18.75rem] p-4">
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`ml-${(level - 2) * 4}`}>
            <a href={`#${id}`} className="text-sm break-keep">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
