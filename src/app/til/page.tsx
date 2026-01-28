import { Suspense } from 'react';

import Link from 'next/link';

import { PenTool, PlusIcon } from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { H1Typography, LeadTypography } from '@/components/ui/typography';
import { auth } from '@/lib/auth';
import { parseTilDate } from '@/lib/utils';

import { TilCalendar } from './_components/til-calendar';
import { TilCardList } from './_components/til-card-list';
import { TilChart } from './_components/til-chart';
import {
  TilCalendarSkeleton,
  TilChartSkeleton,
  TilDailySkeleton,
} from './_components/til-skeletons';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  // 🚀 블로그와 동일한 어드민 체크 로직
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  const resolvedParams = await searchParams;
  const validDate = parseTilDate(resolvedParams.date);

  return (
    <AppLayout>
      {/* 🚀 블로그와 동일한 Flicker 배경 장식 */}
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

      <div className='relative z-10 space-y-12'>
        <header className='space-y-4 border-b pb-12'>
          <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0'>
            <div className='flex items-center gap-x-2'>
              <PenTool
                size={48}
                strokeWidth={2.5}
                className='text-primary shrink-0'
              />
              <H1Typography className='text-start text-5xl font-black tracking-tighter'>
                오늘 배운 것
              </H1Typography>
            </div>
            {isAdmin && (
              <Button
                size='lg'
                variant='outline'
                asChild
                className='hover:bg-accent rounded-full px-8 transition-all'
              >
                <Link href='/til/write' className='gap-2'>
                  <PlusIcon className='h-4 w-4' /> 새 TIL 작성
                </Link>
              </Button>
            )}
          </div>

          <LeadTypography className='text-muted-foreground/70'>
            잊어버리기 싫어서 기록하는 오늘의 날것들. 하나씩 채워가는 중입니다.
          </LeadTypography>
        </header>

        {/* 🚀 기존 데이터 차트 및 리스트 섹션 */}
        <div className='space-y-12'>
          <Suspense fallback={<TilChartSkeleton />}>
            <TilChart />
          </Suspense>

          <div className='flex flex-col gap-y-12 lg:grid lg:grid-cols-[300px_1fr] lg:gap-x-12 lg:gap-y-0'>
            <aside className='w-full'>
              <Suspense fallback={<TilCalendarSkeleton />}>
                <TilCalendar selectedDate={validDate} />
              </Suspense>
            </aside>

            <section className='space-y-10'>
              <Suspense fallback={<TilDailySkeleton />}>
                <TilCardList selectedDate={validDate} />
              </Suspense>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
