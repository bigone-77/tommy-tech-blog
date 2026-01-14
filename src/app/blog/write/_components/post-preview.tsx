'use client';

import { H1Typography } from '@/components/ui/typography';

export function PostPreview({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const formatPreview = (text: string) => {
    if (!text) return '';
    return (
      text
        .replace(
          /```(\w*)\n([\s\S]*?)```/g,
          '<pre class="bg-secondary/50 p-4 rounded-lg my-6 font-mono text-sm border"><code>$2</code></pre>',
        )
        .replace(/^---$/gm, '<hr class="my-10 border-t-2 border-border/50" />')
        .replace(
          /^> (.*)$/gm,
          '<blockquote class="mt-6 border-l-2 pl-6 italic text-muted-foreground/80 font-serif">$1</blockquote>',
        )
        .replace(
          /^# (.*$)/gm,
          '<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight mb-10 mt-14">$1</h1>',
        )
        .replace(
          /^## (.*$)/gm,
          '<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12 mb-6">$1</h2>',
        )
        .replace(
          /^### (.*$)/gm,
          '<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">$1</h3>',
        )
        // ✅ MediaViewer 스타일 이미지 변환
        .replace(
          /!\[(.*?)\]\((.*?)\)/g,
          `
        <div class="my-6 w-full">
          <div class="relative aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
            <img src="$2" alt="$1" class="h-full w-full object-cover" />
          </div>
          <p class="mt-2 text-center text-sm text-muted-foreground">$1</p>
        </div>
      `,
        )
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(
          /`(.*?)`/g,
          '<code class="bg-muted px-1.5 py-0.5 rounded text-pink-500 font-mono text-sm">$1</code>',
        )
    );
  };

  return (
    <div className='bg-muted/5 h-full overflow-y-auto p-12'>
      <article className='max-w-none'>
        <H1Typography className='mb-8 border-none pb-0 text-left text-[2.75rem] leading-tight font-bold tracking-tight'>
          {title || '제목을 입력하세요'}
        </H1Typography>
        <div className='bg-foreground/10 mb-12 h-1.5 w-16 rounded-full' />
        <div className='prose dark:prose-invert prose-lg max-w-none'>
          <div
            className='leading-relaxed whitespace-pre-wrap'
            dangerouslySetInnerHTML={{ __html: formatPreview(content) }}
          />
        </div>
      </article>
    </div>
  );
}
