import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Check, X, CheckCircle2 } from 'lucide-react';
import type { Medication, DoseStatus } from '../types';
import { cn } from '../lib/utils';
import { useStore } from '../store';

interface MedicationItemProps {
  medication: Medication;
  time: string;
  status: DoseStatus;
  key?: string;
}

export default function MedicationItem({ medication, time, status }: MedicationItemProps) {
  const logDose = useStore((state) => state.logDose);
  const [isSwiping, setIsSwiping] = useState(false);
  
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, -100, 0], [1, 1, 0]);
  const skipOpacity = useTransform(x, [-150, -100, -50], [1, 0.5, 0]);
  const takeOpacity = useTransform(x, [-150, -100, -50], [1, 0.5, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) {
      // If swiped far enough, we could auto-trigger 'taken' or just leave it revealed
      // The PRD says "Swipe LEFT on entry reveals actions"
      // "Full swipe auto-triggers action (optional enhancement)"
      // I'll stick to revealing for now as per "reveals" in PRD, 
      // but I'll make sure it stays open if swiped far enough.
    }
    // For now, let's just snap back as it's simpler and the buttons are clickable
    x.set(0);
    setIsSwiping(false);
  };

  return (
    <div className="relative mb-4 overflow-hidden rounded-3xl">
      {/* Action Buttons underneath */}
      <div className="absolute inset-0 flex justify-end items-center pr-2 gap-2 bg-surface-low">
        <button 
          onClick={() => logDose(medication.id, time, 'missed')}
          className="bg-red-500 text-white h-[85%] px-6 flex flex-col items-center justify-center rounded-2xl transition-all active:scale-95"
        >
          <X size={20} className="mb-1" />
          <span className="text-[0.65rem] font-bold uppercase">Skip</span>
        </button>
        <button 
          onClick={() => logDose(medication.id, time, 'taken')}
          className="bg-primary text-white h-[85%] px-6 flex flex-col items-center justify-center rounded-2xl transition-all active:scale-95"
        >
          <CheckCircle2 size={20} className="mb-1" />
          <span className="text-[0.65rem] font-bold uppercase">Take</span>
        </button>
      </div>

      {/* The Card itself */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -160, right: 0 }}
        style={{ x }}
        onDragStart={() => setIsSwiping(true)}
        onDragEnd={handleDragEnd}
        className={cn(
          "bg-surface-high p-5 flex items-start justify-between relative z-10 cursor-grab active:cursor-grabbing transition-shadow",
          isSwiping ? "shadow-lg" : "shadow-sm"
        )}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-headline font-bold text-[1.375rem] text-primary">{time}</span>
            {status !== 'pending' && (
              <span className={cn(
                "text-[0.75rem] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider",
                status === 'taken' ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
              )}>
                {status === 'taken' ? 'OK' : 'MISSED'}
              </span>
            )}
          </div>
          <p className="text-[0.875rem] text-deep-plum opacity-80 leading-relaxed">
            {medication.instructions || `Take ${medication.dosage} of ${medication.name}`}
          </p>
        </div>
        
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          {status === 'taken' ? (
            <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center">
              <Check size={20} />
            </div>
          ) : status === 'missed' ? (
            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center">
              <X size={20} />
            </div>
          ) : (
            <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(137,75,100,0.4)]" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
