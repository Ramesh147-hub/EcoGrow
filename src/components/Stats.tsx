import React, { useState } from 'react';
import { 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  PiggyBank, 
  Wallet,
  BrainCircuit,
  MessageSquareWarning,
  Lightbulb,
  CheckCircle2,
  Droplet,
  Sun,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext';

const metricData = {
  water: [
    { day: 'Mon', actual: 40, predicted: 45 },
    { day: 'Tue', actual: 35, predicted: 42 },
    { day: 'Wed', actual: 45, predicted: 40 },
    { day: 'Thu', actual: 60, predicted: 55 },
    { day: 'Fri', actual: 50, predicted: 48 },
    { day: 'Sat', actual: 30, predicted: 35 },
    { day: 'Sun', actual: 40, predicted: 42 },
  ],
  power: [
    { day: 'Mon', actual: 12, predicted: 14 },
    { day: 'Tue', actual: 10, predicted: 12 },
    { day: 'Wed', actual: 15, predicted: 13 },
    { day: 'Thu', actual: 18, predicted: 16 },
    { day: 'Fri', actual: 14, predicted: 15 },
    { day: 'Sat', actual: 8, predicted: 10 },
    { day: 'Sun', actual: 11, predicted: 12 },
  ],
  moisture: [
    { day: 'Mon', actual: 68, predicted: 70 },
    { day: 'Tue', actual: 64, predicted: 68 },
    { day: 'Wed', actual: 72, predicted: 70 },
    { day: 'Thu', actual: 75, predicted: 72 },
    { day: 'Fri', actual: 70, predicted: 71 },
    { day: 'Sat', actual: 65, predicted: 67 },
    { day: 'Sun', actual: 67, predicted: 68 },
  ],
};

const monthlyData = [
  { month: 'Jan', value: 80, baseline: 100 },
  { month: 'Feb', value: 90, baseline: 100 },
  { month: 'Mar', value: 110, baseline: 120 },
  { month: 'Apr', value: 130, baseline: 140 },
  { month: 'May', value: 100, baseline: 110 },
  { month: 'Jun', value: 85, baseline: 100 },
];

export default function Stats() {
  const { addToast } = useApp();
  const [activeMetric, setActiveMetric] = useState<'water' | 'power' | 'moisture'>('water');

  const handleApplyOptimizations = () => {
    addToast('All 3 AI Irrigation Optimizations Applied Successfully!', 'success');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Day,Actual,Predicted\n" + 
      metricData[activeMetric].map(e => `${e.day},${e.actual},${e.predicted}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecogrow_analytics_${activeMetric}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Analytics report downloaded as CSV', 'info');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold text-primary font-headline tracking-tighter">Water Usage Analytics</h2>
          <p className="text-on-surface-variant font-medium mt-1">Real-time insights and irrigation efficiency tracking.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-2xl text-xs font-bold hover:opacity-90 transition-all active:scale-95 shadow-md"
        >
          <Download size={16} />
          Export CSV Data
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Usage */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-8 soft-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight">
              {activeMetric === 'water' ? 'Weekly Water Usage (L)' : activeMetric === 'power' ? 'Power Draw (kWh)' : 'Avg Soil Saturation (%)'}
            </h3>
            
            <div className="flex bg-surface-container-high rounded-xl p-1 gap-1">
              <button 
                onClick={() => setActiveMetric('water')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === 'water' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'}`}
              >
                Water (L)
              </button>
              <button 
                onClick={() => setActiveMetric('power')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === 'power' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'}`}
              >
                Power (kWh)
              </button>
              <button 
                onClick={() => setActiveMetric('moisture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === 'moisture' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'}`}
              >
                Moisture (%)
              </button>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricData[activeMetric]}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006b2c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#006b2c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde5d9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#3e4a3d'}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #dde5d9', 
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Area type="monotone" dataKey="actual" stroke="#006b2c" strokeWidth={4} fillOpacity={1} fill="url(#colorActual)" name="Actual" />
                <Area type="monotone" dataKey="predicted" stroke="#0058be" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="AI Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs font-bold text-on-surface-variant font-headline tracking-tight uppercase">Actual Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-tertiary" />
              <span className="text-xs font-bold text-on-surface-variant font-headline tracking-tight uppercase">Predicted</span>
            </div>
          </div>
        </div>

        {/* Efficiency Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-8 soft-shadow flex-1 flex flex-col items-center text-center justify-center">
            <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6">Efficiency Score</h3>
            <div className="relative w-44 h-44">
              <svg className="w-full h-full -rotate-90">
                <circle cx="88" cy="88" r="78" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-surface-container-high" />
                <circle cx="88" cy="88" r="78" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="490" strokeDashoffset="44" className="text-primary" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-primary font-headline tracking-tighter">92%</span>
                <span className="text-xs font-bold text-secondary tracking-tight uppercase">Optimum</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-on-surface-variant font-medium leading-relaxed px-4">
              Top 5% of regional greenhouses
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 soft-shadow bg-tertiary-container/5 border border-tertiary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-tertiary uppercase tracking-widest">Next Irrigation</p>
                <p className="text-2xl font-bold text-on-surface mt-1 font-headline">450L Estimated</p>
              </div>
              <Droplets className="text-tertiary" size={32} />
            </div>
            <div className="mt-6 h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-tertiary w-3/4 animate-pulse" />
            </div>
            <p className="mt-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Scheduled: Tomorrow, 05:30 AM</p>
          </div>
        </div>

        {/* Saving Stats */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Weekly Savings', val: '200L Saved', sub: '↑ 12% from last week', icon: PiggyBank, color: 'text-primary', bg: 'bg-primary-container' },
            { label: 'Cost Reduction', val: '$45.50', sub: 'Accumulated this month', icon: Wallet, color: 'text-tertiary', bg: 'bg-tertiary-container' },
            { label: 'Soil Moisture Avg', val: '68%', sub: 'Target Range: 65% - 75%', icon: Droplet, color: 'text-secondary', bg: 'bg-secondary-container' },
          ].map((card, i) => (
            <div key={i} className="glass-card rounded-3xl p-8 soft-shadow border-l-8 border-current flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{card.label}</p>
                  <p className="text-2xl font-bold mt-2 font-headline tracking-tight text-on-surface">{card.val}</p>
                </div>
                <div className={`${card.bg} p-3 rounded-2xl`}>
                  <card.icon size={24} className={card.color} />
                </div>
              </div>
              <p className={`mt-4 text-sm font-bold ${card.color}`}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Monthly Analytics */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 soft-shadow">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold font-headline tracking-tight">Monthly Analytics</h3>
            <select className="bg-surface-container border-none rounded-2xl text-xs font-bold text-on-surface-variant px-4 py-2 focus:ring-primary">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde5d9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#3e4a3d'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#006b2c" />
                  ))}
                </Bar>
                <Bar dataKey="baseline" fill="#dde5d9" radius={[8, 8, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-8 bg-primary/5 soft-shadow flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <BrainCircuit className="text-primary" size={32} />
            <h3 className="text-2xl font-bold text-primary font-headline tracking-tight">AI Recommendations</h3>
          </div>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Optimize Sunrise Routine', desc: 'Shifting irrigation to 05:15 AM could save 12L daily due to lower evaporation rates.', icon: Sun, color: 'bg-secondary-container text-on-secondary-container' },
              { title: 'Leak Detected: Zone 4', desc: 'Minor flow inconsistency detected. Recommended inspection of micro-drip emitters.', icon: MessageSquareWarning, color: 'bg-tertiary-container/20 text-tertiary' },
              { title: 'Precision Threshold', desc: 'Current humidity levels are high. System recommends skipping the next scheduled spray.', icon: Lightbulb, color: 'bg-surface-container text-on-surface-variant' },
            ].map((rec, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-surface-container-lowest rounded-3xl soft-shadow group hover:translate-x-2 transition-transform duration-300">
                <div className={`${rec.color} w-12 h-12 rounded-2xl flex items-center justify-center shrink-0`}>
                  <rec.icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{rec.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleApplyOptimizations}
            className="w-full mt-8 py-4 bg-primary text-on-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
          >
            <CheckCircle2 size={20} />
            Apply All Optimizations
          </button>
        </div>

      </div>

      {/* Sustainability Feature */}
      <div className="h-72 rounded-[2.5rem] overflow-hidden relative soft-shadow group">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSW3EQCl1pdQtNO4h9EBIS2Rq_sSRxS5KvuTYzb81vTKNkIZagliXNAlJ0iYEYlCHVtrLvz1hOFR3Whfgf398tTznh6Lt_6K6V5Ba_bV6PkJ4AZaLiGgchkOL3mUw0ot8xcIaWk18JSSU5rksUhdj33FBSy4TU04VpVkp3ZPfwxc3_2MLerPkI12CqkE6BMwscYn_bEtMSh4zpTJCl19okVwkEwNwXlPbdF2o2aG61oK50dZtkD1LAm4Mn1QBfIIuz04zFhYpXG3se" 
          alt="Hydroponics"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex flex-col justify-end p-12">
          <h4 className="text-3xl md:text-4xl font-bold text-white font-headline tracking-tighter">Sustainability in Motion</h4>
          <p className="text-body-lg text-white/90 mt-2 max-w-xl leading-relaxed">Your facility has prevented the waste of 2,400L this year.</p>
        </div>
      </div>
    </div>
  );
}

