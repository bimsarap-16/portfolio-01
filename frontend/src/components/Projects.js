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
      className="py-16 bg-slate-50 dark:bg-slate-800"
    >
      <div className="px-6 max-w-6xl mx-auto w-full">
        <h2 className="mb-4 text-5xl font-bold text-center text-slate-800 dark:text-white">
          Projects
        </h2>
        <p className="mb-6 text-slate-500 text-center dark:text-slate-400">
          Some things I've built
        </p>
        
        <div className="grid md:grid-cols-4 gap-8">
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