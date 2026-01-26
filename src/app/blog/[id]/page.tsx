import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { remarkGfm } from 'fumadocs-core/mdx-plugins';
import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { AppLayout } from '@/components/app-layout';
import { ReadMoreSection } from '@/components/read-more-section';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { auth } from '@/lib/auth';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';
import { getBlogSource } from '@/lib/source';
import { extractHeadings } from '@/lib/toc';
import { getFormattedDate } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';

import { EditDeleteBtn } from './_components/edit-delete-btn';
import { GiscusComments } from './_components/giscus-comments';
import { ViewCounter } from './_components/view-counter';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  const { id } = await params;

  const blogSource = await getBlogSource();
  const page = blogSource.getPage([id]);

  if (!page) return notFound();

  const { title, date, content, tags, viewCount, readingTime } = page.data;

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
      <BreadcrumbSetter title={title} />

      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            asChild
            className='text-muted-foreground hover:text-foreground h-8 gap-2 px-2'
          >
            <Link href='/blog'>
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>목록으로</span>
            </Link>
          </Button>
          {isAdmin && <EditDeleteBtn id={id} />}
        </div>

        <div className='space-y-4'>
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-3'>
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

          <H1Typography className='text-start leading-tight'>
            {title}
          </H1Typography>

          <div className='text-muted-foreground flex items-center gap-3 text-sm'>
            <time className='font-medium'>
              {getFormattedDate(new Date(date), 'yyyy년 M월 d일')}
            </time>
            <span className='text-muted-foreground/30'>·</span>
            <div className='flex items-center gap-1'>
              <Eye className='h-3.5 w-3.5' />
              <span>{viewCount?.toLocaleString() ?? 0} views</span>
            </div>
            <span className='text-muted-foreground/30'>·</span>
            <div className='flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5' />
              <span>{readingTime ?? 5} min read</span>
            </div>
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
                        theme: {
                          dark: 'one-dark-pro',
                          light: 'github-light',
                        },
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

        <div className='mt-16 border-t pt-10'>
          <GiscusComments />
          <ReadMoreSection currentId={id} currentTags={tags} />
        </div>
      </div>

      <ViewCounter postId={id} />
    </AppLayout>
  );
}
