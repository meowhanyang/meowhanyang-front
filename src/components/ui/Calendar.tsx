import React from 'react';
import { DayPicker, SelectRangeEventHandler } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  onMonthChange,
  ...props
}: CalendarProps) {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <DayPicker
        month={month}
        onMonthChange={onMonthChange}
        selected={undefined}
        footer={null}
        className={cn(className)}
        classNames={{
          caption: 'hidden',
          months:
            'flex justify-ceanter items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4  w-full',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex justify-around',
          head_cell:
            'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full justify-around mt-3',
          cell: 'w-[26px] h-10 w-9 text-center rounded-full text-sm p-0 relative [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:h-[20px] [&:has([aria-selected])]:bg-pr-500 first:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
          day: cn(
            'w-[26px] pt-[0] bg-[url("/images/mockup/cat-face.svg")] bg-no-repeat max-w-[30px] rounded-none bg-bottom pb-[1.5rem] text-[12px]'
          ),
          day_selected:
            'bg-[url("/images/mockup/cat-heart-eyes.svg")] text-primary-foreground',
          day_today: 'text-accent-foreground',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_hidden: 'invisible',
          ...classNames
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
