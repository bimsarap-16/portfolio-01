import React, { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';

const AdminContact = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState({
    email: 'your@email.com',
    github: '@yourusername',
    linkedin: 'Your Name',
    emailLink: 'mailto:your@email.com',
    githubLink: 'https://github.com/yourusername',
    linkedinLink: 'https://linkedin.com/in/yourname'
  });




  

  const [editData, setEditData] = useState({ ...contactData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...contactData });
  };

  const handleSave = () => {
    setContactData({ ...editData });
    setIsEditing(false);
    alert('Contact information updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...contactData });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to reset contact information?')) {
      setContactData({
        email: '',
        github: '',
        linkedin: '',
        emailLink: '',
        githubLink: '',
        linkedinLink: ''
      });
      alert('Contact information reset!');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#316263]">Contact Information</h1>
          <p className="text-gray-600 mt-1">Manage your contact details</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#316263] text-white rounded-lg hover:bg-[#2a5556] transition-all"
              >
                <Edit2 size={18} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                <Trash2 size={18} />
                Reset
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                <X size={18} />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#316263] p-3 rounded-lg">
              <span className="text-2xl">📧</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#316263]">Email</h3>
              {!isEditing ? (
                <p className="text-gray-600">{contactData.email}</p>
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                  <input
                    type="text"
                    placeholder="mailto: link"
                    value={editData.emailLink}
                    onChange={(e) => setEditData({ ...editData, emailLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GitHub */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#316263] p-3 rounded-lg">
              <span className="text-2xl">💻</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#316263]">GitHub</h3>
              {!isEditing ? (
                <p className="text-gray-600">{contactData.github}</p>
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    type="text"
                    placeholder="GitHub username"
                    value={editData.github}
                    onChange={(e) => setEditData({ ...editData, github: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                  <input
                    type="text"
                    placeholder="GitHub profile URL"
                    value={editData.githubLink}
                    onChange={(e) => setEditData({ ...editData, githubLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#316263] p-3 rounded-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#316263]">LinkedIn</h3>
              {!isEditing ? (
                <p className="text-gray-600">{contactData.linkedin}</p>
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    type="text"
                    placeholder="LinkedIn name"
                    value={editData.linkedin}
                    onChange={(e) => setEditData({ ...editData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn profile URL"
                    value={editData.linkedinLink}
                    onChange={(e) => setEditData({ ...editData, linkedinLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;