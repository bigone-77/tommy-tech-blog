'use client';

import { useEffect, useMemo, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/client/react';
import { format, subDays } from 'date-fns';
import { GraduationCap } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { H2Typography } from '@/components/ui/typography';
import { getFormattedDate } from '@/lib/utils';

import { GET_TIL_SUMMARY } from '../page.queries';

export function TilCalendar({ selectedDate }: { selectedDate: Date }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data } = useSuspenseQuery(GET_TIL_SUMMARY, {
    variables: {
      fromDate: getFormattedDate(subDays(new Date(), 30), 'yyyy-MM-dd'),
    },
  }) as any;

  const tilCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (data?.allTils || []).forEach((til: any) => {
      const d = /^\d+$/.test(String(til.createdAt))
        ? new Date(Number(til.createdAt))
        : new Date(til.createdAt);
      if (!isNaN(d.getTime())) {
        const key = d.toDateString();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return counts;
  }, [data]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) router.push(`${pathname}?date=${format(date, 'yyyy-MM-dd')}`);
  };

  if (!isMounted)
    return (
      <div className='bg-muted h-[400px] w-full animate-pulse rounded-xl' />
    );

  return (
    <div className='sticky top-24 w-full space-y-6'>
      <div className='flex items-center gap-2 px-1'>
        <GraduationCap className='text-primary h-5 w-5' />
        <H2Typography className='border-none pb-0 text-lg font-bold'>
          학습 달력
        </H2Typography>
      </div>

      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={handleDateSelect}
        className='border-border bg-card w-full rounded-xl border shadow-sm'
        modifiers={{
          hasTil: (date) => tilCounts[date.toDateString()] === 1,
          highActivity: (date) => (tilCounts[date.toDateString()] || 0) >= 2,
        }}
        modifiersClassNames={{
          hasTil: 'bg-primary/20 text-primary font-bold hover:bg-primary/30',
          highActivity:
            'bg-primary text-primary-foreground font-bold hover:bg-primary/90',
        }}
      />
    </div>
  );
}
