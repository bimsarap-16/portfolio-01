import React from 'react';
import { Home, User, Briefcase, Mail, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'hero', label: 'Hero Section', icon: User },
    { id: 'about', label: 'About/Skills', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="w-64 h-screen bg-[#316263] fixed left-0 top-0 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#2a5556]">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-sm text-gray-300 mt-1">Portfolio Manager</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeTab === item.id
                  ? 'bg-[#F0EEE9] text-[#316263]'
                  : 'text-gray-200 hover:bg-[#2a5556]'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#2a5556]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-red-600 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;