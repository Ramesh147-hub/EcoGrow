import React, { useState } from 'react';
import { 
  Droplets, 
  Thermometer, 
  FlaskConical, 
  RefreshCw, 
  Download, 
  Clock, 
  Leaf,
  ChevronRight,
  X,
  Play,
  CheckCircle2,
  Sliders,
  Sprout
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../context/AppContext';

const historyDatasets = {
  D: [
    { time: '00:00', moisture: 60, temp: 20 },
    { time: '04:00', moisture: 55, temp: 19 },
    { time: '08:00', moisture: 75, temp: 22 },
    { time: '12:00', moisture: 70, temp: 28 },
    { time: '16:00', moisture: 72, temp: 26 },
    { time: '20:00', moisture: 68, temp: 23 },
    { time: '23:59', moisture: 65, temp: 21 },
  ],
  W: [
    { time: 'Mon', moisture: 68, temp: 22 },
    { time: 'Tue', moisture: 64, temp: 23 },
    { time: 'Wed', moisture: 72, temp: 21 },
    { time: 'Thu', moisture: 78, temp: 20 },
    { time: 'Fri', moisture: 70, temp: 25 },
    { time: 'Sat', moisture: 62, temp: 27 },
    { time: 'Sun', moisture: 66, temp: 24 },
  ],
  M: [
    { time: 'Week 1', moisture: 65, temp: 21 },
    { time: 'Week 2', moisture: 72, temp: 23 },
    { time: 'Week 3', moisture: 68, temp: 24 },
    { time: 'Week 4', moisture: 74, temp: 22 },
  ],
};

export default function Sensors() {
  const { zones, waterZone, addToast } = useApp();
  const [timeframe, setTimeframe] = useState<'D' | 'W' | 'M'>('D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [moistureValue, setMoistureValue] = useState(70);
  const [tempValue, setTempValue] = useState(24.5);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight telemetry variance
      const newMoisture = Math.floor(65 + Math.random() * 12);
      const newTemp = parseFloat((23.5 + Math.random() * 3).toFixed(1));
      setMoistureValue(newMoisture);
      setTempValue(newTemp);
      setIsRefreshing(false);
      addToast('Sensor telemetry refreshed from Greenhouse Alpha gateway', 'success');
    }, 800);
  };

  const handleExportPDF = () => {
    addToast('Generating PDF Telemetry Report...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary font-headline">Sensor Monitoring</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="status-pulse">
              <span className="status-pulse-dot"></span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium">Live System Status: Optimal</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Soil Moisture */}
        <div className="glass-card soft-shadow rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Soil Moisture</p>
              <div className="mt-1">
                <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded">NORMAL</span>
              </div>
            </div>
            <div className="bg-tertiary-fixed p-2 rounded-xl text-on-tertiary-fixed-variant">
              <Droplets size={24} />
            </div>
          </div>
          
          <div className="relative flex justify-center items-center py-6">
            <svg className="w-32 h-32 -rotate-90">
              <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-surface-container-highest" />
              <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - moistureValue / 100)} className="text-tertiary transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-on-surface font-headline/70">{moistureValue}%</span>
              <span className="text-[10px] font-black text-on-surface-variant tracking-wider">OPTIMAL</span>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30">
            <p className="text-xs font-bold text-on-surface-variant mb-2">24h Trend</p>
            <div className="h-10 flex items-end gap-1">
              {[40, 55, 50, 65, 75, moistureValue].map((h, i) => (
                <div key={i} className={`w-full rounded-t-sm ${i === 5 ? 'bg-tertiary' : i > 2 ? 'bg-tertiary/40' : 'bg-tertiary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Air Temperature */}
        <div className="glass-card soft-shadow rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Air Temperature</p>
              <div className="mt-1">
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded">STABLE</span>
              </div>
            </div>
            <div className="bg-secondary-container p-2 rounded-xl text-on-secondary-container">
              <Thermometer size={24} />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-primary font-headline">{tempValue}</span>
            <span className="text-2xl font-bold text-on-surface-variant">°C</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant font-medium">Max Today</span>
              <span className="font-bold">28.2°C</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant font-medium">Min Today</span>
              <span className="font-bold">19.5°C</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-tertiary to-error w-3/4 h-full"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-black text-on-surface-variant">
              <span>0°C</span>
              <span>45°C</span>
            </div>
          </div>
        </div>

        {/* NPK Nutrients */}
        <div className="glass-card soft-shadow rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Nutrient Mix (NPK)</p>
              <p className="text-[10px] font-bold text-on-surface-variant mt-1">LAST READ: JUST NOW</p>
            </div>
            <div className="bg-primary-container p-2 rounded-xl text-on-primary-container">
              <FlaskConical size={24} />
            </div>
          </div>

          <div className="space-y-5">
            {[
              { name: 'Nitrogen (N)', val: 'High', color: 'bg-primary', width: '85%' },
              { name: 'Phosphorus (P)', val: 'Normal', color: 'bg-secondary', width: '62%' },
              { name: 'Potassium (K)', val: 'Low', color: 'bg-error', width: '22%' },
            ].map((n, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">{n.name}</span>
                  <span className={`text-xs font-bold ${i === 0 ? 'text-primary' : i === 1 ? 'text-secondary' : 'text-error'}`}>{n.val}</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className={`${n.color} h-full rounded-full`} style={{ width: n.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sensor History Chart */}
        <div className="md:col-span-2 glass-card soft-shadow rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-on-surface font-headline">
                Sensor History ({timeframe === 'D' ? '24h' : timeframe === 'W' ? '7 Days' : '30 Days'})
              </h3>
              <p className="text-xs text-on-surface-variant">Combined sensor metrics across Greenhouse Alpha</p>
            </div>
            <div className="flex bg-surface-container-high rounded-xl p-1 gap-1">
              {(['D', 'W', 'M'] as const).map(t => (
                <button 
                  key={t} 
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeframe === t ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {t === 'D' ? 'Day' : t === 'W' ? 'Week' : 'Month'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyDatasets[timeframe]}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006b2c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#006b2c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde5d9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#3e4a3d'}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #dde5d9', 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    padding: '8px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="moisture" stroke="#006b2c" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" name="Moisture (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Usage */}
        <div className="glass-card soft-shadow rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-on-surface font-headline">Water Usage</h3>
              <p className="text-sm text-on-surface-variant">Current irrigation cycle</p>
            </div>
            <Droplets className="text-tertiary" size={24} />
          </div>

          <div className="text-center py-4">
            <div className="flex items-baseline justify-center gap-1 text-tertiary">
              <span className="text-5xl font-bold font-headline">14.2</span>
              <span className="text-2xl font-bold">L</span>
            </div>
            <p className="text-[10px] font-black text-on-surface-variant tracking-wider uppercase mt-1">TOTAL TODAY</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs font-bold">Next cycle</p>
                <p className="text-xs text-on-surface-variant">Today, 18:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Leaf size={18} />
              </div>
              <div>
                <p className="text-xs font-bold">Eco-Saving</p>
                <p className="text-xs text-on-surface-variant">Active (-12%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automated Irrigation Active */}
        <div className="md:col-span-3 lg:col-span-3 relative h-64 rounded-3xl overflow-hidden soft-shadow group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEgV3ocKrWHmF96988Ie1g1RwZOTWQHy_RaJflc6vUYYsTDEH7vnly3rFuZxHe5azl2m6jPgMYfhi3wauMGTaZUA5_jcobgHlp2W080AfYlzI6t1sb6pc4kC3WWm3HatdbUivZ0kax8huE9VGJbS-yHcgLkaPVKLKbUik4rMlOO00az8-a0Y-RbXcTKmCkbAaKXXfTvp5Dnvfl1_eZ3QZ5-8MV8TS7MzsNOR_gheJgai3dRbscujJ8741-vHt78XmahkEM9aVP84YR" 
            alt="Greenhouse"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center p-8">
            <div className="max-w-md">
              <h4 className="text-2xl font-bold text-white mb-2 font-headline">Automated Irrigation Active</h4>
              <p className="text-white/80 text-sm mb-6">Sensors detected low moisture in Zone B. Corrective watering initiated at 14:45 PM.</p>
              <button 
                onClick={() => setIsZoneModalOpen(true)}
                className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-2xl text-sm font-bold hover:bg-surface-bright transition-all active:scale-95 shadow-md"
              >
                Manage Zones
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Zone Management Modal */}
      {isZoneModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <Sprout className="text-primary" size={28} />
                <h3 className="text-2xl font-bold font-headline">Greenhouse Field Zones</h3>
              </div>
              <button onClick={() => setIsZoneModalOpen(false)} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <div key={zone.id} className="p-5 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-on-surface">{zone.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        zone.status === 'Optimal' ? 'bg-primary/10 text-primary' :
                        zone.status === 'Watering' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                        zone.status === 'Low' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {zone.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">Crop: {zone.crop}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Soil Moisture</span>
                      <span className="text-primary">{zone.moisture}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-500" style={{ width: `${zone.moisture}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-on-surface-variant">Last watered: {zone.lastWatered}</span>
                    <button 
                      onClick={() => waterZone(zone.id)}
                      className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-primary-container transition-all active:scale-95"
                    >
                      <Play size={12} />
                      Water 10m
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsZoneModalOpen(false)}
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-2xl hover:opacity-90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

