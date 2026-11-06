import React, { useState } from 'react';
import { DriverPickupScreen } from './screens/DriverPickupScreen';
import { KitchenScannerScreen } from './screens/KitchenScannerScreen';
import { EmergencyAlertScreen } from './screens/EmergencyAlertScreen';
import { Truck, Utensils, AlertTriangle, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'driver' | 'kitchen' | 'emergency'>('driver');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
            IC
          </div>
          <div>
            <h1 className="text-xs font-bold text-slate-900 leading-tight">Invisible Cafeteria Mobile</h1>
            <span className="text-[10px] text-emerald-700 font-semibold">Driver & Floor Ops</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Local Vault</span>
        </div>
      </header>

      {/* Main Screen Body */}
      <main className="flex-1 pb-20">
        {activeTab === 'driver' && <DriverPickupScreen />}
        {activeTab === 'kitchen' && <KitchenScannerScreen />}
        {activeTab === 'emergency' && <EmergencyAlertScreen />}
      </main>

      {/* Bottom Mobile Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveTab('driver')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition ${
            activeTab === 'driver' ? 'text-emerald-800' : 'text-slate-400'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span>Driver Pickups</span>
        </button>

        <button
          onClick={() => setActiveTab('kitchen')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition ${
            activeTab === 'kitchen' ? 'text-emerald-800' : 'text-slate-400'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span>Kitchen Floor</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition ${
            activeTab === 'emergency' ? 'text-red-600' : 'text-slate-400'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Crisis Alert</span>
        </button>
      </nav>
    </div>
  );
};

export default App;

