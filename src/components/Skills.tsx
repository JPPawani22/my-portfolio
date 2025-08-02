'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'React', level: 80 },
  { name: 'Next.js', level: 75 },
  { name: 'Node.js', level: 70 },
  { name: 'Python', level: 65 },
  { name: 'Java', level: 60 },
  { name: 'SQL', level: 70 },
  { name: 'Git', level: 80 },
  { name: 'Tailwind CSS', level: 85 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="section-title">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">{skill.name}</h3>
                <span className="text-sm text-primary-light dark:text-primary-dark">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;