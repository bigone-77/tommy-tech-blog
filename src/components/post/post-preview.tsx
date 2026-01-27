'use client';

import { useEffect, useState } from 'react';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

import { DocsBody } from 'fumadocs-ui/page';

import { compileMDXAction } from '@/app/page.actions';
import { H1Typography } from '@/components/ui/typography';
import { getMDXComponents } from '@/mdx-components';

export function PostPreview({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

  useEffect(() => {
    const compile = async () => {
      const result = await compileMDXAction(content);
      setMdxSource(result);
    };

    const timer = setTimeout(compile, 500);
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div className='bg-muted/5 h-full overflow-y-auto p-12'>
      <article className='max-w-none'>
        <header className='mb-8'>
          <H1Typography className='border-none pb-0 text-left text-[2.75rem] leading-tight font-bold tracking-tight'>
            {title || '제목을 입력하세요'}
          </H1Typography>
          <div className='bg-foreground/10 mt-6 h-1.5 w-16 rounded-full' />
        </header>

        <div className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={getMDXComponents()} />
            ) : (
              <p className='text-muted-foreground/50 font-serif italic'>
                서버에서 기똥차게 렌더링 중입니다...
              </p>
            )}
          </DocsBody>
        </div>
      </article>
    </div>
  );
}
