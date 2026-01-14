import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft } from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { TableOfContents } from '@/components/table-of-contents';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { blogSource } from '@/lib/source';
import { getFormattedDate } from '@/lib/utils';
import { PostInput as PostType } from '@/schema/write';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const page = blogSource.getPage([id]);

  if (!page) return notFound();

  const post = page.data as unknown as PostType;

  const date = new Date(page.data.date);
  const MDX = page.data.body;

  return (
    <AppLayout
      aside={
        <div className='border-border bg-card rounded-xl border p-6 shadow-sm'>
          <p className='text-muted-foreground/80 mb-4 text-xs font-bold tracking-widest uppercase'>
            On This Page
          </p>
          <TableOfContents />
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
          {page.data.tags && page.data.tags.length > 0 && (
            <div className='text-muted-foreground flex flex-wrap gap-3'>
              {page.data.tags.map((tag: string) => (
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
            {getFormattedDate(new Date(), 'M월 d일, yyyy년')}
          </time>
        </div>

        <H1Typography className='text-start'>{page.data.title}</H1Typography>

        <div className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            <MDX />
          </DocsBody>
        </div>

        {/* <div className="mt-10">
            <ReadMoreSection
              currentSlug={[slug]}
              currentTags={page.data.tags}
            />
          </div> */}
      </div>
    </AppLayout>
  );
}
