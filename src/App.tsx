import React, { useState } from 'react';
import Layout from './components/Layout';
import CalendarStrip from './components/CalendarStrip';
import MedicationList from './components/MedicationList';
import AddMedicationForm from './components/AddMedicationForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onAddClick={() => setIsAdding(true)}
    >
      <div className="animate-in fade-in duration-500">
        <CalendarStrip />
        <MedicationList />
      </div>

      {isAdding && (
        <AddMedicationForm onClose={() => setIsAdding(false)} />
      )}
    </Layout>
  );
}

