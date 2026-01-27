'use client';

import * as React from 'react';
import {
  type DayButton,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('bg-background w-full p-3 [--cell-size:2.5rem]', className)}
      locale={ko}
      formatters={{
        formatCaption: (date) => format(date, 'M월 yyyy년', { locale: ko }),
        ...formatters,
      }}
      classNames={{
        ...defaultClassNames,
        months: cn(
          'flex flex-col gap-4 w-full relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col gap-4 w-full', defaultClassNames.month),
        month_caption: cn(
          'flex justify-center items-center h-10 mb-4 relative',
          defaultClassNames.month_caption,
        ),
        caption_label: 'text-base font-bold select-none tracking-tight',
        nav: cn(
          'flex items-center justify-between absolute w-full h-10 z-10 px-0.5',
          defaultClassNames.nav,
        ),
        table: 'w-full border-collapse',
        weekdays: 'flex w-full justify-between',
        weekday:
          'text-muted-foreground w-(--cell-size) font-normal text-[0.8rem] text-center',
        week: 'flex w-full mt-1 justify-between',
        cell: 'h-(--cell-size) w-(--cell-size) text-center text-sm p-0 relative focus-within:z-20',
        day: cn(
          'h-9 w-9 p-0 font-normal rounded-md transition-all duration-300 flex items-center justify-center m-auto',
          defaultClassNames.day,
        ),
        day_selected: '',
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === 'left' ? ChevronLeftIcon : ChevronRightIcon;
          return (
            <Icon
              className={cn('size-5 cursor-pointer', className)}
              {...props}
            />
          );
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const { children: _children, ...buttonProps } = props as any;

  const isSelected = !!modifiers.selected;
  const hasTil = !!(modifiers as any).hasTil;
  const highActivity = !!(modifiers as any).highActivity;

  return (
    <Button
      ref={ref}
      variant='ghost'
      className={cn(
        'h-9 w-9 rounded-md p-0 font-normal transition-colors duration-200 ease-in-out',
        !isSelected &&
          hasTil &&
          'bg-primary/20 text-primary hover:bg-primary/30',
        !isSelected &&
          highActivity &&
          'bg-primary/50 text-primary-foreground hover:bg-primary/60',
        isSelected &&
          (hasTil || highActivity) &&
          'bg-primary text-primary-foreground ring-primary/20 hover:bg-primary hover:text-primary-foreground scale-105 font-bold shadow-md ring-2',
        isSelected &&
          !(hasTil || highActivity) &&
          'bg-foreground text-background hover:bg-foreground hover:text-background scale-105 font-bold shadow-md',
        className,
      )}
      {...buttonProps}
    >
      {day.date.getDate()}
    </Button>
  );
}

export { Calendar };
