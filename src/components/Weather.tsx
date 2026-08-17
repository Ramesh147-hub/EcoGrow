import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  CloudRain, 
  Cloud, 
  Sun, 
  CloudSun, 
  Wind, 
  Thermometer, 
  Droplet,
  Compass,
  ArrowUpRight,
  Play,
  Pause,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Weather() {
  const { addToast } = useApp();
  const [selectedSector, setSelectedSector] = useState('North Sector - Greenhouse A');
  const [isRadarPlaying, setIsRadarPlaying] = useState(false);
  const [radarFrame, setRadarFrame] = useState(1);

  const forecast = [
    { day: 'MON', high: 26, low: 18, pop: 0, icon: Sun },
    { day: 'TUE', high: 24, low: 17, pop: 15, icon: CloudSun },
    { day: 'WED', high: 21, low: 16, pop: 85, icon: CloudRain },
    { day: 'THU', high: 22, low: 15, pop: 40, icon: Cloud },
    { day: 'FRI', high: 27, low: 19, pop: 5, icon: Sun },
    { day: 'SAT', high: 28, low: 20, pop: 0, icon: Sun },
    { day: 'SUN', high: 25, low: 18, pop: 10, icon: CloudSun },
  ];

  const handleManualOverride = () => {
    addToast('Irrigation schedule updated: Evening cycle skipped to save 1,240L', 'success');
  };

  const handleRadarToggle = () => {
    setIsRadarPlaying(!isRadarPlaying);
    if (!isRadarPlaying) {
      addToast('Playing 3-hour precipitation radar loop...', 'info');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Alert Section */}
      <section className="bg-error-container text-on-error-container p-8 rounded-[2rem] flex flex-col md:flex-row items-start gap-6 shadow-xl border-l-8 border-error overflow-hidden relative group">
        <div className="p-4 bg-error text-white rounded-[1.5rem] shadow-lg animate-bounce shrink-0">
          <AlertTriangle size={32} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold font-headline tracking-tight mb-2 uppercase">Heavy Rain Pre-Warning</h2>
          <p className="font-medium opacity-90 leading-relaxed">
            Precipitation exceeding 40mm expected in 3 hours. Automated irrigation smart pause is active to prevent soil runoff and nutrient leaching.
          </p>
        </div>
        <AlertTriangle className="absolute -right-10 -bottom-8 opacity-5 text-error rotate-12 pointer-events-none" size={200} />
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Local Detail */}
        <div className="md:col-span-8 glass-card rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-outline-variant/30">
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 mb-4 text-secondary font-bold text-xs uppercase tracking-[0.2em]">
              <MapPin size={16} />
              <select 
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  addToast(`Telemetry switched to ${e.target.value}`, 'info');
                }}
                className="bg-surface-container-high/60 border border-outline-variant/30 px-3 py-1 rounded-xl text-xs font-bold text-on-surface focus:outline-primary cursor-pointer"
              >
                <option value="North Sector - Greenhouse A">North Sector - Greenhouse A</option>
                <option value="South Orchards - Sector B">South Orchards - Sector B</option>
                <option value="East Vineyard - Sector C">East Vineyard - Sector C</option>
                <option value="West Valley - Sector D">West Valley - Sector D</option>
              </select>
            </div>
            <h3 className="text-8xl font-black text-primary font-headline tracking-tighter mb-0 leading-none">24°C</h3>
            <p className="text-3xl font-bold text-on-surface-variant mb-10 tracking-tight">Partly Cloudy</p>
            
            <div className="grid grid-cols-2 gap-8 max-w-sm">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-secondary-container rounded-2xl text-on-secondary-container">
                  <Droplet size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">HUMIDITY</p>
                  <p className="text-3xl font-bold text-on-surface font-headline">68%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-tertiary-container/10 rounded-2xl text-tertiary">
                  <CloudRain size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">RAIN PROB.</p>
                  <p className="text-3xl font-bold text-on-surface font-headline">20%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-0 w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center animate-pulse">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQZPJ857jm_9ktQw9G52lC_9LqbAkxQqyFH0QnoNWs2EP30XdyjX785tqNzAUtqf6382Xg4q23f-YLfhHSIAW7Dmf-QbulK4nSXAuIuhAWlGxeddHfZBkaUs9JwXBgFv7fcBLs_FU69jXhnDioDd3vZKAQ1KiJmbCR_H-IC16ZYKnvtpOEqZ0nEn1aj9uJMLOLcR5W-w5rMuB1DRgnN9LdRWwtFXgUFg4P1sKkWMtvLv163TIjlAOnj3k0gji5Bxx313YOSupROHP" 
              alt="Weather Status"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Insight Card */}
        <div className="md:col-span-4 bg-primary text-on-primary rounded-[2.5rem] p-10 shadow-2xl flex flex-col justify-between border border-primary/20 relative overflow-hidden group">
          <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Thermometer size={24} />
              </div>
              <h3 className="text-2xl font-bold font-headline tracking-tight">Irrigation Insight</h3>
            </div>
            <p className="text-body-lg font-medium opacity-90 leading-relaxed mb-10">
              Based on rainfall forecast and current soil saturation (42%), we recommend skipping the evening cycle.
            </p>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-lg">
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">EXPECTED WATER SAVED</p>
              <p className="text-4xl font-bold font-headline">1,240 Liters</p>
            </div>
            <button 
              onClick={handleManualOverride}
              className="w-full py-5 bg-primary-fixed text-on-primary-fixed font-black text-xs uppercase tracking-widest rounded-full hover:brightness-105 transition-all active:scale-95 shadow-xl"
            >
              APPLY AI OPTIMIZATION
            </button>
          </div>
          <Cloud className="absolute -right-16 -top-16 text-white/5 pointer-events-none" size={280} />
        </div>

        {/* Weekly Forecast */}
        <div className="md:col-span-12">
          <div className="flex justify-between items-center mb-8 px-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight text-on-surface">Weekly Forecast</h3>
            <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Next 7 Days</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {forecast.map((day, i) => (
              <div key={i} className={`min-w-[150px] flex-1 glass-card rounded-3xl p-8 flex flex-col items-center gap-6 text-center border-t-8 transition-all hover:scale-105 duration-300 ${i === 0 ? 'border-primary' : 'border-outline-variant/20'}`}>
                <span className="text-[10px] font-black text-outline tracking-widest">{day.day}</span>
                <day.icon size={40} className={i === 2 ? 'text-tertiary' : 'text-primary'} />
                <div>
                  <p className="text-2xl font-bold text-on-surface font-headline">{day.high}°</p>
                  <p className="text-sm text-outline font-bold mt-1">{day.low}°</p>
                </div>
                <div className={`flex items-center text-xs font-black tracking-widest ${day.pop > 50 ? 'text-tertiary' : 'text-primary/60'}`}>
                  <Droplet size={14} className="mr-1" />
                  {day.pop}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Quality & Wind */}
        <div className="md:col-span-6 glass-card rounded-[2rem] p-8 flex items-center justify-between border border-outline-variant/20 transition-all hover:soft-shadow">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-8 border-secondary flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary font-headline">32</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-on-surface font-headline">Air Quality Index</h4>
              <p className="text-secondary font-black text-xs uppercase tracking-widest mt-1">EXCELLENT</p>
            </div>
          </div>
          <div className="p-4 bg-secondary-container/20 rounded-2xl text-secondary">
            <ArrowUpRight size={28} />
          </div>
        </div>

        <div className="md:col-span-6 glass-card rounded-[2rem] p-8 flex items-center justify-between border border-outline-variant/20 transition-all hover:soft-shadow">
          <div className="flex items-center gap-6">
            <div className="p-6 bg-surface-variant rounded-full text-primary shadow-inner">
              <Compass size={32} className="rotate-45" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-on-surface font-headline">Wind Speed</h4>
              <p className="text-on-surface font-bold text-2xl mt-1 font-data">12 km/h NE</p>
            </div>
          </div>
          <Wind className="text-outline/40" size={32} />
        </div>

      </div>
    </div>
  );
}

