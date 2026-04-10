import React from 'react';
import { Plus, Calendar as CalendarIcon, PawPrint, LineChart, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'list' | 'calendar';
  onTabChange: (tab: 'list' | 'calendar') => void;
  onAddClick: () => void;
}

export default function Layout({ children, activeTab, onTabChange, onAddClick }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-surface shadow-xl relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-high">
            <img 
              src="https://picsum.photos/seed/cat/200/200" 
              alt="Cat profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-headline font-bold text-2xl text-deep-plum tracking-tight">Milky's Care</h1>
        </div>
        <button 
          onClick={onAddClick}
          className="p-2 rounded-full hover:bg-surface-low transition-colors active:scale-95 text-deep-plum"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-32">
        {/* Tabs */}
        <div className="flex items-center gap-6 py-4 mb-2">
          <button 
            onClick={() => onTabChange('list')}
            className={cn(
              "font-headline font-bold text-xl transition-all pb-1 border-b-2",
              activeTab === 'list' ? "text-primary border-primary" : "text-secondary opacity-60 border-transparent"
            )}
          >
            List
          </button>
          <button 
            onClick={() => onTabChange('calendar')}
            className={cn(
              "font-headline font-medium text-xl transition-all pb-1 border-b-2",
              activeTab === 'calendar' ? "text-primary border-primary" : "text-secondary opacity-60 border-transparent"
            )}
          >
            Calendar
          </button>
        </div>

        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-4px_32px_rgba(50,23,42,0.06)]">
        <NavItem icon={<CalendarIcon size={20} />} label="Schedule" active />
        <NavItem icon={<PawPrint size={20} />} label="Pets" />
        <NavItem icon={<LineChart size={20} />} label="Stats" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={cn(
      "flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all active:scale-90",
      active ? "bg-surface-high text-deep-plum" : "text-muted-rose opacity-60"
    )}>
      <div className="mb-1">{icon}</div>
      <span className="text-[0.75rem] font-medium">{label}</span>
    </button>
  );
}
