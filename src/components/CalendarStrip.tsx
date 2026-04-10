import React from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';
import { useStore } from '../store';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarStrip() {
  const { selectedDate, setSelectedDate, logs } = useStore();
  const today = startOfToday();
  
  // Generate 14 days starting from 7 days ago
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i - 7));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline font-medium text-lg text-secondary">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <CalendarIcon size={20} className="text-secondary opacity-60" />
      </div>
      <div className="flex overflow-x-auto gap-4 hide-scrollbar py-2 -mx-2 px-2">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const dayLogs = logs.filter(l => l.date === format(day, 'yyyy-MM-dd'));
          const hasActivity = dayLogs.length > 0;
          const allTaken = hasActivity && dayLogs.every(l => l.status === 'taken');

          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "flex flex-col items-center min-w-[3.5rem] py-3 px-2 rounded-xl transition-all active:scale-95",
                isSelected 
                  ? "bg-primary text-white shadow-lg scale-105" 
                  : "bg-surface-low text-deep-plum hover:bg-surface-high"
              )}
            >
              <span className={cn(
                "text-[0.65rem] font-bold uppercase tracking-wider mb-1",
                isSelected ? "opacity-80" : "text-muted-rose opacity-60"
              )}>
                {format(day, 'EEE')}
              </span>
              <span className="text-lg font-bold">
                {format(day, 'dd')}
              </span>
              {hasActivity && (
                <div className={cn(
                  "w-1 h-1 rounded-full mt-1",
                  allTaken ? (isSelected ? "bg-white" : "bg-emerald-500") : "bg-muted-rose"
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
