import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // change in production if needed

const Hero = ({ scrollToSection }) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/hero`);
        console.log('Hero from backend:', res.data);
        setHero(res.data);
      } catch (err) {
        console.error('Error fetching hero data:', err);
      }
    };

    fetchHero();
  }, []);

  // If no hero data from backend yet, use default
  const data = hero || {
      welcomeText: 'Welcome',
      name: 'Your Name',
      title: 'Full Stack Developer',
      buttonText: 'View My Work',
      buttonTarget: 'projects'
  };

  return (
    <section 
      id="home" 
      className="min-h-screen justify-center overflow-hidden bg-gradient-to-br flex items-center relative from-white via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="top-1/4 w-96 h-96 bg-indigo-200/30 rounded-full absolute right-1/4 dark:bg-indigo-500/20 blur-3xl animate-pulse" />
        <div className="bottom-1/3 w-80 h-80 bg-blue-200/30 rounded-full absolute left-1/3 dark:bg-blue-500/20 blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="px-4 z-10 text-center relative">
        <div className="mb-4 text-indigo-600 text-sm font-medium dark:text-indigo-400 tracking-widest uppercase">
          {data.welcomeText}
        </div>
        <h1 className="mb-6 text-4xl font-bold text-slate-800 md:text-5xl dark:text-white">
          {data.name}
        </h1>
        <p className="mb-8 text-1xl text-slate-600 md:text-1xl dark:text-slate-300">
          {data.title}
        </p>
        <button 
          onClick={() => scrollToSection(data.buttonTarget)}
          
          className="px-4 py-1 text-white rounded-lg font-medium shadow-lg shadow-indigo-600/30 textbg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 dark:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs">{data.buttonText}</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
