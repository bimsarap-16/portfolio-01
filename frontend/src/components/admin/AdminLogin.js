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
    <div className="px-4 min-h-screen bg-[#F0EEE9] justify-center flex items-center">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="p-8 bg-white rounded-2xl shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 bg-[#316263] w-16 h-16 rounded-full justify-center mx-auto flex items-center">
              <Lock className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-[#316263]">Admin Login</h2>
            <p className="mt-2 text-gray-600">Sign in to manage your portfolio</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 text-sm font-medium text-gray-700 block">
                Email
              </label>
              <div className="relative">
                <Mail className="top-1/2 text-gray-400 absolute left-3 transform -translate-y-1/2" size={20} />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="py-3 w-full border border-gray-300 rounded-lg pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#316263] focus:border-transparent"
                  placeholder="admin@portfolio.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="top-1/2 text-gray-400 absolute left-3 transform -translate-y-1/2" size={20} />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="py-3 w-full border border-gray-300 rounded-lg pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#316263] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-3 w-full bg-[#316263] text-white rounded-lg font-medium shadow-lg hover:bg-[#2a5556] transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="mb-1 text-sm text-gray-600 font-medium">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: admin@portfolio.com</p>
            <p className="text-xs text-gray-500">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;