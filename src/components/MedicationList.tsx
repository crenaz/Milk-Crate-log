import React from 'react';
import { useStore } from '../store';
import MedicationItem from './MedicationItem';
import { format } from 'date-fns';

export default function MedicationList() {
  const { medications, logs, selectedDate } = useStore();
  
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const dayLogs = logs.filter(l => l.date === dateStr);

  // Group medications by type
  const groupedMedications = medications.reduce((acc, med) => {
    if (!acc[med.type]) acc[med.type] = [];
    acc[med.type].push(med);
    return acc;
  }, {} as Record<string, typeof medications>);

  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-surface-low rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🐾</span>
        </div>
        <h3 className="font-headline font-bold text-lg text-deep-plum mb-2">No medications yet</h3>
        <p className="text-sm text-muted-rose opacity-60 max-w-[200px]">
          Tap the + button to add your first medication schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedMedications).map(([type, meds]) => (
        <div key={type}>
          <h3 className="font-headline font-bold text-[0.65rem] uppercase tracking-widest text-secondary mb-4 opacity-70">
            {type}
          </h3>
          <div className="space-y-2">
            {meds.map(med => (
              <React.Fragment key={med.id}>
                {med.schedule.map(time => {
                  const log = dayLogs.find(l => l.medicationId === med.id && l.time === time);
                  return (
                    <MedicationItem 
                      key={`${med.id}-${time}`}
                      medication={med}
                      time={time}
                      status={log?.status || 'pending'}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
