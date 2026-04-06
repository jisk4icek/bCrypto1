import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Activity, ShieldAlert, Power } from 'lucide-react';

export default function EnergyDashboard() {
  const [gridStatus, setGridStatus] = useState({
    output: 450.5,
    capacity: 1000.0,
    activePylons: 12,
    voltage: 240,
    frequency: 60
  });

  const [history, setHistory] = useState([
    { time: '10:00', load: 400, gen: 420 },
    { time: '10:05', load: 410, gen: 425 },
    { time: '10:10', load: 380, gen: 410 },
    { time: '10:15', load: 450, gen: 460 },
    { time: '10:20', load: 460, gen: 455 },
    { time: '10:25', load: 430, gen: 450 },
  ]);

  const [generators, setGenerators] = useState([
    { id: 1, type: 'Solar Array Alpha', status: 'Online', output: 120, temp: 45 },
    { id: 2, type: 'Nuclear Reactor 1', status: 'Online', output: 330, temp: 680 },
    { id: 3, type: 'Diesel Backup', status: 'Standby', output: 0, temp: 20 },
  ]);

  const handleToggle = (id) => {
    // API Call to toggle generator would go here
    console.log('Toggling generator', id);
    const updated = generators.map(g => {
        if (g.id === id) {
            return { ...g, status: g.status === 'Online' ? 'Standby' : 'Online', output: g.status === 'Online' ? 0 : 100 };
        }
        return g;
    });
    setGenerators(updated);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Energy Grid Control
            </h1>
            <p className="text-gray-400 mt-2">Decentralized Power Management System v2.0</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 flex items-center gap-2">
                <Activity size={18} />
                <span>GRID STABLE</span>
             </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiCard title="Total Output" value={`${gridStatus.output} kW`} icon={<Zap className="text-yellow-400" />} />
          <KpiCard title="Grid Load" value="82%" icon={<Activity className="text-blue-400" />} />
          <KpiCard title="Active Pylons" value={gridStatus.activePylons} icon={<Power className="text-purple-400" />} />
          <KpiCard title="System Safety" value="99.9%" icon={<ShieldAlert className="text-green-400" />} />
        </div>

        {/* Main Content: Graph & List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Real-time Graph */}
          <div className="lg:col-span-2 bg-[#151921] rounded-xl p-6 border border-white/5">
            <h3 className="text-xl font-semibold mb-6">Load vs Generation</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333' }}
                  />
                  <Line type="monotone" dataKey="gen" stroke="#4ade80" strokeWidth={2} name="Generation" />
                  <Line type="monotone" dataKey="load" stroke="#f472b6" strokeWidth={2} name="Load" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Generator List */}
          <div className="bg-[#151921] rounded-xl p-6 border border-white/5">
            <h3 className="text-xl font-semibold mb-6">Active Generators</h3>
            <div className="space-y-4">
              {generators.map(gen => (
                <div key={gen.id} className="p-4 rounded-lg bg-[#0b0e14] border border-white/5 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                  <div>
                    <div className="font-medium text-lg">{gen.type}</div>
                    <div className="text-sm text-gray-500 flex gap-4 mt-1">
                      <span className={gen.status === 'Online' ? 'text-green-400' : 'text-yellow-400'}>
                        ● {gen.status}
                      </span>
                      <span>{gen.output} kW</span>
                      <span className={gen.temp > 600 ? 'text-red-400' : 'text-blue-400'}>
                        {gen.temp}°C
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(gen.id)}
                    className={`p-3 rounded-full transition-colors ${
                      gen.status === 'Online'
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    <Power size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                <p>💡 Tip: Cooling efficiency drops by 15% when ambient temperature exceeds 40°C.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-[#151921] p-6 rounded-xl border border-white/5 flex items-center justify-between hover:scale-[1.02] transition-transform">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg">
        {icon}
      </div>
    </div>
  )
}
