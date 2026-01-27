'use client';

import { usePathname, useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { GraduationCap } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { H2Typography } from '@/components/ui/typography';

interface Props {
  selectedDate: Date;
  tilCounts: Record<string, number>;
}

export function TilCalendarClient({ selectedDate, tilCounts }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      router.push(`${pathname}?date=${format(date, 'yyyy-MM-dd')}`);
    }
  };

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
