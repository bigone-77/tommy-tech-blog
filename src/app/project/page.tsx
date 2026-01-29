import { Suspense } from 'react';

import { FolderCode } from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { H1Typography, LeadTypography } from '@/components/ui/typography';

import { ProjectContent } from './_components/project-content';
import { ProjectGridSkeleton } from './_components/project-skeletons';

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedStatus = resolvedParams.status || 'All';

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

      <div className='relative z-10 space-y-4 border-b pb-12'>
        <div className='space-y-4'>
          <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0'>
            <div className='flex items-center gap-x-3'>
              <FolderCode
                size={48}
                strokeWidth={2.5}
                className='text-primary shrink-0'
              />
              <H1Typography className='text-start text-5xl font-black tracking-tighter'>
                프로젝트
              </H1Typography>
            </div>
          </div>

          <LeadTypography className='text-muted-foreground/70'>
            단순한 지식 습득을 넘어, 최적의 구조와 치밀한 구현을 위해 집요하게
            고민한 흔적들입니다.
          </LeadTypography>
        </div>

        {/* 프로젝트 목록 섹션 */}
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectContent selectedStatus={selectedStatus} />
        </Suspense>
      </div>
    </AppLayout>
  );
}
