import React, { useState } from 'react';
import AdminSidebar from './components/admin/AdminSidebar';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminHero from './components/admin/AdminHero';
import AdminAbout from './components/admin/AdminAbout';
import AdminProjects from './components/admin/AdminProjects';
import AdminContact from './components/admin/AdminContact';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Handle logout logic here
      alert('Logged out successfully!');
      // Redirect to login page or home
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AdminDashboard />;
      case 'hero':
        return <AdminHero />;
      case 'about':
        return <AdminAbout />;
      case 'projects':
        return <AdminProjects />;
      case 'contact':
        return <AdminContact />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EEE9]">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="ml-64">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;