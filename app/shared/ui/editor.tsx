import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import EditorJS, {
  type OutputData,
  type ToolConstructable,
} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import { api } from 'convex/_generated/api';
import { useMutation } from 'convex/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useEditorStore } from '~/store/editor-store';

import cn from '../lib/cn';

const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

interface EditorComponentProps {
  className?: string;
  readOnly?: boolean;
  data?: OutputData;
}

export default function EditorComponent({
  className,
  readOnly = false,
  data,
}: EditorComponentProps) {
  const { initialize } = useEditorStore();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        // todo: @editorjs/header 타입 수정 되면 변경할 것
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: '여기에 헤더를 입력해주세요 ✨',
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                try {
                  const postUrl = await generateUploadUrl();
                  const result = await fetch(postUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': file.type },
                    body: file,
                  });
                  const { storageId } = await result.json();

                  await sendImage({ storageId });

                  const getImageUrl = new URL(`${convexSiteUrl}/getImage`);

                  getImageUrl.searchParams.set('storageId', storageId);

                  const uploadedFile = { url: getImageUrl.href };

                  console.log(uploadedFile);

                  return {
                    success: 1,
                    file: uploadedFile,
                  };
                } catch (error) {
                  if (error instanceof Error) {
                    toast.error(`이미지 업로드에 실패했어요 😢`);
                    toast.error(error.message);
                  }

                  return {
                    success: 0,
                    error: 'failed to upload image',
                  };
                }
              },
            },
          },
        },
        list: EditorjsList,
        code: CodeTool,
        table: Table,
        quote: Quote,
        delimiter: Delimiter,
        warning: Warning,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
      },
      placeholder: '여기에 내용을 입력하세요 ✨',
      onReady: () => initialize(editor),
      readOnly,
      data,
    });

    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id="editorjs" className={cn(className, 'font-light')} />;
}
