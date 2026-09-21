import React from 'react';

const ProjectCard = ({ project }) => {
   return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 transition-all duration-300 h-full overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Project Content */}
      <div className="p-8">
        <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
          {project.tech}
        </div>
        <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {project.desc}
        </p>
        
        {/* Project Links */}
        <div className="flex gap-4">
          <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            View Demo →
          </button>
          <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            Source Code
          </button>
        </div>
      </div>
    </div>
  );
  }; 

export default ProjectCard;