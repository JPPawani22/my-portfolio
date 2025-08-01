'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'Project 1',
    description: 'A web application built with React and Node.js that solves problem X.',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Project 2',
    description: 'A mobile app developed with Flutter that helps users do Y.',
    tags: ['Flutter', 'Firebase'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Project 3',
    description: 'A full-stack application with authentication and real-time features.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 rounded-lg my-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          My <span className="text-primary-600 dark:text-primary-400">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.githubLink}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;