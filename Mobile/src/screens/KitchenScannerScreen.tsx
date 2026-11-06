import React, { useState } from 'react';
import { QrCode, Plus, CheckCircle2, Utensils, Clock } from 'lucide-react';

export const KitchenScannerScreen: React.FC = () => {
  const [dishName, setDishName] = useState('Herb Rice Medley');
  const [prepQty, setPrepQty] = useState(40);
  const [consumedQty, setConsumedQty] = useState(25);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const surplus = Math.max(0, prepQty - consumedQty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Scanner Mode Header */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-emerald-400">Kitchen Counter Mode</span>
          <h2 className="text-base font-bold">Fast Batch Entry</h2>
        </div>
        <button className="p-2.5 bg-slate-800 rounded-xl hover:bg-slate-700 transition" title="Scan QR label">
          <QrCode className="w-5 h-5 text-emerald-400" />
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Batch logged! {surplus} kg surplus published to NGO pool.</span>
        </div>
      )}

      {/* Quick Input Form */}
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Dish Name</label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Prepared (kg)</label>
            <input
              type="number"
              value={prepQty}
              onChange={(e) => setPrepQty(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Consumed (kg)</label>
            <input
              type="number"
              value={consumedQty}
              onChange={(e) => setConsumedQty(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
            />
          </div>
        </div>

        {/* Auto surplus display */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900">Auto Computed Surplus:</span>
          <span className="text-base font-extrabold text-amber-700">{surplus} kg</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Safe Pickup Window</label>
          <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Within 4 hours of prep (Hot Hold 68°C)</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Save Batch & Release Surplus</span>
        </button>
      </form>
    </div>
  );
};

