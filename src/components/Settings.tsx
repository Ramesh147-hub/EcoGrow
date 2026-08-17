import React, { useState } from 'react';
import { 
  UserCircle, 
  ChevronRight, 
  Globe, 
  Moon, 
  Bell, 
  Settings as SettingsIcon,
  Cpu,
  Router,
  Droplet,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  LogOut,
  Edit2,
  PlusCircle,
  X,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { userProfile, updateProfile, addToast } = useApp();
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPairDeviceOpen, setIsPairDeviceOpen] = useState(false);
  
  const [editName, setEditName] = useState(userProfile.name);
  const [editRole, setEditRole] = useState(userProfile.role);
  const [editEstate, setEditEstate] = useState(userProfile.estate);
  
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('Gateway');

  const [connectedDevices, setConnectedDevices] = useState([
    { id: '1', name: 'Main Gateway - Hub Alpha', status: 'Online', signal: 'Excellent', active: true },
    { id: '2', name: 'East Pump #02 - Vineyard', status: 'Offline', signal: 'No Connection', active: false },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      role: editRole,
      estate: editEstate,
    });
    addToast('Profile updated successfully!', 'success');
    setIsEditProfileOpen(false);
  };

  const handlePairDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName.trim()) return;
    const newDev = {
      id: Date.now().toString(),
      name: deviceName,
      status: 'Online',
      signal: 'Strong (98%)',
      active: true,
    };
    setConnectedDevices([...connectedDevices, newDev]);
    addToast(`Paired new device: ${deviceName}`, 'success');
    setDeviceName('');
    setIsPairDeviceOpen(false);
  };

  const togglePush = () => {
    setPushEnabled(!pushEnabled);
    addToast(!pushEnabled ? 'Push notifications enabled' : 'Push notifications disabled', 'info');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    addToast(!darkMode ? 'Switched to Dark Appearance' : 'Switched to Light Appearance', 'info');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Hero */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 soft-shadow flex flex-col md:flex-row items-center gap-10 relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-6 right-8">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container font-black text-xs uppercase tracking-widest shadow-sm">
            <span className="status-pulse-dot animate-pulse"></span>
            Online
          </span>
        </div>
        
        <div className="relative group">
          <div className="w-40 h-40 rounded-full border-8 border-primary-fixed overflow-hidden soft-shadow transition-transform duration-500 group-hover:scale-105">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute bottom-1 right-1 bg-primary text-on-primary p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            title="Edit Profile"
          >
            <Edit2 size={20} />
          </button>
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="text-4xl font-black text-on-surface font-headline tracking-tighter mb-2">{userProfile.name}</h2>
          <p className="text-on-surface-variant font-medium text-lg mb-8 opacity-80">{userProfile.role} • {userProfile.estate}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-surface-container px-6 py-3 rounded-2xl border border-outline-variant/20">
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-1">Active Hubs</p>
              <p className="text-3xl font-bold text-primary font-headline">04</p>
            </div>
            <div className="bg-surface-container px-6 py-3 rounded-2xl border border-outline-variant/20">
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-1">Uptime</p>
              <p className="text-3xl font-bold text-primary font-headline">99.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Preferences Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* System Preferences */}
          <div className="bg-white rounded-[2rem] p-8 soft-shadow border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <SettingsIcon size={28} />
              </div>
              <h3 className="text-2xl font-bold font-headline tracking-tight">System Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface-container transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-surface-container-highest rounded-xl group-hover:bg-white transition-colors">
                    <Globe size={20} className="text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Application Language</p>
                    <p className="text-on-surface-variant text-sm font-medium">English (US)</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-outline" />
              </div>

              <div 
                onClick={toggleDarkMode}
                className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface-container transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-surface-container-highest rounded-xl group-hover:bg-white transition-colors">
                    <Moon size={20} className="text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Dark Appearance</p>
                    <p className="text-on-surface-variant text-sm font-medium">{darkMode ? 'Enabled' : 'Automatic system switching'}</p>
                  </div>
                </div>
                <div className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center ${darkMode ? 'bg-primary justify-end' : 'bg-surface-container-highest'}`}>
                  <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div 
                onClick={togglePush}
                className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface-container transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-surface-container-highest rounded-xl group-hover:bg-white transition-colors">
                    <Bell size={20} className="text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Push Notifications</p>
                    <p className="text-on-surface-variant text-sm font-medium">{pushEnabled ? 'Active for all telemetry alerts' : 'Disabled'}</p>
                  </div>
                </div>
                <div className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center ${pushEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest'}`}>
                  <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-white rounded-[2rem] p-8 soft-shadow border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold font-headline tracking-tight">Connected Infrastructure</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectedDevices.map((dev) => (
                <div 
                  key={dev.id}
                  className={`border rounded-2xl p-6 flex items-center justify-between transition-colors ${dev.active ? 'border-outline-variant/40 hover:border-primary/40' : 'border-outline-variant/20 opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${dev.active ? 'bg-secondary-container' : 'bg-surface-variant'}`}>
                      {dev.name.toLowerCase().includes('pump') ? <Droplet size={24} className={dev.active ? 'text-on-secondary-container' : 'text-on-surface-variant'} /> : <Router size={24} className={dev.active ? 'text-on-secondary-container' : 'text-on-surface-variant'} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{dev.name}</p>
                      <p className={`text-xs font-bold ${dev.active ? 'text-primary' : 'text-error'}`}>{dev.status}: {dev.signal}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${dev.active ? 'bg-secondary animate-pulse' : 'bg-error'}`} />
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsPairDeviceOpen(true)}
              className="mt-8 w-full py-5 rounded-[1.5rem] border-2 border-dashed border-outline-variant/40 text-outline font-bold hover:bg-surface-container transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
            >
               <PlusCircle size={20} />
               Pair New Device
            </button>
          </div>
        </div>

        {/* Support & Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Help Card */}
          <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold font-headline mb-3 tracking-tight">Need Help?</h3>
              <p className="text-on-primary/80 mb-10 text-sm leading-relaxed font-medium">
                Our expert agronomists and support team are available 24/7 for you.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => addToast('Connecting to AI Agronomist support channel...', 'info')}
                  className="w-full bg-white text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                >
                  <MessageCircle size={20} />
                  Live Support Chat
                </button>
                <button 
                  onClick={() => addToast('Opening EcoGrow documentation portal...', 'info')}
                  className="w-full bg-transparent border border-white/30 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                >
                  <HelpCircle size={20} />
                  Knowledge Base
                </button>
              </div>
            </div>
            <UserCircle className="absolute -bottom-10 -right-10 text-white/5 rotate-12 pointer-events-none" size={240} />
          </div>

          {/* App Info */}
          <div className="bg-white rounded-[2rem] p-8 soft-shadow border border-outline-variant/10">
            <h3 className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-8">About Application</h3>
            <div className="space-y-2">
              {[
                { label: 'Version', val: 'v2.4.8-stable' },
                { label: 'Last Update', val: 'Oct 12, 2026' },
                { label: 'Terms of Service', val: <ExternalLink size={16} />, isIcon: true },
                { label: 'Privacy Policy', val: <ExternalLink size={16} />, isIcon: true },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-outline-variant/10 last:border-0 hover:px-2 transition-all">
                  <span className="text-on-surface-variant font-medium">{row.label}</span>
                  <span className={`font-bold transition-colors ${row.isIcon ? 'text-primary' : 'text-on-surface'}`}>{row.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <button 
                onClick={() => addToast('Account session verified', 'info')}
                className="flex items-center gap-4 text-error font-bold hover:bg-error/5 p-4 rounded-2xl w-full transition-all active:scale-95"
              >
                <div className="p-2 bg-error-container/30 rounded-xl">
                  <LogOut size={20} />
                </div>
                Sign Out Account
              </button>
            </div>
          </div>

          {/* Footer Brand */}
          <div className="rounded-[2.5rem] h-40 relative overflow-hidden flex items-end p-8 group soft-shadow">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXJn6VZ_5GJPEpEjISZMWWjzGk3KMpG0EbQ_XgkOT430-yW7EhzrZ0PHqWE5ss645uldgGrOztTcKWCTfx0YgEq9misiffjkF-HdDKUnRV6dG0JoEE5MxGcAt5h9k6rAX1cnCNzAChhVQGuKIug7uj5yBbCYKLkAQV5Y4XSaxrdFQfNz3rlm4LjpI3OU6ix76Kd2nhX_q2sQQJaoaazy9cqu6tvgqiBtnfG3dbOl-KiaeKpekjo7pIG7rgytoZGHs7GpTexDCG39Ln')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </div>
            <div className="relative z-10">
              <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Powered by</p>
              <p className="text-white text-3xl font-bold font-headline tracking-tighter">EcoGrow AI™</p>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-on-surface font-headline">Edit Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="p-2 text-outline hover:text-on-surface">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-surface-container-high px-4 py-3 rounded-xl text-on-surface font-bold border border-outline-variant/30 focus:outline-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Role / Title</label>
                <input 
                  type="text" 
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-surface-container-high px-4 py-3 rounded-xl text-on-surface font-bold border border-outline-variant/30 focus:outline-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Farm Estate Name</label>
                <input 
                  type="text" 
                  value={editEstate}
                  onChange={(e) => setEditEstate(e.target.value)}
                  className="w-full bg-surface-container-high px-4 py-3 rounded-xl text-on-surface font-bold border border-outline-variant/30 focus:outline-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-3 bg-surface-container text-on-surface font-bold rounded-xl text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg hover:opacity-90"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pair Device Modal */}
      {isPairDeviceOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-on-surface font-headline">Pair New Hardware Device</h3>
              <button onClick={() => setIsPairDeviceOpen(false)} className="p-2 text-outline hover:text-on-surface">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePairDevice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Device Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Valve Controller #04"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full bg-surface-container-high px-4 py-3 rounded-xl text-on-surface font-bold border border-outline-variant/30 focus:outline-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Device Type</label>
                <select 
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full bg-surface-container-high px-4 py-3 rounded-xl text-on-surface font-bold border border-outline-variant/30 focus:outline-primary cursor-pointer"
                >
                  <option value="Gateway">LoRaWAN Gateway</option>
                  <option value="Pump">Submersible Pump Controller</option>
                  <option value="Sensor">Soil Sensor Array</option>
                </select>
              </div>

              <div className="p-4 bg-secondary-container/30 rounded-2xl flex items-center gap-3 text-secondary text-xs font-medium">
                <ShieldCheck size={20} className="shrink-0" />
                <span>Auto-scanning 868MHz frequency band for nearby devices...</span>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsPairDeviceOpen(false)}
                  className="flex-1 py-3 bg-surface-container text-on-surface font-bold rounded-xl text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg hover:opacity-90"
                >
                  Pair Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

