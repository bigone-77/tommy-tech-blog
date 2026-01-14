import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft } from 'lucide-react';
import rehypeSlug from 'rehype-slug';

// ✅ 추가: DB 문자열 렌더링용

import { AppLayout } from '@/components/app-layout';
import { TableOfContents } from '@/components/table-of-contents';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { getBlogSource } from '@/lib/source';
// ✅ 수정: 비동기 로더 함수
import { getFormattedDate } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const blogSource = await getBlogSource();
  const page = blogSource.getPage([id]);

  if (!page) return notFound();

  const { title, date, content, tags } = page.data;

  return (
    <AppLayout
      aside={
        <div className='border-border bg-card rounded-xl border p-6 shadow-sm'>
          <p className='text-muted-foreground/80 mb-4 text-xs font-bold tracking-widest uppercase'>
            On This Page
          </p>
          <TableOfContents content={content} />
        </div>
      }
    >
      <div className='space-y-6'>
        <div className='text-muted-foreground flex flex-wrap items-center gap-3 gap-y-5 text-sm'>
          <Button variant='outline' asChild className='h-6 w-6'>
            <Link href='/'>
              <ArrowLeft className='h-4 w-4' />
              <span className='sr-only'>Back to all articles</span>
            </Link>
          </Button>

          {tags && tags.length > 0 && (
            <div className='text-muted-foreground flex flex-wrap gap-3'>
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-muted text-muted-foreground flex h-6 w-fit items-center justify-center rounded-md border px-3 text-sm font-medium'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <time className='text-muted-foreground font-medium'>
            {getFormattedDate(new Date(date), 'M월 d일, yyyy년')}
          </time>
        </div>

        <H1Typography className='text-start'>{title}</H1Typography>

        <div className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            <MDXRemote
              source={content}
              components={getMDXComponents()}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </DocsBody>
        </div>
      </div>
    </AppLayout>
  );
}
