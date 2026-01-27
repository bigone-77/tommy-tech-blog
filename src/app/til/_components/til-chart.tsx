'use client';

import { useMemo } from 'react';

import { useSuspenseQuery } from '@apollo/client/react';
import { format, isSameDay, subDays } from 'date-fns';

import { cn, getFormattedDate } from '@/lib/utils';

import { GET_TIL_SUMMARY } from '../page.queries';

export function TilChart() {
  const { data } = useSuspenseQuery(GET_TIL_SUMMARY, {
    variables: {
      fromDate: getFormattedDate(subDays(new Date(), 6), 'yyyy-MM-dd'),
    },
  }) as any;

  const tils = data?.allTils || [];

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      subDays(new Date(), 6 - i),
    );
    return last7Days.map((day) => {
      const count = tils.filter((til: any) => {
        const d = /^\d+$/.test(String(til.createdAt))
          ? new Date(Number(til.createdAt))
          : new Date(til.createdAt);
        return isSameDay(d, day);
      }).length;
      return {
        label: format(day, 'MM.dd'),
        fullDate: format(day, 'yyyy-MM-dd'),
        count,
      };
    });
  }, [tils]);

  return (
    <div className='bg-card border-border rounded-xl border p-6 shadow-sm'>
      <div className='mb-6 flex items-end justify-between'>
        <div>
          <h3 className='text-lg font-bold tracking-tight'>
            최근 7일 학습 활동
          </h3>
          <p className='text-muted-foreground text-xs'>
            꾸준함이 실력을 만듭니다.
          </p>
        </div>
        <div className='text-primary text-2xl font-black italic'>
          {tils.length}{' '}
          <span className='text-sm font-medium opacity-70'>Records</span>
        </div>
      </div>

      <div className='flex h-28 items-end justify-between gap-2 px-2'>
        {chartData.map((day) => (
          <div
            key={day.fullDate}
            className='group relative flex h-full flex-1 flex-col items-center justify-end gap-2'
          >
            <div
              className={cn(
                'w-full rounded-t-sm transition-all duration-500 ease-out',
                day.count === 0 && 'bg-border h-[2px]',
                day.count === 1 && 'bg-primary/20 h-full',
                day.count >= 2 &&
                  'bg-primary h-full shadow-[0_0_15px_rgba(var(--primary),0.2)]',
              )}
            >
              {day.count > 0 && (
                <div className='bg-foreground text-background absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100'>
                  {day.count}개 기록
                </div>
              )}
            </div>
            <span className='text-muted-foreground text-[10px] font-medium'>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
