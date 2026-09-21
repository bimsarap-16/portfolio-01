import React from 'react';
import { Eye, Users, Briefcase, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      label: 'Total Views', 
      value: '12,543', 
      change: '+12.5%',
      icon: Eye,
      color: 'bg-blue-500'
    },
    { 
      label: 'Total Visitors', 
      value: '3,842', 
      change: '+8.2%',
      icon: Users,
      color: 'bg-green-500'
    },
    { 
      label: 'Projects', 
      value: '24', 
      change: '+3',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    { 
      label: 'Messages', 
      value: '156', 
      change: '+23',
      icon: Mail,
      color: 'bg-orange-500'
    },
  ];

  const recentActivities = [
    { action: 'Project "E-Commerce" was updated', time: '2 hours ago' },
    { action: 'New contact message received', time: '5 hours ago' },
    { action: 'Skills section was edited', time: '1 day ago' },
    { action: 'Hero section image changed', time: '2 days ago' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#316263] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#316263] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-[#316263] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <p className="text-gray-700">{activity.action}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <button className="bg-[#316263] text-white p-6 rounded-xl hover:bg-[#2a5556] transition-all">
          <h3 className="font-bold mb-2">Add New Project</h3>
          <p className="text-sm text-gray-200">Showcase your latest work</p>
        </button>
        <button className="bg-[#316263] text-white p-6 rounded-xl hover:bg-[#2a5556] transition-all">
          <h3 className="font-bold mb-2">Update Skills</h3>
          <p className="text-sm text-gray-200">Keep your expertise current</p>
        </button>
        <button className="bg-[#316263] text-white p-6 rounded-xl hover:bg-[#2a5556] transition-all">
          <h3 className="font-bold mb-2">Edit Hero Section</h3>
          <p className="text-sm text-gray-200">Update your introduction</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;