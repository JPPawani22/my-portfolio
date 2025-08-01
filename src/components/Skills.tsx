'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS/Tailwind', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'React', level: 80 },
  { name: 'Next.js', level: 75 },
  { name: 'Node.js', level: 70 },
  { name: 'Python', level: 65 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          My <span className="text-primary-600 dark:text-primary-400">Skills</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;