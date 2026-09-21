import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Contact = () => {
  const [contactMethods, setContactMethods] = useState([]);

useEffect(() => {
    // Fetch contact methods from backend
    axios.get('http://localhost:5000/api/contacts')
      .then(res => setContactMethods(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
   <section 
      id="contact" 
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 dark:from-slate-900 dark:via-indigo-950/30 dark:to-blue-950/30"
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4 text-slate-800 dark:text-white">
          Let's Connect
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-12">
          I'm always open to discussing new projects, creative ideas, or opportunities.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {contactMethods.map((method, idx) => (
            <a 
              key={idx}
              href={method.link} 
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 py-8 rounded-xl hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{method.icon}</div>
              <div className="font-semibold text-slate-800 dark:text-white">{method.label}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{method.info}</div>
            </a>
          ))}
        </div>

        <div className="text-sm text-slate-400 dark:text-slate-500 mt-12">
          © 2024 Portfolio. Built with React & Tailwind CSS
        </div>
      </div>
    </section>
  );
};

export default Contact;