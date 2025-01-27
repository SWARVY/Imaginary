import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';

export default function EditorComponent() {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {},
      placeholder: '여기에 내용을 입력하세요...',
    });

    // 컴포넌트 언마운트 시 에디터 정리
    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id="editorjs" />;
}
