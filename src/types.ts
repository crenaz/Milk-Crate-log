export type MedicationType = 'Oral Pill' | 'Injectable' | 'Liquid Suspension' | 'Topical Gel' | 'Inhalant';

export interface Medication {
  id: string;
  name: string;
  type: MedicationType;
  dosage: string;
  schedule: string[]; // array of times like "08:00", "20:00"
  instructions: string;
}

export type DoseStatus = 'taken' | 'missed' | 'pending';

export interface DoseLog {
  id: string;
  medicationId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: DoseStatus;
  timestamp: number;
}
