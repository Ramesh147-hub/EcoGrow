/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Radio, 
  Sun, 
  Zap, 
  UserCircle, 
  Bell, 
  Sprout,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId, NavItem } from './types';
import { AppProvider, useApp } from './context/AppContext';

// Screens
import Home from './components/Home';
import Sensors from './components/Sensors';
import Motor from './components/Motor';
import Weather from './components/Weather';
import Stats from './components/Stats';
import Settings from './components/Settings';

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'LayoutDashboard' },
  { id: 'sensors', label: 'Sensors', icon: 'Radio' },
  { id: 'motor', label: 'Motor', icon: 'Zap' },
  { id: 'weather', label: 'Weather', icon: 'Sun' },
  { id: 'stats', label: 'Stats', icon: 'BarChart3' },
];

const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = {
    LayoutDashboard,
    Radio,
    Zap,
    Sun,
    BarChart3,
  };
  const Icon = icons[name];
  return Icon ? <Icon className={className} size={24} /> : null;
};

function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl backdrop-blur-md text-sm font-bold border ${
              toast.type === 'success'
                ? 'bg-primary/95 text-white border-primary-container'
                : toast.type === 'warning'
                ? 'bg-amber-600/95 text-white border-amber-500'
                : toast.type === 'error'
                ? 'bg-error text-white border-red-700'
                : 'bg-surface-container-highest text-on-surface border-outline-variant'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 size={20} />}
              {toast.type === 'warning' && <AlertTriangle size={20} />}
              {toast.type === 'info' && <Info size={20} />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-2">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function NotificationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { notifications, markNotificationRead, clearNotifications } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] flex justify-end" onClick={onClose}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-surface-container h-full w-full max-w-md p-6 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-primary" />
                <h3 className="text-xl font-bold font-headline">System Alerts</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-on-surface-variant font-medium">
                  <CheckCircle2 size={48} className="mx-auto mb-3 text-primary opacity-50" />
                  <p>All notifications cleared!</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      n.unread
                        ? 'bg-primary-container/10 border-primary/30'
                        : 'bg-surface-container-low border-outline-variant/20 opacity-70'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-bold text-sm text-on-surface">{n.title}</span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{n.time}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">{n.message}</p>
                    {n.unread && (
                      <span className="inline-block mt-2 text-[10px] font-bold text-primary flex items-center gap-1">
                        <Check size={12} /> Mark as read
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-bold rounded-2xl transition-all"
            >
              Clear All Notifications
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabId>('sensors');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { notifications, isMotorOn } = useApp();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'sensors': return <Sensors />;
      case 'motor': return <Motor />;
      case 'weather': return <Weather />;
      case 'stats': return <Stats />;
      case 'settings': return <Settings />;
      default: return <Sensors />;
    }
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-0 lg:pt-16">
      <ToastContainer />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary to-primary-container text-on-primary z-50 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-3">
          <Sprout size={28} />
          <h1 className="text-xl font-bold tracking-tight">EcoGrow</h1>
          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ml-2 flex items-center gap-1.5 ${
            isMotorOn ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest/40 text-white/80'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isMotorOn ? 'bg-primary animate-ping' : 'bg-gray-400'}`} />
            {isMotorOn ? 'PUMP ACTIVE' : 'PUMP IDLE'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsNotifOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
            title="System Notifications"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            className="p-1 hover:bg-white/10 rounded-full transition-colors" 
            onClick={() => setActiveTab('settings')}
            title="Settings & Profile"
          >
            <UserCircle size={32} strokeWidth={1.5} className={activeTab === 'settings' ? 'text-secondary-container' : ''} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 lg:pl-32 lg:pr-10 pt-24 lg:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation - Bottom on Mobile, Side on Desktop */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/30 z-40 flex justify-around items-center px-4 lg:flex-col lg:bottom-0 lg:top-16 lg:right-auto lg:w-24 lg:h-auto lg:border-t-0 lg:border-r lg:justify-start lg:gap-8 lg:pt-10">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 lg:w-20 ${
                isActive 
                ? 'bg-secondary-container text-on-secondary-container scale-105' 
                : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <IconComponent name={item.icon} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full hidden lg:block"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

