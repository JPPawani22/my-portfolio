'use client';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 rounded-lg my-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          About <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
              {/* Replace with your image */}
              <span className="text-4xl">👨‍🎓</span>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm an IT undergraduate with a passion for web development, software engineering, 
              and all things tech. Currently pursuing my degree at [Your University].
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My journey in technology began when I was [describe how you got started]. 
              Since then, I've been constantly learning and building projects to expand my skills.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me [your hobbies/interests].
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default About;