import { PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { api } from 'convex/_generated/api';
import { useMutation } from 'convex/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useEditorStore } from '~/store/editor-store';

import '../../styles/editor.css';
import cn from '../lib/cn';

interface EditorProps {
  className?: string;
  initialContent?: PartialBlock[];
  editable?: boolean;
}

const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

const DEFAULT_CONTENT: PartialBlock[] = [
  {
    type: 'heading',
    props: {
      level: 3,
    },
    content: '✨ 자유롭게 글을 작성해보세요!',
  },
  {
    type: 'bulletListItem',
    content:
      '📝 글쓰기 도구를 사용하려면 텍스트를 입력하시거나 + 버튼을 클릭하세요',
  },
  {
    type: 'bulletListItem',
    content: '🖼️ 이미지도 + 버튼을 통해 쉽게 추가할 수 있어요',
  },
  {
    type: 'paragraph',
  },
];

export default function Editor({
  className,
  initialContent,
  editable = true,
}: EditorProps) {
  const { initialize } = useEditorStore();
  const [theme, setTheme] = useState<'lofi' | 'sunset'>('lofi');
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);
  const editor = useCreateBlockNote({
    initialContent: initialContent ?? DEFAULT_CONTENT,
    uploadFile,
  });

  async function uploadFile(file: File) {
    try {
      const postURL = await generateUploadUrl();
      const result = await fetch(postURL, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const { storageId } = await result.json();
      const searchParams = new URLSearchParams({ storageId });

      await sendImage({ storageId });

      return `${convexSiteUrl}/getImage?${searchParams.toString()}`;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`이미지 업로드에 실패했어요 😢`);
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했어요 😢');
      }

      return '';
    }
  }

  useEffect(() => {
    initialize(editor);
  }, []);

  useEffect(() => {
    const currTheme = document.documentElement.getAttribute('data-theme') as
      | 'lofi'
      | 'sunset';
    setTheme(currTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute(
            'data-theme',
          ) as 'lofi' | 'sunset';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BlockNoteView
      id="bn-editor"
      className={cn(className)}
      editor={editor}
      editable={editable}
      theme={theme === 'lofi' ? 'light' : 'dark'}
      data-font-pretendard
    />
  );
}
