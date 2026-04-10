import React, { useState } from 'react';
import { ArrowLeft, Plus, X, CheckCircle2, Info, Clock } from 'lucide-react';
import { MedicationType } from '../types';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface AddMedicationFormProps {
  onClose: () => void;
}

const MEDICATION_TYPES: MedicationType[] = [
  'Oral Pill',
  'Injectable',
  'Liquid Suspension',
  'Topical Gel',
  'Inhalant'
];

export default function AddMedicationForm({ onClose }: AddMedicationFormProps) {
  const addMedication = useStore(state => state.addMedication);
  
  const [name, setName] = useState('');
  const [type, setType] = useState<MedicationType>('Oral Pill');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [schedule, setSchedule] = useState<string[]>(['08:00', '20:00']);
  const [newTime, setNewTime] = useState('');

  const handleAddTime = () => {
    if (newTime && !schedule.includes(newTime)) {
      setSchedule([...schedule].sort());
      setNewTime('');
    }
  };

  const removeTime = (time: string) => {
    setSchedule(schedule.filter(t => t !== time));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage || schedule.length === 0) return;

    addMedication({
      name,
      type,
      dosage,
      instructions,
      schedule
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-surface overflow-y-auto">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="hover:bg-surface-low transition-colors p-2 rounded-full active:scale-95"
          >
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <h1 className="font-headline font-bold text-2xl text-primary tracking-tight">Add Medication</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-high">
          <img src="https://picsum.photos/seed/cat2/200/200" alt="Pet" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-8 pb-32">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="font-headline text-xs font-medium text-secondary uppercase tracking-widest ml-1">Medication Name</label>
              <input 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-low border-none rounded-2xl py-4 px-6 text-primary font-headline text-xl focus:ring-2 focus:ring-primary/10 placeholder:text-muted-rose/30"
                placeholder="e.g. Meloxicam"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="font-headline text-xs font-medium text-secondary uppercase tracking-widest ml-1">Type</label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={e => setType(e.target.value as MedicationType)}
                    className="w-full bg-surface-low border-none rounded-2xl py-4 px-6 text-on-surface appearance-none focus:ring-2 focus:ring-primary/10"
                  >
                    {MEDICATION_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-headline text-xs font-medium text-secondary uppercase tracking-widest ml-1">Dosage</label>
                <input 
                  value={dosage}
                  onChange={e => setDosage(e.target.value)}
                  className="w-full bg-surface-low border-none rounded-2xl py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/10 placeholder:text-muted-rose/30"
                  placeholder="e.g. 0.5mg"
                  required
                />
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-surface-high/50 p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h2 className="font-headline font-semibold text-lg text-primary">Administration Schedule</h2>
                <p className="text-xs text-muted-rose opacity-60">Set specific times for reminders</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {schedule.map(time => (
                <div key={time} className="bg-surface-highest p-4 rounded-2xl flex flex-col items-center justify-center gap-2 relative group">
                  <button 
                    type="button"
                    onClick={() => removeTime(time)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <span className="font-headline text-2xl font-bold text-primary">{time}</span>
                </div>
              ))}
              
              <div className="bg-surface-low p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-muted-rose/20">
                <input 
                  type="time" 
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="bg-transparent border-none p-0 text-primary font-bold text-xl w-full text-center focus:ring-0"
                />
                <button 
                  type="button"
                  onClick={handleAddTime}
                  className="text-[0.65rem] font-bold uppercase text-secondary hover:text-primary transition-colors"
                >
                  Add Time
                </button>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="space-y-4">
            <div className="space-y-2">
              <label className="font-headline text-xs font-medium text-secondary uppercase tracking-widest ml-1">Special Instructions</label>
              <textarea 
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                className="w-full bg-surface-low border-none rounded-3xl py-4 px-6 text-on-surface focus:ring-2 focus:ring-primary/10 placeholder:text-muted-rose/30 resize-none"
                placeholder="Mix with wet food, keep refrigerated..."
                rows={4}
              />
            </div>

            <div className="relative w-full h-32 rounded-3xl overflow-hidden mt-8">
              <img 
                src="https://picsum.photos/seed/lavender/800/400" 
                alt="Lavender" 
                className="w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-surface/60 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <Info size={16} className="text-secondary" />
                  <span className="text-xs text-primary font-medium">Complete the full course as prescribed.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-surface via-surface to-transparent flex justify-center items-center z-50">
            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-3xl font-headline font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 size={24} />
              Save Medication
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
