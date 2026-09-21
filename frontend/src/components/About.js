import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch contact methods from backend
    axios
      .get("http://localhost:5000/api/skills")
      .then((res) => {
        const uiSkills = res.data.map((skill) => ({
          name: skill.name,
          level: Number(skill.precentage) || 0,
        }));

        setSkills(uiSkills);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-5xl font-bold mb-4 text-center text-slate-800 dark:text-white">
          About Me
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto">
          I'm a passionate Full Stack Developer with expertise in building
          modern web applications. I love creating clean, efficient, and
          user-friendly solutions.
        </p>

        <h3 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white mt-12">
          My Skills
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <p className="font-bold text-lg mb-3 text-slate-800 dark:text-white">
                  {skill.name}
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
