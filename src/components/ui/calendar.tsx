'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/src/lib/utils';

interface CalendarProps {
  mode?: 'single';
  defaultMonth?: Date;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  fromDate?: Date;
}

const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(left?: Date, right?: Date) {
  if (!left || !right) return false;

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getCalendarDays(month: Date) {
  const firstDayOfMonth = startOfMonth(month);
  const firstVisibleDay = new Date(firstDayOfMonth);
  firstVisibleDay.setDate(firstVisibleDay.getDate() - firstVisibleDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstVisibleDay);
    day.setDate(firstVisibleDay.getDate() + index);
    return day;
  });
}

export function Calendar({
  mode = 'single',
  defaultMonth,
  selected,
  onSelect,
  className,
  fromDate,
}: CalendarProps) {
  const referenceMonth = selected ?? defaultMonth ?? new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(referenceMonth));

  useEffect(() => {
    setCurrentMonth(startOfMonth(referenceMonth));
  }, [referenceMonth]);

  const monthDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);
  const minimumDay = fromDate ? startOfDay(fromDate) : undefined;

  if (mode !== 'single') {
    return null;
  }

  return (
    <div
      className={cn(
        'rounded-[26px] border border-mahogany/10 bg-cream-page p-4 shadow-[0_18px_48px_rgba(42,24,16,0.08)] sm:p-5',
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
            )
          }
          className="inline-flex size-10 items-center justify-center rounded-full border border-mahogany/10 text-mahogany transition-colors hover:border-mahogany/25 hover:bg-mahogany/5"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" strokeWidth={1.6} />
        </button>

        <div className="text-center">
          <p className="font-editorial text-[10px] uppercase tracking-[0.3em] text-clay-warm">
            Select Date
          </p>
          <h3 className="mt-2 font-display text-2xl text-mahogany">
            {currentMonth.toLocaleDateString('en-LK', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>

        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            )
          }
          className="inline-flex size-10 items-center justify-center rounded-full border border-mahogany/10 text-mahogany transition-colors hover:border-mahogany/25 hover:bg-mahogany/5"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" strokeWidth={1.6} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {dayLabels.map((label) => (
          <span
            key={label}
            className="py-2 font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/45"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {monthDays.map((day) => {
          const inCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isSelected = isSameDay(day, selected);
          const isToday = isSameDay(day, startOfDay(new Date()));
          const isDisabled = !inCurrentMonth || (minimumDay ? day < minimumDay : false);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect?.(day)}
              className={cn(
                'relative aspect-square rounded-2xl border text-sm transition-all duration-200',
                isSelected
                  ? 'border-mahogany bg-mahogany text-cream-page shadow-[0_10px_24px_rgba(42,24,16,0.18)]'
                  : 'border-transparent text-mahogany hover:border-mahogany/12 hover:bg-mahogany/5',
                isToday && !isSelected && 'ring-1 ring-clay-warm/50 font-medium',
                isDisabled &&
                  'cursor-not-allowed text-mahogany/20 hover:border-transparent hover:bg-transparent'
              )}
              aria-pressed={isSelected}
              aria-current={isToday ? 'date' : undefined}
            >
              {day.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 block size-1 -translate-x-1/2 rounded-full bg-clay-warm/60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
