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
    
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-4 text-indigo-600 dark:text-indigo-400 text-sm tracking-widest uppercase font-medium">
          {data.welcomeText}
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-slate-800 dark:text-white">
          {data.name}
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
          {data.title}
        </p>
        <button 
          onClick={() => scrollToSection(data.buttonTarget)}
          className="px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-600/30 dark:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
        >
          {data.buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
