"use client"

import { useState, useEffect } from "react"
import { Battery, Zap, Sun, Flame, Signal, Activity, ArrowUpRight, DollarSign, Settings } from "lucide-react"

export default function EnergyPage() {
  const [gridData, setGridData] = useState({
    totalProduction: 0,
    totalConsumption: 0,
    gridEfficiency: 100,
    generators: [],
    pylons: []
  })

  // Simulated data fetch
  useEffect(() => {
    // In production, fetch from /api/v1/energy/grid
    setGridData({
      totalProduction: 4500,
      totalConsumption: 3200,
      gridEfficiency: 98,
      generators: [
        { id: 1, type: "SOLAR", output: 120, status: "active", location: "Base Alpha" },
        { id: 2, type: "NUCLEAR", output: 2500, status: "active", location: "Deep Bunker" },
        { id: 3, type: "DIESEL", output: 500, status: "idle", location: "Backup Gen" }
      ],
      pylons: [
        { id: 1, type: "TRANSMITTER", channel: "Alpha-1", price: 0.5, users: 4 },
        { id: 2, type: "RECEIVER", channel: "Beta-Grid", connected: true }
      ]
    })
  }, [])

  return (
    <div className="space-y-6 p-6 bg-[#0b0e14] min-h-screen text-white font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            ENERGY GRID MANAGER
          </h1>
          <p className="text-gray-400 text-sm mt-1">Decentralized Power Network Control</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs flex items-center gap-1">
                <Activity size={14} /> GRID STABLE
            </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#151921] p-4 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs uppercase">Total Production</span>
              <Sun className="text-yellow-500" size={18} />
            </div>
            <div className="text-2xl font-bold">{gridData.totalProduction} <span className="text-sm font-normal text-gray-500">kWh</span></div>
            <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <ArrowUpRight size={12} /> +12% from last hour
            </div>
          </div>
        </div>

        <div className="bg-[#151921] p-4 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs uppercase">Consumption</span>
              <Zap className="text-blue-500" size={18} />
            </div>
            <div className="text-2xl font-bold">{gridData.totalConsumption} <span className="text-sm font-normal text-gray-500">kWh</span></div>
             <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                71% Load Factor
            </div>
          </div>
        </div>

        <div className="bg-[#151921] p-4 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs uppercase">Grid Revenue</span>
              <DollarSign className="text-purple-500" size={18} />
            </div>
            <div className="text-2xl font-bold">$12,450 <span className="text-sm font-normal text-gray-500">/hr</span></div>
            <div className="text-xs text-gray-500 mt-1">Based on active pylons</div>
          </div>
        </div>

        <div className="bg-[#151921] p-4 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs uppercase">Efficiency</span>
              <Signal className="text-green-500" size={18} />
            </div>
            <div className="text-2xl font-bold">{gridData.gridEfficiency}%</div>
            <div className="text-xs text-gray-500 mt-1">Wireless Loss: 2%</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generator List */}
          <div className="bg-[#151921] rounded-xl border border-white/5 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Battery size={20} className="text-gray-400" /> Active Generators
              </h2>
              <div className="space-y-3">
                  {gridData.generators.map((gen: any) => (
                      <div key={gen.id} className="bg-black/20 p-4 rounded-lg flex justify-between items-center border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${gen.type === 'SOLAR' ? 'bg-yellow-500/20 text-yellow-500' : gen.type === 'NUCLEAR' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                  {gen.type === 'SOLAR' ? <Sun size={20} /> : gen.type === 'NUCLEAR' ? <Activity size={20} /> : <Flame size={20} />}
                              </div>
                              <div>
                                  <div className="font-semibold">{gen.type} Generator</div>
                                  <div className="text-xs text-gray-500">{gen.location}</div>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-lg font-mono font-bold">{gen.output} <span className="text-xs font-normal text-gray-500">kWh</span></div>
                              <div className={`text-xs ${gen.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
                                  ● {gen.status.toUpperCase()}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Pylon Network */}
          <div className="bg-[#151921] rounded-xl border border-white/5 p-6">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Signal size={20} className="text-gray-400" /> Transmission Network
                  </h2>
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded transition-colors">
                      Configure Channels
                  </button>
              </div>

              <div className="space-y-3">
                  {gridData.pylons.map((pylon: any) => (
                      <div key={pylon.id} className="bg-black/20 p-4 rounded-lg flex justify-between items-center border border-white/5">
                          <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                                  <Signal size={20} />
                              </div>
                              <div>
                                  <div className="font-semibold">{pylon.type} Node</div>
                                  <div className="text-xs text-gray-500">Channel: <span className="text-blue-400">{pylon.channel}</span></div>
                              </div>
                          </div>
                          {pylon.type === 'TRANSMITTER' ? (
                              <div className="text-right">
                                  <div className="text-lg font-mono font-bold">${pylon.price}</div>
                                  <div className="text-xs text-gray-500">{pylon.users} Clients Connected</div>
                              </div>
                          ) : (
                              <div className="text-right">
                                  <div className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                                      CONNECTED
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Control Panel */}
      <div className="bg-[#151921] rounded-xl border border-white/5 p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings size={20} className="text-gray-400" /> Grid Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase">Emergency Shutdown</label>
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg cursor-pointer hover:bg-red-500/20 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-red-400 font-bold">SCRAM REACTOR</span>
                  </div>
              </div>
              <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase">Load Balancing</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500">
                      <option>Automatic (Recommended)</option>
                      <option>Priority: Production</option>
                      <option>Priority: Efficiency</option>
                  </select>
              </div>
              <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase">Public Access</label>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded-lg border border-white/10">
                      <span className="text-sm">Allow Public Connections</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
