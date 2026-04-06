'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Laptop, AlertTriangle, Thermometer, Power, Zap, RefreshCw } from 'lucide-react';

/**
 * Dashboard Rigs Page
 * Displays the user's active mining rigs, temperatures, and statuses.
 *
 * Note: In a real implementation, data is fetched from the API using the auth token.
 */

// Mock Data for Prototype
const MOCK_RIGS = [
  { id: 'rig_1', name: 'Alpha Miner X1', temp: 65, hashrate: 125.5, status: 'ONLINE', fuel: 80, efficiency: 98 },
  { id: 'rig_2', name: 'Beta Block 9000', temp: 88, hashrate: 210.0, status: 'WARNING', fuel: 15, efficiency: 92 },
  { id: 'rig_3', name: 'Legacy Unit', temp: 24, hashrate: 0, status: 'OFFLINE', fuel: 0, efficiency: 0 },
  { id: 'rig_4', name: 'Quantum Hash', temp: 72, hashrate: 350.2, status: 'ONLINE', fuel: 95, efficiency: 99 },
];

const MOCK_TEMP_HISTORY = [
  { time: '10:00', temp: 60 },
  { time: '10:05', temp: 62 },
  { time: '10:10', temp: 65 },
  { time: '10:15', temp: 68 },
  { time: '10:20', temp: 65 },
  { time: '10:25', temp: 64 },
];

export default function RigsPage() {
  const [rigs, setRigs] = useState(MOCK_RIGS);
  const [selectedRig, setSelectedRig] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate API Fetch
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      // In production: fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/rigs`, { headers: ... })
      setRigs(MOCK_RIGS.map(r => ({...r, temp: r.status === 'ONLINE' ? r.temp + (Math.random() * 2 - 1) : r.temp})));
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            MINING OPERATIONS
          </h1>
          <p className="text-gray-500 text-sm mt-1">Remote Management Protocol v2.1</p>
        </div>
        <button
          onClick={refreshData}
          className={`flex items-center gap-2 px-4 py-2 rounded border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all ${loading ? 'animate-pulse' : ''}`}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          SYNC STATUS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Rig List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {rigs.map((rig) => (
            <div
              key={rig.id}
              onClick={() => setSelectedRig(rig)}
              className={`relative group cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
                selectedRig?.id === rig.id
                  ? 'border-emerald-500 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                  : 'border-gray-800 bg-[#13161c] hover:border-gray-600'
              }`}
            >
              {/* Status Indicator */}
              <div className={`absolute top-4 right-4 flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full border ${
                rig.status === 'ONLINE' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                rig.status === 'WARNING' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' :
                'border-red-500/50 text-red-400 bg-red-500/10'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                   rig.status === 'ONLINE' ? 'bg-emerald-400 animate-pulse' :
                   rig.status === 'WARNING' ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                {rig.status}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gray-800 text-gray-300">
                  <Laptop size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{rig.name}</h3>
                  <span className="text-xs text-gray-500 font-mono">ID: {rig.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-500 text-xs flex items-center gap-1"><Thermometer size={12}/> TEMP</p>
                  <p className={`text-xl font-mono ${rig.temp > 85 ? 'text-red-500' : 'text-gray-200'}`}>
                    {rig.temp.toFixed(1)}°C
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs flex items-center gap-1"><Zap size={12}/> HASHRATE</p>
                  <p className="text-xl font-mono text-gray-200">{rig.hashrate} H/s</p>
                </div>
              </div>

              {/* Fuel Bar */}
              <div className="mt-4">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-gray-500">FUEL LEVEL</span>
                   <span className={rig.fuel < 20 ? 'text-red-400' : 'text-emerald-400'}>{rig.fuel}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rig.fuel < 20 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${rig.fuel}%` }}
                    />
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Inspector */}
        <div className="lg:col-span-1">
          {selectedRig ? (
            <div className="bg-[#13161c] border border-gray-800 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-emerald-500" />
                TELEMETRY
              </h2>

              {/* Chart */}
              <div className="h-48 w-full mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={MOCK_TEMP_HISTORY}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                     <XAxis dataKey="time" hide />
                     <YAxis domain={[40, 100]} hide />
                     <Tooltip
                       contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                       itemStyle={{ color: '#10b981' }}
                     />
                     <Line
                       type="monotone"
                       dataKey="temp"
                       stroke="#10b981"
                       strokeWidth={2}
                       dot={false}
                     />
                   </LineChart>
                 </ResponsiveContainer>
                 <p className="text-center text-xs text-gray-500 mt-2">REAL-TIME THERMAL ANALYSIS (1H)</p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedRig.status === 'OFFLINE'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900'
                }`}>
                  <Power size={18} />
                  {selectedRig.status === 'OFFLINE' ? 'INITIATE BOOT SEQUENCE' : 'EMERGENCY SHUTDOWN'}
                </button>

                <button className="w-full py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold border border-gray-700 transition-all">
                  VIEW HARDWARE SPECS
                </button>
              </div>

              <div className="mt-6 p-4 rounded bg-emerald-900/10 border border-emerald-900/30">
                <h4 className="text-emerald-500 text-sm font-bold mb-2 flex items-center gap-2">
                   <AlertTriangle size={14} /> SYSTEM DIAGNOSTICS
                </h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• GPU Fan Speed: 85%</li>
                  <li>• VRAM Usage: 92%</li>
                  <li>• Network Latency: 12ms</li>
                  <li>• Last Maintenance: 4d ago</li>
                </ul>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-gray-800 border-dashed rounded-xl p-8">
                <Laptop size={48} className="mb-4 opacity-50" />
                <p>Select a Mining Rig to view live telemetry</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
