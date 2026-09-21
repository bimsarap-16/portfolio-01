import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000"; // backend URL

const AdminAbout = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({
    description:
      "I'm a passionate Full Stack Developer with expertise in building modern web applications. I love creating clean, efficient, and user-friendly solutions.",
    skills: [],
  });

  // loading + error for fetch
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // edit copy
  const [editData, setEditData] = useState({ ...aboutData });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE}/api/skills`);
        const apiSkills = res.data || [];

        // Map backend → UI fields
        const uiSkills = apiSkills.map((skill) => ({
          id: skill._id || "",
          name: skill.name || "",
          // backend field is "precentage" (string), convert to number
          level: Number(skill.precentage) || 0,
        }));

        const initial = {
          description:
            "I'm a passionate Full Stack Developer with expertise in building modern web applications. I love creating clean, efficient, and user-friendly solutions.",
          skills: uiSkills,
        };

        setAboutData(initial);
        setEditData(initial);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills data");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      ...aboutData,
      skills: [...aboutData.skills], // copy array so we can edit safely
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      // 1) find deleted skills (present in aboutData, missing in editData)
      const updatedIds = new Set(
        (editData.skills || [])
          .filter((s) => s.id) // only skills that already exist in DB
          .map((s) => s.id),
      );

      const deletedSkills = (aboutData.skills || []).filter(
        (s) => s.id && !updatedIds.has(s.id),
      );

      // 2) save new + updated skills
      const savePromises = (editData.skills || []).map((skill) => {
        const payload = {
          name: skill.name,
          precentage: String(skill.level), // matches backend field
        };

        if (skill.id) {
          // existing -> UPDATE
          return axios.put(`${API_BASE}/api/skills/${skill.id}`, payload);
        } else {
          // new -> CREATE
          return axios.post(`${API_BASE}/api/skills`, payload);
        }
      });

      // 3) delete removed skills
      const deletePromises = deletedSkills.map((skill) =>
        axios.delete(`${API_BASE}/api/skills/${skill.id}`),
      );

      await Promise.all([...savePromises, ...deletePromises]);

      // 4) refetch from backend to be 100% accurate
      const res = await axios.get(`${API_BASE}/api/skills`);
      const apiSkills = res.data || [];
      const uiSkills = apiSkills.map((skill) => ({
        id: skill._id || "",
        name: skill.name || "",
        level: Number(skill.precentage) || 0,
      }));

      const newAbout = {
        ...editData,
        skills: uiSkills,
      };

      setAboutData(newAbout);
      setEditData(newAbout);
      setIsEditing(false);
      alert("About section updated successfully!");
    } catch (err) {
      console.error("Error saving skills:", err);
      setError("Failed to save skills");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...aboutData });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to reset about section?")) {
      setAboutData({
        description: "",
        skills: [],
      });
      alert("About section reset!");
    }
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...editData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setEditData({ ...editData, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = editData.skills.filter((_, i) => i !== index);
    setEditData({ ...editData, skills: newSkills });
  };

  const addSkill = () => {
    setEditData({
      ...editData,
      skills: [...editData.skills, { name: "", level: 50 }],
    });
  };

  // simple loading / error handling
  if (loading) {
    return <div className="p-8">Loading skills...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#316263]">About & Skills</h1>
          <p className="text-gray-600 mt-1">Manage your bio and skills</p>
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#316263] mb-4">
            About Description
          </h3>
          {!isEditing ? (
            <p className="text-gray-700">{aboutData.description}</p>
          ) : (
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
            />
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#316263]">Skills</h3>
            {isEditing && (
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-[#316263] text-white rounded-lg hover:bg-[#2a5556] transition-all text-sm"
              >
                + Add Skill
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isEditing ? editData.skills : aboutData.skills).map(
              (skill, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  {!isEditing ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#316263] h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) =>
                            updateSkill(idx, "name", e.target.value)
                          }
                          placeholder="Skill name"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                        />
                        <button
                          onClick={() => removeSkill(idx)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) =>
                            updateSkill(idx, "level", parseInt(e.target.value))
                          }
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12 text-center">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
