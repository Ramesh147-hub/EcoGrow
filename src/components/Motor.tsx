import React, { useState } from 'react';
import { 
  Power, 
  Lightbulb, 
  Droplet, 
  Timer, 
  History, 
  Calendar, 
  PlusCircle,
  AlertTriangle,
  X,
  Trash2,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Motor() {
  const { 
    isMotorOn, 
    toggleMotor, 
    schedules, 
    toggleSchedule, 
    addSchedule, 
    deleteSchedule, 
    zones,
    addToast 
  } = useApp();

  const [threshold, setThreshold] = useState(65);
  const [autoStop, setAutoStop] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Schedule form state
  const [newTime, setNewTime] = useState('07:00');
  const [newDuration, setNewDuration] = useState('30 Mins');
  const [newDays, setNewDays] = useState('Mon, Wed, Fri');
  const [selectedZone, setSelectedZone] = useState('Zone A - North Field');

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule({
      time: newTime,
      duration: newDuration,
      days: newDays,
      zone: selectedZone,
      enabled: true,
    });
    setIsAddModalOpen(false);
  };

  const handleEmergencyStop = () => {
    if (isMotorOn) {
      toggleMotor();
    }
    addToast('EMERGENCY STOP EXECUTED: Pump halted immediately', 'warning');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Central Control Panel */}
      <section className="bg-white dark:bg-surface-container shadow-2xl rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[450px]">
        {/* Animated Background Water Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="water-wave absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <span className={`w-3 h-3 rounded-full ${isMotorOn ? 'bg-primary animate-ping' : 'bg-gray-400'}`} />
            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
              Pump Status: {isMotorOn ? 'Running' : 'Idle'}
            </span>
          </div>
          
          {/* Large Central Toggle */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-10">
            <AnimatePresence>
              {isMotorOn && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.25, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/10 rounded-full"
                />
              )}
            </AnimatePresence>
            
            <button 
              onClick={toggleMotor}
              className={`w-52 h-52 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${
                isMotorOn 
                ? 'bg-primary text-on-primary ring-8 ring-primary/20' 
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Power size={80} strokeWidth={1.5} className="mb-2" />
              <span className="text-2xl font-bold font-headline">{isMotorOn ? 'STOP' : 'START'}</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-12 w-full text-center mb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Runtime</p>
              <p className="text-4xl font-bold text-primary font-headline tracking-tight">{isMotorOn ? '2h 15m' : '0h 0m'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Flow Rate</p>
              <p className="text-4xl font-bold text-tertiary font-headline tracking-tight">{isMotorOn ? '45 L/m' : '0.0 L/m'}</p>
            </div>
          </div>

          <button 
            onClick={handleEmergencyStop}
            className="flex items-center gap-2 px-6 py-2.5 bg-error/10 hover:bg-error text-error hover:text-white rounded-2xl text-xs font-bold transition-all border border-error/20"
          >
            <AlertTriangle size={16} />
            EMERGENCY STOP
          </button>
        </div>
      </section>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Recommendation */}
        <motion.article 
          whileHover={{ y: -3 }}
          className="bg-secondary-container text-on-secondary-container p-8 rounded-[2rem] shadow-xl border-l-8 border-secondary relative overflow-hidden"
        >
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-secondary rounded-2xl text-white">
              <Lightbulb size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 font-headline">Smart Recommendation</h3>
              <p className="text-body-md opacity-90 leading-relaxed">
                Forecast shows rising temperatures tomorrow. Schedule additional irrigation for 6 PM to maintain optimal moisture.
              </p>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="mt-6 bg-secondary text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                Schedule Now
              </button>
            </div>
          </div>
          <Lightbulb className="absolute -right-10 -bottom-10 opacity-5 rotate-12 pointer-events-none" size={240} />
        </motion.article>

        {/* Threshold Control */}
        <div className="bg-white dark:bg-surface-container rounded-[2rem] p-8 soft-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3 font-headline">
              <Droplet className="text-primary" size={28} />
              Soil Threshold Target
            </h3>
            <span className="text-3xl font-bold text-primary font-data">{threshold}%</span>
          </div>

          <div className="px-4">
            <input 
              type="range" 
              min="30" 
              max="90" 
              value={threshold} 
              onChange={(e) => {
                setThreshold(parseInt(e.target.value));
              }}
              className="w-full h-3 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary" 
            />
            <div className="flex justify-between text-xs font-black text-on-surface-variant uppercase tracking-widest mt-4">
              <span>Dry (30%)</span>
              <span>Optimal (65%)</span>
              <span>Wet (90%)</span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <div>
              <p className="font-bold">Auto-Stop Protocol</p>
              <p className="text-xs text-on-surface-variant">Protects root systems from rot & overwatering</p>
            </div>
            <button 
              onClick={() => {
                setAutoStop(!autoStop);
                addToast(`Auto-Stop Protocol ${!autoStop ? 'Enabled' : 'Disabled'}`, 'info');
              }}
              className={`w-16 h-9 rounded-full relative p-1 transition-colors ${autoStop ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <div className={`w-7 h-7 bg-white rounded-full shadow-sm transition-transform ${autoStop ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Irrigation Schedules */}
      <section className="bg-white dark:bg-surface-container rounded-[2rem] p-8 soft-shadow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold font-headline tracking-tight">Irrigation Schedules</h3>
            <p className="text-xs text-on-surface-variant">Automated watering routines configured for field zones</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-2xl text-sm font-bold hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <PlusCircle size={18} />
            New Schedule
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map((schedule) => (
            <div 
              key={schedule.id} 
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                schedule.enabled 
                  ? 'border-primary/40 bg-surface-container-lowest shadow-sm' 
                  : 'border-outline-variant/30 bg-surface-container-low opacity-60'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-container text-on-primary-container rounded-2xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-bold font-headline">{schedule.time}</p>
                    <p className="text-xs font-bold text-primary">{schedule.zone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleSchedule(schedule.id)}
                    className={`w-12 h-7 rounded-full relative p-0.5 transition-colors ${schedule.enabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${schedule.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <button 
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-1.5 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-lg transition-colors"
                    title="Delete schedule"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20 font-medium">
                <span>Duration: <strong>{schedule.duration}</strong></span>
                <span>Days: <strong>{schedule.days}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
          <form onSubmit={handleCreateSchedule} className="bg-white dark:bg-surface-container rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
              <h3 className="text-xl font-bold font-headline">Create Irrigation Schedule</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-surface-container rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Start Time</label>
                <input 
                  type="time" 
                  value={newTime} 
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl font-bold text-on-surface focus:outline-primary"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Duration</label>
                <select 
                  value={newDuration} 
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl font-bold text-on-surface focus:outline-primary"
                >
                  <option value="15 Mins">15 Mins</option>
                  <option value="30 Mins">30 Mins</option>
                  <option value="45 Mins">45 Mins</option>
                  <option value="60 Mins">60 Mins</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Target Zone</label>
                <select 
                  value={selectedZone} 
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl font-bold text-on-surface focus:outline-primary"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.name}>{z.name} ({z.crop})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Frequency Days</label>
                <input 
                  type="text" 
                  value={newDays} 
                  onChange={(e) => setNewDays(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl font-bold text-on-surface focus:outline-primary"
                  placeholder="e.g. Mon, Wed, Fri"
                  required 
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 bg-surface-container-high font-bold rounded-2xl hover:bg-surface-container-highest"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-2xl hover:opacity-90"
              >
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hydraulic Performance Vision */}
      <section className="h-64 md:h-80 rounded-[2.5rem] overflow-hidden relative soft-shadow group">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbNOBlQgqd3tM5iAVTiHh11Vy0P2gVi5y6KQx-1sjq8e5aWdHVJGbJA_VD98XMr78Jac85ayb-yW5AuOmfr_pkWjA4tdiTma4VtwODMh154J-xXSAgHaB3XrrGrJgJJjKZVKvHwM7IsDj4rQyTFf1NuPVkx-E2DjXEwQefJt7B8jKoaG8Xr6GNBlOfoc5ddcnEV7CA8yEis59aWD4QEKK5er3jA4KlOV0ADoTmJOwZsBQuV209pWHZUZqBl2oHirk_ErnVtVwvyRuz" 
          alt="Irrigation"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10">
          <div className="flex items-center gap-4 mb-3">
             <div className="flex gap-1.5 items-center">
               <div className={`w-2.5 h-2.5 rounded-full ${isMotorOn ? 'bg-primary animate-pulse' : 'bg-gray-400'}`} />
               <div className={`w-2.5 h-2.5 rounded-full ${isMotorOn ? 'bg-primary animate-pulse delay-150' : 'bg-gray-400'}`} />
               <div className={`w-2.5 h-2.5 rounded-full ${isMotorOn ? 'bg-primary animate-pulse delay-300' : 'bg-gray-400'}`} />
             </div>
             <span className="text-white font-bold text-sm tracking-wide">Live Stream: North Field Valve A-1</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-white font-bold font-headline tracking-tighter">Active Hydraulic Performance</h2>
        </div>
      </section>
    </div>
  );
}


