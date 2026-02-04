
import React from 'react';
import { LayoutDashboard, PlusCircle, Building2 } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: 'dashboard' | 'add') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <Building2 className="w-8 h-8 text-blue-500" />
        <span className="ml-2 text-xl font-bold text-white">VillaAgent</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center px-4 py-2 text-gray-300 transition-colors duration-200 transform rounded-md hover:bg-gray-700 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('add')}
            className="w-full flex items-center px-4 py-2 text-gray-300 transition-colors duration-200 transform rounded-md hover:bg-gray-700 hover:text-white"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="mx-4 font-medium">Add Villa</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
