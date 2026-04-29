import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CalendarProps {
  mode?: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  defaultMonth?: Date
  fromDate?: Date
  className?: string
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

export function Calendar({
  selected,
  onSelect,
  defaultMonth,
  fromDate,
  className,
}: CalendarProps) {
  const [viewMonth, setViewMonth] = useState(
    startOfMonth(defaultMonth ?? selected ?? new Date())
  )

  const today = new Date()
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDayOfWeek = startOfMonth(viewMonth).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1))

  return (
    <div
      className={cn(
        'w-full rounded-[18px] border border-mahogany/10 bg-white/55 p-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="size-7 rounded-full flex items-center justify-center text-mahogany/50 hover:bg-mahogany/8 transition-colors text-sm"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span
          className="text-mahogany/80 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-editorial)', fontSize: 12 }}
        >
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="size-7 rounded-full flex items-center justify-center text-mahogany/50 hover:bg-mahogany/8 transition-colors text-sm"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div
            key={d}
            className="text-center text-mahogany/35 tracking-[0.06em]"
            style={{ fontFamily: 'var(--font-editorial)', fontSize: 9 }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />

          const cellDate = new Date(year, month, day)
          const isSelected = selected ? isSameDay(cellDate, selected) : false
          const isToday = isSameDay(cellDate, today)
          const isPast = fromDate
            ? cellDate < new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
            : false

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onSelect?.(isSelected ? undefined : cellDate)}
              className={cn(
                'mx-auto flex size-7 items-center justify-center rounded-full transition-colors',
                'font-body text-[12px]',
                isPast && 'text-mahogany/20 cursor-not-allowed',
                !isPast && !isSelected && 'text-mahogany/70 hover:bg-mahogany/8',
                isToday && !isSelected && 'font-semibold text-clay-deep',
                isSelected && 'bg-mahogany text-cream-page',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
