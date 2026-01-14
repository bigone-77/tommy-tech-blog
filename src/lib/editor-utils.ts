import { MarkdownAction as MarkdownActionType } from '@/constants/editor-shortcuts';

/**
 * textarea의 현재 커서 위치에 마크다운 또는 커스텀 컴포넌트 태그를 삽입합니다.
 */
export const insertMarkdown = (
  textarea: HTMLTextAreaElement,
  type: MarkdownActionType,
  onChange: (value: string) => void,
) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const fullText = textarea.value;
  const selectedText = fullText.substring(start, end);

  let replacement = '';
  let cursorOffset = 0;

  switch (type) {
    // 헤딩 및 텍스트 스타일: mdx-components에서 처리하므로 표준 문법 유지
    case 'h1':
      replacement = `# ${selectedText}`;
      cursorOffset = 2;
      break;
    case 'h2':
      replacement = `## ${selectedText}`;
      cursorOffset = 3;
      break;
    case 'h3':
      replacement = `### ${selectedText}`;
      cursorOffset = 4;
      break;
    case 'h4':
      replacement = `#### ${selectedText}`;
      cursorOffset = 5;
      break;
    case 'bold':
      replacement = `**${selectedText || '텍스트'}**`;
      cursorOffset = 2;
      break;
    case 'italic':
      replacement = `*${selectedText || '텍스트'}*`;
      cursorOffset = 1;
      break;
    case 'underline':
      replacement = `<u>${selectedText || '밑줄'}</u>`;
      cursorOffset = 3;
      break;
    case 'strike':
      replacement = `~~${selectedText || '취소선'}~~`;
      cursorOffset = 2;
      break;
    case 'quote':
      replacement = `> ${selectedText}`;
      cursorOffset = 2;
      break;
    case 'link':
      replacement = `[${selectedText || '링크'}](https://)`;
      cursorOffset = 1;
      break;

    // 🎨 커스텀 컴포넌트 삽입 (mdx-components.tsx와 일치)
    case 'image':
      replacement = `<ImageViewer src="https://" alt="${selectedText || '이미지 설명'}" />`;
      cursorOffset = 18; // src=" 바로 뒤 위치
      break;

    case 'video':
      replacement = `<VideoViewer src="https://" />`;
      cursorOffset = 18; // src=" 바로 뒤 위치
      break;

    case 'code': {
      // 여러 줄 선택 시 코드 블록(```), 한 줄일 시 인라인 코드(`)
      const isMultiLine = selectedText.includes('\n');
      if (isMultiLine) {
        replacement = `\n\`\`\`tsx\n${selectedText}\n\`\`\`\n`;
        cursorOffset = 8;
      } else {
        replacement = `\`${selectedText || '코드'}\``;
        cursorOffset = 1;
      }
      break;
    }
    default:
      return;
  }

  const newValue =
    fullText.substring(0, start) + replacement + fullText.substring(end);
  onChange(newValue);

  // 삽입 후 포커스를 유지하고 커서를 적절한 위치로 이동시킵니다.
  setTimeout(() => {
    textarea.focus();
    const isMultiLineCode = type === 'code' && selectedText.includes('\n');

    if (isMultiLineCode) {
      textarea.setSelectionRange(
        start + cursorOffset,
        start + cursorOffset + selectedText.length,
      );
    } else {
      // JSX 태그나 마크다운 문법 내부를 선택 상태로 유지
      const isWrap = [
        'bold',
        'italic',
        'underline',
        'strike',
        'code',
        'link',
        'image',
        'video',
      ].includes(type);
      const endOffset = isWrap
        ? type === 'link'
          ? 11
          : type === 'image'
            ? 3
            : type === 'video'
              ? 3
              : type === 'underline'
                ? 4
                : cursorOffset
        : 0;

      textarea.setSelectionRange(
        start + cursorOffset,
        isWrap
          ? start + replacement.length - endOffset
          : start + replacement.length,
      );
    }
  }, 0);
};

/**
 * 현재 커서 위치의 스타일을 감지하여 툴바에 반영합니다.
 */
export const getActiveStyles = (
  textarea: HTMLTextAreaElement,
): MarkdownActionType[] => {
  const { selectionStart: start, value } = textarea;
  const active: MarkdownActionType[] = [];
  const lines = value.substring(0, start).split('\n');
  const currentLine = lines[lines.length - 1];

  // 블록 스타일 감지
  if (currentLine.startsWith('# ')) active.push('h1');
  else if (currentLine.startsWith('## ')) active.push('h2');
  else if (currentLine.startsWith('### ')) active.push('h3');
  else if (currentLine.startsWith('#### ')) active.push('h4');
  else if (currentLine.startsWith('> ')) active.push('quote');

  // 인라인 스타일 및 커스텀 태그 감지
  const textAround = value.substring(
    Math.max(0, start - 20),
    Math.min(value.length, start + 20),
  );
  if (textAround.includes('**')) active.push('bold');
  if (textAround.includes('~~')) active.push('strike');
  if (textAround.includes('<u>')) active.push('underline');
  if (textAround.includes('`')) active.push('code');
  if (textAround.includes('<ImageViewer')) active.push('image');
  if (textAround.includes('<VideoViewer')) active.push('video');
  if (textAround.match(/[^*]\*[^*]/)) active.push('italic');

  return active;
};

export const formatPreview = (text: string) => {
  if (!text) return '';

  return (
    text
      // 1. 코드 블록 (```내용```)
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="bg-secondary/50 p-4 rounded-lg my-6 overflow-x-auto font-mono text-sm border border-border">
        <div class="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground/70">${lang || 'code'}</div>
        <code>${code.trim()}</code>
      </pre>`;
      })
      // 2. 구분선
      .replace(/^---$/gm, '<hr class="my-10 border-t-2 border-border/50" />')
      // 3. 인용구 (BlockquoteTypography 클래스 반영)
      .replace(
        /^> (.*)$/gm,
        '<blockquote class="mt-6 border-l-2 pl-6 italic text-muted-foreground/80">$1</blockquote>',
      )
      // 4. 헤딩 (Typography 컴포넌트의 클래스 반영)
      // H1: text-center는 제외하고 벨로그 스타일로 좌측 정렬 유지
      .replace(
        /^# (.*$)/gm,
        '<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-10 mt-14">$1</h1>',
      )
      // H2: border-b pb-2 반영
      .replace(
        /^## (.*$)/gm,
        '<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6">$1</h2>',
      )
      // H3: text-2xl font-semibold 반영
      .replace(
        /^### (.*$)/gm,
        '<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">$1</h3>',
      )
      // H4: text-xl font-semibold 반영
      .replace(
        /^#### (.*$)/gm,
        '<h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-2">$1</h4>',
      )
      // 5. 볼드 및 인라인 코드 (InlineCodeTypography 클래스 반영)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-pink-500">$1</code>',
      )
  );
};
