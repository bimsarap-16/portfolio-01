import React, { useEffect, useState } from 'react';
 import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
 import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './AdminPanel';






import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './ThemeContext';

import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contacts from './components/Contacts';
import Projects from './components/Projects';

function Portfolio() {

  const [projects, setProjects] = useState([]);

  

  
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",   // smoother than "start"
    inline: "nearest"
  });
};




  useEffect(() => {
    // This connects to your Node.js backend
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  

 
  return (
      <>
     <ThemeToggle />
     <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        
     
     <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
       <About/>
      <Projects  />
      <Contacts/>
    
    </div>
    </>
    
    
   
  );
}

// Admin Route Component
function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}

function App() {
  return (
    

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
   
  );
 }

export default App;
