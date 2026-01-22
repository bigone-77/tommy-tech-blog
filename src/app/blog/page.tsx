import { Suspense } from 'react';

import { BookText } from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { H1Typography, LeadTypography } from '@/components/ui/typography';

import { BlogContent } from './_components/blog-content';
import {
  PostGridSkeleton,
  TagFilterSkeleton,
} from './_components/blog-skeletons';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedTag = resolvedParams.tag || 'All';

  return (
    <AppLayout>
      <div className='absolute top-0 left-0 z-0 h-50 w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]'>
        <FlickeringGrid
          className='absolute top-0 left-0 size-full'
          squareSize={4}
          gridGap={6}
          color='#6B7280'
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <header className='relative z-10 space-y-4 border-b pb-12'>
        <div className='space-y-4'>
          <div className='flex items-center gap-x-2'>
            <BookText
              size={48}
              strokeWidth={2.5}
              className='text-primary shrink-0'
            />
            <H1Typography className='text-start text-5xl font-black tracking-tighter'>
              블로그 기록
            </H1Typography>
          </div>
          <LeadTypography className='text-muted-foreground/70'>
            단순한 지식 습득을 넘어, 최적의 구조와 치밀한 구현을 위해 집요하게
            고민한 흔적들입니다.
          </LeadTypography>
        </div>

        <Suspense
          fallback={
            <>
              <TagFilterSkeleton />
              <PostGridSkeleton />
            </>
          }
        >
          <BlogContent selectedTag={selectedTag} />
        </Suspense>
      </header>
    </AppLayout>
  );
}
