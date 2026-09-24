import React from 'react';

const ProjectCard = ({ project }) => {
   return (
    <div className=" bg-white rounded-2xl border border-slate-200 overflow-hidden group dark:bg-slate-900 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 transition-all duration-300">
      {/* Project Image */}
      <div className="h-24 overflow-hidden bg-slate-100 relative dark:bg-slate-800">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Project Content */}
      <div className="p-4">
        <div className="mb-1 text-sm text-indigo-600 font-medium dark:text-indigo-400">
          {project.technologies?.join(' • ')}
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-3 text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.description}
        </p>
        
        {/* Project Links */}
        <div className="gap-4 flex">
          <button className="text-sm text-indigo-600 font-medium dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
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