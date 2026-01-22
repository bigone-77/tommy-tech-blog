import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft } from 'lucide-react';
import rehypeSlug from 'rehype-slug';

import { AppLayout } from '@/components/app-layout';
import { ReadMoreSection } from '@/components/read-more-section';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { getBlogSource } from '@/lib/source';
import { extractHeadings } from '@/lib/toc';
import { getFormattedDate } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';

import { EditDeleteBtn } from './_components/edit-delete-btn';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const blogSource = await getBlogSource();
  const page = blogSource.getPage([id]);

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
              목차
            </p>
            <TableOfContents headings={headings} />
          </div>
        ) : null
      }
    >
      <ReadProgressBar />
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='text-muted-foreground flex flex-wrap items-center gap-3 gap-y-5 text-sm'>
            <Button variant='outline' asChild className='h-6 w-6'>
              <Link href='/blog'>
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
          <EditDeleteBtn id={id} />
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

        <div className='mt-10'>
          <ReadMoreSection currentId={id} currentTags={tags} />
        </div>
      </div>
    </AppLayout>
  );
}
