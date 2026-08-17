import React, { createContext, useContext, useState } from 'react';

export interface IrrigationSchedule {
  id: string;
  title: string;
  time: string;
  duration: string;
  frequency: string;
  enabled: boolean;
  zone: string;
}

export interface ZoneData {
  id: string;
  name: string;
  crop: string;
  moisture: number;
  status: 'Optimal' | 'Low' | 'High' | 'Watering';
  targetMoisture: number;
  lastWatered: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'error';
  unread: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface UserProfile {
  name: string;
  role: string;
  estate: string;
  email: string;
  photo: string;
  activeHubs: number;
  uptime: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AppContextType {
  // Motor
  isMotorOn: boolean;
  toggleMotor: () => void;
  soilThreshold: number;
  setSoilThreshold: (val: number) => void;
  autoStopProtocol: boolean;
  setAutoStopProtocol: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Schedules
  schedules: IrrigationSchedule[];
  addSchedule: (sched: Omit<IrrigationSchedule, 'id'>) => void;
  toggleSchedule: (id: string) => void;
  deleteSchedule: (id: string) => void;

  // Zones
  zones: ZoneData[];
  waterZone: (zoneId: string) => void;

  // Weather & Override
  manualOverride: boolean;
  toggleManualOverride: () => void;
  rainAlertDismissed: boolean;
  dismissRainAlert: () => void;

  // Notifications & Toast
  notifications: SystemNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // AI Optimizations
  appliedOptimizations: string[];
  applyOptimization: (id: string) => void;
  applyAllOptimizations: () => void;

  // Support Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Motor state
  const [isMotorOn, setIsMotorOn] = useState<boolean>(true);
  const [soilThreshold, setSoilThreshold] = useState<number>(65);
  const [autoStopProtocol, setAutoStopProtocol] = useState<boolean>(true);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleMotor = () => {
    setIsMotorOn((prev) => {
      const next = !prev;
      addToast(
        next ? 'Central Pump Started - Flow rate 45L/min' : 'Central Pump Powered OFF',
        next ? 'success' : 'warning'
      );
      return next;
    });
  };

  // Schedules state
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([
    { id: '1', title: 'Morning Shift', time: '06:00 AM', duration: '45 Mins', frequency: 'Every Day', enabled: true, zone: 'Zone A - Greenhouse Alpha' },
    { id: '2', title: 'Evening Hydration', time: '18:00 PM', duration: '30 Mins', frequency: 'Mon, Wed, Fri', enabled: true, zone: 'Zone B - Tomato Crop' },
    { id: '3', title: 'Mid-Day Mist', time: '12:30 PM', duration: '15 Mins', frequency: 'Every Day', enabled: false, zone: 'Zone C - Hydroponic Nursery' },
  ]);

  const addSchedule = (sched: Omit<IrrigationSchedule, 'id'>) => {
    const newSched = { ...sched, id: Date.now().toString() };
    setSchedules((prev) => [...prev, newSched]);
    addToast(`New Schedule "${newSched.title}" created successfully!`, 'success');
  };

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const enabled = !s.enabled;
          addToast(`Schedule "${s.title}" ${enabled ? 'enabled' : 'disabled'}`, 'info');
          return { ...s, enabled };
        }
        return s;
      })
    );
  };

  const deleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    addToast('Schedule deleted', 'warning');
  };

  // Zones state
  const [zones, setZones] = useState<ZoneData[]>([
    { id: 'z1', name: 'Zone A - Greenhouse Alpha', crop: 'Vineyard Grapes', moisture: 70, status: 'Optimal', targetMoisture: 75, lastWatered: '2 hours ago' },
    { id: 'z2', name: 'Zone B - Tomato Crop', crop: 'Organic Heirloom Tomatoes', moisture: 52, status: 'Low', targetMoisture: 68, lastWatered: '6 hours ago' },
    { id: 'z3', name: 'Zone C - Hydroponic Nursery', crop: 'Romaine Lettuce', moisture: 82, status: 'High', targetMoisture: 80, lastWatered: '30 mins ago' },
    { id: 'z4', name: 'Zone D - Berry Field', crop: 'Strawberries', moisture: 65, status: 'Optimal', targetMoisture: 70, lastWatered: '1 hour ago' },
  ]);

  const waterZone = (zoneId: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          addToast(`Triggered 10-min watering cycle for ${z.name}`, 'success');
          return { ...z, status: 'Watering', moisture: Math.min(100, z.moisture + 15), lastWatered: 'Just now' };
        }
        return z;
      })
    );
  };

  // Weather & Override state
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const [rainAlertDismissed, setRainAlertDismissed] = useState<boolean>(false);

  const toggleManualOverride = () => {
    setManualOverride((prev) => {
      const next = !prev;
      addToast(
        next ? 'Manual Rain Override Enabled (Forced Irrigation Allowed)' : 'Manual Override Disabled (Automated Rain Hold Active)',
        next ? 'warning' : 'info'
      );
      return next;
    });
  };

  const dismissRainAlert = () => {
    setRainAlertDismissed(true);
    addToast('Rain alert dismissed', 'info');
  };

  // Notifications state
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    { id: 'n1', title: 'Rain Alert', message: 'Precipitation >40mm expected today. Auto-irrigation paused.', time: '10m ago', type: 'warning', unread: true },
    { id: 'n2', title: 'Low Moisture in Zone B', message: 'Soil moisture dropped to 52%. Recommended watering at 18:00.', time: '45m ago', type: 'info', unread: true },
    { id: 'n3', title: 'System Backup Complete', message: 'Telemetry data synced with EcoGrow Cloud.', time: '2h ago', type: 'success', unread: false },
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('Notifications cleared', 'info');
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Thomas Miller',
    role: 'Precision Agriculture Specialist',
    estate: 'Vineyard Estate',
    email: 'thomas.miller@ecogrow.io',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1S4WyItZOUR56khlBm-zZZM6mJLe3SQKLIsKLB0BWf-99hpLEmAR7tWYcuU8uVePmPuS1Uo5-8GVmBvvdRohaP5kpmrR-Zh1Ifl8xq8zgPLuVtzKosG_NOpHgRsM6SGqjxRRlZWsL6iMY2kY6l30E3BjYChRNQYcX3wVGd3nYBBu-hmA8OD2Qz8LwHnypu90wNm6Wfrrb93BOudQJeXyKbxDQ-Yir5qfFWd6abv3M8KNpGUrujwMu2R5yLQgf43hO95ar2_U3bQTQ',
    activeHubs: 4,
    uptime: '99.8%',
  });

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...partial }));
    addToast('Profile updated successfully!', 'success');
  };

  // AI Recommendations state
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([]);

  const applyOptimization = (id: string) => {
    if (!appliedOptimizations.includes(id)) {
      setAppliedOptimizations((prev) => [...prev, id]);
      addToast('AI Optimization applied!', 'success');
    }
  };

  const applyAllOptimizations = () => {
    setAppliedOptimizations(['rec-1', 'rec-2', 'rec-3']);
    addToast('All 3 AI Optimizations successfully applied!', 'success');
  };

  // AI Agronomist Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Hello Thomas! I am your EcoGrow AI Agronomist. How can I help optimize your crop yields or irrigation schedule today?', time: '09:00 AM' },
  ]);

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulate smart AI response
    setTimeout(() => {
      let aiText = `I have analyzed your request regarding "${text}". All field telemetry indicates optimal soil nitrogen levels. I recommend maintaining current drip schedules.`;
      const lower = text.toLowerCase();
      if (lower.includes('water') || lower.includes('moisture')) {
        aiText = 'Current average soil moisture is 68%. Zone B is slightly dry (52%)—I suggest triggering a 15-minute drip cycle for Tomatoes.';
      } else if (lower.includes('rain') || lower.includes('weather')) {
        aiText = 'Weather forecasts predict 85% rain probability tomorrow. Auto-rain pause is enabled to save approximately 1,240 Liters.';
      } else if (lower.includes('motor') || lower.includes('pump')) {
        aiText = `The central pump is currently ${isMotorOn ? 'RUNNING at 45L/min' : 'STOPPED'}. Hydraulic pressure is standard at 3.2 Bar.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <AppContext.Provider
      value={{
        isMotorOn,
        toggleMotor,
        soilThreshold,
        setSoilThreshold,
        autoStopProtocol,
        setAutoStopProtocol,
        schedules,
        addSchedule,
        toggleSchedule,
        deleteSchedule,
        zones,
        waterZone,
        manualOverride,
        toggleManualOverride,
        rainAlertDismissed,
        dismissRainAlert,
        notifications,
        markNotificationRead,
        clearNotifications,
        toasts,
        addToast,
        removeToast,
        userProfile,
        updateUserProfile,
        appliedOptimizations,
        applyOptimization,
        applyAllOptimizations,
        chatMessages,
        sendChatMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
