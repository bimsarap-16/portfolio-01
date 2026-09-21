import React from 'react';

const TestDark = () => {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Dark Mode Test
        </h1>
        <button 
          onClick={toggleDark}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
        >
          Toggle Dark
        </button>
      </div>
    </div>
  );
};

export default TestDark;