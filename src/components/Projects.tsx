'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'E-commerce Website',
    description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/images/project1.jpg',
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with Next.js and Tailwind CSS.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    image: '/images/project2.jpg',
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'A task management application with authentication and real-time updates.',
    tags: ['React', 'Firebase', 'Redux'],
    image: '/images/project3.jpg',
    link: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="section-title">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="h-48 relative">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-block px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;