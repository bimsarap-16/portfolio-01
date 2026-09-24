import React from "react";

export default function Navbar({ activeSection, scrolled, scrollToSection }) {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-3"
      }`}
    >
      <div className="px-6 max-w-7xl mx-auto">
        <div className="justify-between flex items-center">
          <div className="text-1.5xl font-bold text-slate-800 dark:text-white">
            Portfolio
          </div>
          <div className="gap-8 flex">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative group"
              >
                <span
                  className={`text-sm font-medium transition-colors ${
                    activeSection === id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left transition-transform ${
                    activeSection === id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
            <div className="flex items-center"></div>
            <button></button>
          </div>
        </div>
      </div>
    </nav>
  );
}
