import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { remarkGfm } from 'fumadocs-core/mdx-plugins';
import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { AppLayout } from '@/components/app-layout';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { auth } from '@/lib/auth';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';
import { getTilSource } from '@/lib/source';
import { extractHeadings } from '@/lib/toc';
import { getFormattedDate } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';

import { EditDeleteBtn } from '../../blog/[id]/_components/edit-delete-btn';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;
  const { id } = await params;

  const tilSource = await getTilSource();
  const page = tilSource.getPage([id]);

  if (!page) return notFound();

  const { title, date, content, tags } = page.data;

  const headings = extractHeadings(content);
  const hasToc = headings?.length > 0;

  return (
    <AppLayout
      aside={
        hasToc ? (
          <div className='border-border bg-card rounded-xl border p-5 shadow-sm'>
            <p className='text-muted-foreground/50 mb-3 text-[11px] font-bold tracking-widest uppercase'>
              학습 목차
            </p>
            <TableOfContents headings={headings} />
          </div>
        ) : null
      }
    >
      <ReadProgressBar />
      <BreadcrumbSetter title={title} />

      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            asChild
            className='text-muted-foreground hover:text-foreground h-8 gap-2 px-2'
          >
            <Link href='/til'>
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>기록 목록</span>
            </Link>
          </Button>
          {isAdmin && <EditDeleteBtn id={id} />}
        </div>

        <div className='space-y-4'>
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-primary/10 text-primary border-primary/20 flex h-6 items-center rounded-md border px-3 text-xs font-bold'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <H1Typography className='text-start leading-tight'>
            {title}
          </H1Typography>

          <div className='text-muted-foreground text-sm font-medium'>
            {getFormattedDate(new Date(date), 'yyyy년 M월 d일')} 기록됨
          </div>
        </div>

        <hr className='border-border/50' />

        <div className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            <MDXRemote
              source={content}
              components={getMDXComponents()}
              options={{
                mdxOptions: {
                  format: 'md',
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeRaw,
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: 'one-dark-pro', light: 'github-light' },
                        keepBackground: true,
                        showLineNumbers: true,
                        onVisitLine(node: any) {
                          if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }];
                          }
                        },
                      },
                    ],
                    rehypeSlug,
                  ],
                },
              }}
            />
          </DocsBody>
        </div>
      </div>
    </AppLayout>
  );
}
