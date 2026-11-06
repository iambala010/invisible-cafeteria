import React, { useState } from 'react';
import { Truck, Thermometer, MapPin, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface PickupItem {
  id: string;
  foodName: string;
  quantity: string;
  deadline: string;
  dockLocation: string;
  status: 'Assigned' | 'En Route' | 'Collected' | 'Delivered';
  tempLogged?: string;
}

export const DriverPickupScreen: React.FC = () => {
  const [pickups, setPickups] = useState<PickupItem[]>([
    {
      id: 'don_201',
      foodName: 'Country Lentil & Roasted Squash Stew',
      quantity: '28 kg',
      deadline: '06:00 PM (In 3.5 hrs)',
      dockLocation: 'Dining Center Loading Dock C',
      status: 'Assigned'
    },
    {
      id: 'don_202',
      foodName: 'Crispy Falafel Wraps with Tahini',
      quantity: '30 portions',
      deadline: '04:00 PM (In 2 hrs)',
      dockLocation: 'East Gate Kitchen Bay 1',
      status: 'En Route',
      tempLogged: '66.4°C'
    }
  ]);

  const [activeTemp, setActiveTemp] = useState('68.4');

  const advanceStatus = (id: string) => {
    setPickups(prev => prev.map(p => {
      if (p.id === id) {
        if (p.status === 'Assigned') return { ...p, status: 'En Route' };
        if (p.status === 'En Route') return { ...p, status: 'Collected', tempLogged: `${activeTemp}°C` };
        if (p.status === 'Collected') return { ...p, status: 'Delivered' };
      }
      return p;
    }));
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Driver Info Header */}
      <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
            Partner Supply Network Dispatch
          </span>
          <span className="text-xs font-semibold">Van #02 (Insulated Hot/Cold)</span>
        </div>
        <h2 className="text-lg font-bold">Courier: Rahul Mehra</h2>
        <p className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Active Route: Campus North Canteen ➔ Central Dining Hall</span>
        </p>
      </div>

      {/* Temperature Input Widget */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Digital Thermal Probe</span>
            <span className="text-[11px] text-slate-500">Food Safe: &gt;63°C hot / &lt;5°C cold</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.1"
            value={activeTemp}
            onChange={(e) => setActiveTemp(e.target.value)}
            className="w-16 px-2 py-1 text-center font-bold text-sm bg-slate-50 border border-slate-300 rounded-lg"
          />
          <span className="text-xs font-bold text-slate-600">°C</span>
        </div>
      </div>

      {/* Manifest Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Today's Pickup Orders ({pickups.length})
        </h3>

        {pickups.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.foodName}</h4>
                <span className="text-xs font-extrabold text-emerald-800">{item.quantity}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                item.status === 'Collected' ? 'bg-purple-100 text-purple-800' :
                item.status === 'En Route' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1 text-rose-600 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Safe Deadline: {item.deadline}</span>
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.dockLocation}</span>
              </p>
              {item.tempLogged && (
                <p className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Inspection Temp: {item.tempLogged}</span>
                </p>
              )}
            </div>

            {/* Action Progression Button */}
            {item.status !== 'Delivered' && (
              <button
                onClick={() => advanceStatus(item.id)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                {item.status === 'Assigned' && <span>Confirm Driver En Route</span>}
                {item.status === 'En Route' && <span>Log Pickup & Temp ({activeTemp}°C)</span>}
                {item.status === 'Collected' && <span>Confirm Delivery to Shelter</span>}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

