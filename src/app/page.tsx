'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/Hero';
import AboutSection from '@/components/About';
import ProjectsSection from '@/components/Projects';
import SkillsSection from '@/components/Skills';
import ContactSection from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check user preference for dark mode
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Portfolio of an IT Undergraduate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              My Portfolio
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </nav>

          {/* Sections */}
          <HeroSection/>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}