
import React from 'react';
import { Search, Bell, Moon, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center">
        {/* Mobile menu button can be added here */}
      </div>
      <div className="flex items-center">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-500" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-300 bg-gray-700 border border-transparent rounded-md focus:border-blue-500 focus:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center ml-6">
          <button className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ml-2 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
          </button>
           <button className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ml-2">
            <Settings className="w-5 h-5" />
          </button>
          <div className="ml-4">
            <img className="object-cover w-8 h-8 rounded-full" src="https://picsum.photos/100/100" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
