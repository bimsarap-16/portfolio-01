import React, { useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    tech: "",
    desc: "",
    image: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditData({ ...project });
  };

  const handleSave = (id) => {
    setProjects(projects.map((p) => (p.id === id ? editData : p)));
    setEditingId(null);
    alert("Project updated successfully!");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
      alert("Project deleted!");
    }
  };

  const handleAdd = () => {
    if (!newProject.title || !newProject.tech || !newProject.desc) {
      alert("Please fill all fields!");
      return;
    }
    const project = {
      id: Date.now(),
      ...newProject,
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", tech: "", desc: "", image: "" });
    setShowAddForm(false);
    alert("Project added successfully!");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#316263]">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#316263] text-white rounded-lg hover:bg-[#2a5556] transition-all"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#316263]">
              Add New Project
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technology Stack
              </label>
              <input
                type="text"
                value={newProject.tech}
                onChange={(e) =>
                  setNewProject({ ...newProject, tech: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newProject.desc}
                onChange={(e) =>
                  setNewProject({ ...newProject, desc: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={newProject.image}
                onChange={(e) =>
                  setNewProject({ ...newProject, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
              />
            </div>
            <button
              onClick={handleAdd}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Add Project
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            {editingId === project.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#316263]">
                    Edit Project
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(project.id)}
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
                  </div>
                </div>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                />
                <input
                  type="text"
                  value={editData.tech}
                  onChange={(e) =>
                    setEditData({ ...editData, tech: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                />
                <textarea
                  value={editData.desc}
                  onChange={(e) =>
                    setEditData({ ...editData, desc: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                />
                <input
                  type="text"
                  value={editData.image}
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#316263]"
                />
              </div>
            ) : (
              <div className="flex gap-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#316263] mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {project.tech}
                      </p>
                      <p className="text-gray-700">{project.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 bg-[#316263] text-white rounded-lg hover:bg-[#2a5556] transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
