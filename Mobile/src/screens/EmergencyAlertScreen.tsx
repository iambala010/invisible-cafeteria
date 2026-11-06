import React from 'react';
import { ShieldAlert, AlertTriangle, Bell, CheckCircle2 } from 'lucide-react';

export const EmergencyAlertScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="bg-red-600 text-white p-4 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded">
            Emergency Command
          </span>
        </div>
        <h2 className="text-lg font-bold">Campus Crisis Protocol Active</h2>
        <p className="text-xs text-red-100 mt-1">
          Demand tripled (3,600 meals) • Resources reduced to 50% (700 meals)
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Priority Triage Directives for Drivers</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
            <strong className="text-red-900 block">Tier 1: Campus Medical Tent & Shelter</strong>
            <span className="text-red-700 text-[11px]">450 survival rations guaranteed (100% fulfill).</span>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block">Tier 2: Locked-Down Dormitories</strong>
            <span className="text-amber-700 text-[11px]">180 high-protein energy rations dispatched.</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-800 block">Tier 3 & 4: Day Scholars & Community</strong>
            <span className="text-slate-600 text-[11px]">70 emergency rations via mobile van pantry.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

