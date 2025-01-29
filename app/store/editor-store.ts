import EditorJS from '@editorjs/editorjs';
import { create } from 'zustand';

interface EditorStore {
  editor: EditorJS | null;
  initialize: (editor: EditorJS) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  initialize: (editor) => set({ editor }),
}));
