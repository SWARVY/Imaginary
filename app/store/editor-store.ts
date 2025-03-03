import { BlockNoteEditor } from '@blocknote/core';
import { create } from 'zustand';

interface EditorStore {
  editor: BlockNoteEditor | null;
  initialize: (editor: BlockNoteEditor) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  initialize: (editor) => set({ editor }),
}));
