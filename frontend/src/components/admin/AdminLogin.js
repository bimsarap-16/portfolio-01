import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (replace with actual authentication)
    if (credentials.email === 'admin@portfolio.com' && credentials.password === 'admin123') {
      onLogin();
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EEE9] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-[#316263] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-[#316263]">Admin Login</h2>
            <p className="text-gray-600 mt-2">Sign in to manage your portfolio</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263] focus:border-transparent"
                  placeholder="admin@portfolio.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#316263] text-white py-3 rounded-lg font-medium hover:bg-[#2a5556] transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: admin@portfolio.com</p>
            <p className="text-xs text-gray-500">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;