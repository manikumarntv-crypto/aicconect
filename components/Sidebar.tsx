import React from 'react';
import { AppTab } from '../types';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Network, 
  Activity, 
  Globe2 
} from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: AppTab.CITIZEN, label: 'Citizen Interface', icon: MessageSquareText },
    { id: AppTab.DASHBOARD, label: 'Influencer Dashboard', icon: LayoutDashboard },
    { id: AppTab.ARCHITECTURE, label: 'System Architecture', icon: Network },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full fixed left-0 top-0 shadow-xl z-50 hidden md:flex">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Globe2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Connect</h1>
            <p className="text-xs text-slate-400">Global Impact Challenge</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 flex items-center gap-2">
          <Activity size={14} /> Live Metrics
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm text-slate-300">Total Traffic</span>
            <span className="text-sm font-bold text-green-400">1,240 <span className="text-xs">↑</span></span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[75%]"></div>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <span className="text-sm text-slate-300">Response Rate</span>
            <span className="text-sm font-bold text-blue-400">99.8%</span>
          </div>
           <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[99%]"></div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-700">
           <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Pilot Mode: Hyderabad
           </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;