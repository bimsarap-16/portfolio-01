import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';

const Projects = () => {
  const  [projects, setProjects] = useState([]);
    

  useEffect(() => {
      // Fetch contact methods from backend
      axios.get('http://localhost:5000/api/projects')
        .then(res => setProjects(res.data))
        .catch(err => console.error(err));
    }, []);



  return (
   <section 
      id="projects" 
      className="min-h-screen flex items-center justify-center py-20 bg-slate-50 dark:bg-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-5xl font-bold mb-4 text-center text-slate-800 dark:text-white">
          Projects
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-16">
          Some things I've built
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
/*<div className="grid md:grid-cols-2 gap-8">*/