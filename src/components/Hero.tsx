'use client';
const Hero = () => {
  return (
    <section id="home" className="py-20">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">Your Name</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
            IT Undergraduate
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Passionate about technology and building innovative solutions.
          </p>
          <div className="flex space-x-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-300"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-md transition duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
            {/* Replace with your image or icon */}
            <span className="text-6xl">👨‍💻</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;