import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect } from 'react';
import { useEditorStore } from '~/store/editor-store';

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

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {},
      placeholder: '여기에 내용을 입력하세요...',
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

  return <div id="editorjs" className={className} />;
}
