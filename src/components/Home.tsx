import React from 'react';
import { 
  Sun, 
  Power, 
  Clock, 
  Droplet, 
  Thermometer, 
  Activity,
  Droplets,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { isMotorOn, toggleMotor, userProfile } = useApp();

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Weather */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-bold text-primary font-headline tracking-tight">Good morning, {userProfile.name}</h2>
          <p className="text-on-surface-variant font-medium mt-1">Your ecosystem at {userProfile.estate} is thriving today.</p>
        </div>
        
        <div className="bg-surface-container-lowest p-4 rounded-3xl soft-shadow flex items-center gap-4 border border-outline-variant/30 pr-8">
          <div className="bg-secondary-container text-on-secondary-container p-3 rounded-2xl">
            <Sun size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Weather</p>
            <p className="text-xl font-bold text-on-surface">Sunny, 28°C</p>
          </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Motor Control Panel */}
        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-[2rem] soft-shadow relative overflow-hidden flex flex-col justify-between min-h-[350px] border border-outline-variant/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className={`status-pulse-dot ${isMotorOn ? 'animate-pulse bg-primary' : 'bg-gray-400'}`}></span>
              <span className="text-xs font-bold text-primary uppercase">Live Status: Motor {isMotorOn ? 'ON' : 'OFF'}</span>
            </div>
            <h3 className="text-3xl font-bold mb-3 tracking-tight">Central Irrigation Control</h3>
            <p className="text-on-surface-variant max-w-md">
              {isMotorOn 
                ? 'System is currently running based on the active irrigation schedule. Automated shut-off in 45 minutes.' 
                : 'System is currently idle. Next scheduled cycle starts at 18:00 PM.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 relative z-10 transition-all duration-500">
            <button 
              onClick={toggleMotor}
              className={`px-10 py-5 rounded-full font-bold flex items-center gap-3 shadow-xl transition-all active:scale-95 ${
                isMotorOn 
                ? 'bg-primary text-on-primary hover:bg-primary-container' 
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Power size={24} />
              {isMotorOn ? 'STOP MOTOR' : 'START MOTOR'}
            </button>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Flow Rate</p>
                <p className="text-2xl font-bold text-on-surface">{isMotorOn ? '45' : '0'} L/min</p>
              </div>
              <div className="h-10 w-px bg-outline-variant/50" />
              <div className="text-center">
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Pressure</p>
                <p className="text-2xl font-bold text-on-surface">{isMotorOn ? '3.2' : '0'} Bar</p>
              </div>
            </div>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Zap size={200} />
          </div>
        </div>

        {/* Prediction Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-tertiary-container to-tertiary p-8 rounded-[2rem] soft-shadow text-white flex flex-col justify-between">
          <div>
            <Clock size={40} className="mb-6" />
            <h3 className="text-2xl font-bold tracking-tight">Irrigation Prediction</h3>
            <p className="text-white/80 text-sm mt-2">Based on soil moisture and upcoming heatwaves.</p>
          </div>
          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Next Cycle In</p>
            <p className="text-5xl font-bold font-headline">4h 12m</p>
          </div>
        </div>

        {/* Soil Moisture */}
        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[2rem] soft-shadow border border-outline-variant/20 flex flex-col items-center">
          <div className="w-full flex justify-between items-start mb-6">
            <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Soil Moisture</h3>
            <Droplet className="text-primary" size={24} />
          </div>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-surface-container-high" />
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="440" strokeDashoffset="154" className="text-primary transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-primary font-headline">65%</span>
              <span className="text-xs font-bold text-on-surface-variant">Optimal</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant mt-6 mb-2">Last checked: 2 mins ago</p>
        </div>

        {/* Temperature */}
        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[2rem] soft-shadow border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Air Temperature</p>
              <p className="text-5xl font-bold text-on-surface mt-2 font-headline">28°C</p>
            </div>
            <div className="bg-error-container text-on-error-container p-3 rounded-2xl">
              <Thermometer size={24} />
            </div>
          </div>
          <div className="mt-8 flex items-end gap-1 h-20 px-1 overflow-hidden">
            {[30, 45, 60, 50, 70, 85, 80, 95].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-sm transition-all duration-700 ${i === 7 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-xs font-bold text-primary mt-3 flex items-center gap-1">
            <Activity size={14} /> ↑ 2°C from yesterday
          </p>
        </div>

        {/* Tank Level */}
        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[2rem] soft-shadow border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Tank Level</h3>
            <Droplets className="text-secondary" size={24} />
          </div>
          <div className="flex items-end gap-6 mt-6">
            <div className="relative w-24 h-40 bg-surface-container-high rounded-3xl overflow-hidden shadow-inner">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '80%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 bg-primary"
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-pulse border-t border-white/30" />
              </motion.div>
            </div>
            <div>
              <p className="text-5xl font-bold text-on-surface font-headline">80%</p>
              <p className="text-sm text-on-surface-variant mt-1 leading-tight">~4,200 Liters remaining</p>
              <p className="text-xs font-bold text-secondary mt-2">Status: Normal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Statistics */}
      <section>
        <h3 className="text-2xl font-bold mb-5 px-1">Weekly Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Water Used', val: '12.4k L', color: 'text-primary' },
            { label: 'Power Consumed', val: '42 kWh', color: 'text-primary' },
            { label: 'System Uptime', val: userProfile.uptime, color: 'text-primary' },
            { label: 'Alarms Raised', val: '0', color: 'text-error' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container p-5 rounded-[1.5rem] flex flex-col gap-1">
              <p className="text-[10px] font-black text-on-surface-variant tracking-widest uppercase">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} font-headline`}>{stat.val}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

