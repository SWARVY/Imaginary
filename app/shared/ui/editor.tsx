import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';
import { useEditorStore } from '~/store/editor-store';

interface EditorComponentProps {
  className?: string;
}

export default function EditorComponent({ className }: EditorComponentProps) {
  const { initialize } = useEditorStore();

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {},
      placeholder: '여기에 내용을 입력하세요...',
      onReady: () => initialize(editor),
    });

    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id="editorjs" className={className} />;
}
