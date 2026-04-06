import React, { useState, useEffect } from "react";
// In CRA, we might need specific imports or install lucide-react.
// Assuming it's installed or we use basic HTML elements if not.
// For the sake of this file being "usable", I will assume standard React.

export default function EnergyPage() {
  const [gridData, setGridData] = useState({
    totalProduction: 0,
    totalConsumption: 0,
    gridEfficiency: 100,
    generators: [],
    pylons: []
  });

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
    });
  }, []);

  const handleScram = async () => {
      if (window.confirm("ARE YOU SURE? THIS WILL SHUTDOWN ALL NUCLEAR REACTORS.")) {
          try {
              const res = await fetch('/api/v1/energy/scram', { method: 'POST' });
              const data = await res.json();
              alert("SCRAM STATUS: " + data.status);
          } catch (e) {
              alert("Failed to execute SCRAM: " + e);
          }
      }
  };

  return (
    <div style={{ backgroundColor: "#0b0e14", minHeight: "100vh", color: "white", padding: "20px", fontFamily: "monospace" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", background: "-webkit-linear-gradient(45deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
            ENERGY GRID MANAGER
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "5px" }}>Decentralized Power Network Control</p>
        </div>
        <div>
            <span style={{ padding: "5px 10px", borderRadius: "4px", backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#4ade80", border: "1px solid rgba(34, 197, 94, 0.2)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
                GRID STABLE
            </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        <KpiCard title="Total Production" value={gridData.totalProduction} unit="kWh" color="#fbbf24" />
        <KpiCard title="Consumption" value={gridData.totalConsumption} unit="kWh" color="#3b82f6" />
        <KpiCard title="Grid Revenue" value="$12,450" unit="/hr" color="#a855f7" />
        <KpiCard title="Efficiency" value={gridData.gridEfficiency + "%"} unit="" color="#22c55e" />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
          {/* Generator List */}
          <div style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", padding: "20px" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
                  Active Generators
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {gridData.generators.map((gen) => (
                      <div key={gen.id} style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <div>
                                  <div style={{ fontWeight: "600" }}>{gen.type} Generator</div>
                                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{gen.location}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "1.125rem", fontWeight: "bold", fontFamily: "monospace" }}>{gen.output} <span style={{ fontSize: "0.75rem", fontWeight: "normal", color: "#6b7280" }}>kWh</span></div>
                              <div style={{ fontSize: "0.75rem", color: gen.status === 'active' ? "#22c55e" : "#6b7280" }}>
                                  ● {gen.status.toUpperCase()}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Control Panel */}
          <div style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", padding: "20px" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "15px" }}>
                Grid Settings
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                  <div>
                      <label style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Emergency Shutdown</label>
                      <div onClick={handleScram} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" }}>
                          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ef4444", boxShadow: "0 0 10px #ef4444" }} />
                          <span style={{ color: "#f87171", fontWeight: "bold" }}>SCRAM REACTOR</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, unit, color }) {
    return (
        <div style={{ backgroundColor: "#151921", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: color, opacity: 0.05 }} />
          <div style={{ position: "relative", zIndex: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ color: "#9ca3af", fontSize: "0.75rem", textTransform: "uppercase" }}>{title}</span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value} <span style={{ fontSize: "0.875rem", fontWeight: "normal", color: "#6b7280" }}>{unit}</span></div>
          </div>
        </div>
    );
}
