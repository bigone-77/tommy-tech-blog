// src/config/editor-shortcuts.ts
export type MarkdownAction =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'quote'
  | 'link'
  | 'image'
  | 'video'
  | 'code';

export const EDITOR_SHORTCUTS = {
  b: { action: 'bold', label: '굵게', shortcut: '⌘B' },
  i: { action: 'italic', label: '기울임체', shortcut: '⌘I' },
  u: { action: 'underline', label: '밑줄', shortcut: '⌘U' },
  k: { action: 'link', label: '링크', shortcut: '⌘K' },
  e: { action: 'code', label: '코드', shortcut: '⌘E' },
  x: { action: 'strike', label: '취소선', shortcut: '⌘⇧X', shift: true }, // Shift 조합
} as const;
