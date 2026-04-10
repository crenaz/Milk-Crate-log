import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Medication, DoseLog, DoseStatus } from './types';
import { format, isSameDay } from 'date-fns';

interface FelineCareState {
  medications: Medication[];
  logs: DoseLog[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  logDose: (medicationId: string, time: string, status: DoseStatus) => void;
  getLogsForDate: (date: Date) => DoseLog[];
}

export const useStore = create<FelineCareState>()(
  persist(
    (set, get) => ({
      medications: [],
      logs: [],
      selectedDate: new Date(),
      setSelectedDate: (date) => set({ selectedDate: date }),
      addMedication: (med) => {
        const id = crypto.randomUUID();
        set((state) => ({
          medications: [...state.medications, { ...med, id }],
        }));
      },
      updateMedication: (id, med) => {
        set((state) => ({
          medications: state.medications.map((m) => (m.id === id ? { ...m, ...med } : m)),
        }));
      },
      deleteMedication: (id) => {
        set((state) => ({
          medications: state.medications.filter((m) => m.id !== id),
          logs: state.logs.filter((l) => l.medicationId !== id),
        }));
      },
      logDose: (medicationId, time, status) => {
        const dateStr = format(get().selectedDate, 'yyyy-MM-dd');
        const existingLogIndex = get().logs.findIndex(
          (l) => l.medicationId === medicationId && l.date === dateStr && l.time === time
        );

        const newLog: DoseLog = {
          id: crypto.randomUUID(),
          medicationId,
          date: dateStr,
          time,
          status,
          timestamp: Date.now(),
        };

        set((state) => {
          const newLogs = [...state.logs];
          if (existingLogIndex >= 0) {
            newLogs[existingLogIndex] = newLog;
          } else {
            newLogs.push(newLog);
          }
          return { logs: newLogs };
        });
      },
      getLogsForDate: (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return get().logs.filter((l) => l.date === dateStr);
      },
    }),
    {
      name: 'feline-care-storage',
      partialize: (state) => ({
        medications: state.medications,
        logs: state.logs,
      }),
    }
  )
);
