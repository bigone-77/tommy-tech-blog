import { Suspense } from 'react';

import { AppLayout } from '@/components/app-layout';
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
  const { date } = await searchParams;
  const validDate = parseTilDate(date);

  return (
    <AppLayout>
      <div className='relative z-10 space-y-12'>
        <Suspense fallback={<TilChartSkeleton />}>
          <TilChart />
        </Suspense>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr]'>
          <aside className='hidden lg:block'>
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
    </AppLayout>
  );
}
