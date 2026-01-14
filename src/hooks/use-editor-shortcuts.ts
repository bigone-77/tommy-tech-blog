// src/hooks/use-editor-shortcuts.ts
import { RefObject } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { EDITOR_SHORTCUTS } from '@/constants/editor-shortcuts';
import { insertMarkdown } from '@/lib/editor-utils';

export function useEditorShortcuts(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: UseFormSetValue<any>,
) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isModifier = e.metaKey || e.ctrlKey; // Cmd(Mac) or Ctrl(Win)
    const key = e.key.toLowerCase() as keyof typeof EDITOR_SHORTCUTS;

    // 1. 현재 입력된 키가 설정파일에 존재하는지 확인
    const config = EDITOR_SHORTCUTS[key];

    if (isModifier && config) {
      // 2. Shift 키 필요 여부 확인 (취소선 같은 경우)
      // config에 shift 속성이 있으면 해당 값과 비교, 없으면 Shift가 눌리지 않아야 함
      const shiftRequired = 'shift' in config ? config.shift : false;

      if (e.shiftKey === shiftRequired) {
        e.preventDefault(); // 브라우저 기본 동작 방지

        if (textareaRef.current) {
          // 3. insertMarkdown은 이미 선택된 영역(selectionStart/End)을
          // 처리하도록 설계되어 있으므로 하이라이트 상태에서도 작동합니다.
          insertMarkdown(textareaRef.current, config.action, (val) => {
            setValue('content', val, {
              shouldDirty: true,
              shouldValidate: true,
            });
          });
        }
      }
    }
  };

  return { handleKeyDown };
}
