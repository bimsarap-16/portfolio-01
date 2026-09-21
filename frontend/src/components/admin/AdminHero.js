import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // backend URL

const AdminHero = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // heroData will hold the "live" data from backend (incl. id)
  const [heroData, setHeroData] = useState(null);

  // editData is used only while editing
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    title: '',
    subtitle: '',
    ctaText: '',
    buttonTarget: 'projects',
  });

  // 🔹 1) Fetch hero from backend on mount
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await axios.get(`${API_BASE}/api/hero`);
        const apiHero = res.data || {};

        // Map backend → UI fields
        const uiHero = {
          id: apiHero._id || '',
          name: apiHero.name || '',
          title: apiHero.title || '',
          subtitle: apiHero.welcomeText || '',
          ctaText: apiHero.buttonText || '',
          buttonTarget: apiHero.buttonTarget || 'projects',
        };

        setHeroData(uiHero);
        setEditData(uiHero);
      } catch (err) {
        console.error('Error fetching hero:', err);
        setError('Failed to load hero data');
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  const handleEdit = () => {
    if (!heroData) return;
    setIsEditing(true);
    setEditData({ ...heroData });
  };

  // 🔹 2) Save changes to backend (PUT /api/hero/:id)
  const handleSave = async () => {
    if (!editData.id) {
      alert('No hero ID found – make sure a hero document exists in DB.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Map UI → backend fields
      const payload = {
        name: editData.name,
        title: editData.title,
        welcomeText: editData.subtitle,
        buttonText: editData.ctaText,
        buttonTarget: editData.buttonTarget,
      };

      const res = await axios.put(
        `${API_BASE}/api/hero/${editData.id}`,
        payload
      );

      const updated = res.data;

      const uiHero = {
        id: updated._id,
        name: updated.name || '',
        title: updated.title || '',
        subtitle: updated.welcomeText || '',
        ctaText: updated.buttonText || '',
        buttonTarget: updated.buttonTarget || 'projects',
      };

      setHeroData(uiHero);
      setEditData(uiHero);
      setIsEditing(false);
      alert('Hero section updated successfully!');
    } catch (err) {
      console.error('Error saving hero:', err);
      setError('Failed to save hero data');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (heroData) {
      setEditData({ ...heroData });
    }
  };

  // 🔹 3) Optional "reset" – you can decide what this should do.
  // For now only resets in UI (doesn't call backend).
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to reset hero section?')) {
      const reset = {
        ...editData,
        name: '',
        title: '',
        subtitle: '',
        ctaText: '',
      };
      setHeroData(reset);
      setEditData(reset);
      alert('Hero section reset locally! (Backend not changed)');
      // If you want to clear in DB too, you can call PUT here with empty values.
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading hero data...</p>
      </div>
    );
  }

  if (error && !heroData) {
    return (
      <div className="p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#316263]">Hero Section</h1>
          <p className="text-gray-600 mt-1">
            Manage your landing page content (connected to backend)
          </p>
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
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-60"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save'}
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

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}
          </p>
        )}

        {!isEditing ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-[#316263] font-medium tracking-widest uppercase">
              {heroData?.subtitle}
            </p>
            <h2 className="text-5xl font-bold text-[#316263]">
              {heroData?.name}
            </h2>
            <p className="text-xl text-gray-600">
              {heroData?.title}
            </p>
            <button className="px-8 py-3 bg-[#316263] text-white rounded-lg font-medium mt-4">
              {heroData?.ctaText}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle (welcomeText)
              </label>
              <input
                type="text"
                value={editData.subtitle}
                onChange={(e) =>
                  setEditData({ ...editData, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title/Description
              </label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text (CTA)
              </label>
              <input
                type="text"
                value={editData.ctaText}
                onChange={(e) =>
                  setEditData({ ...editData, ctaText: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Target (section id)
              </label>
              <input
                type="text"
                value={editData.buttonTarget}
                onChange={(e) =>
                  setEditData({ ...editData, buttonTarget: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                placeholder="projects"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHero;
