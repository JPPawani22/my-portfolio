"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import styles from "../styles/AllProjects.module.scss";

const projectsData = [
  {
    id: 1,
    title: "BlogV - Modern Blogging Platform",
    description: "A full-stack blogging platform with rich text editing, user authentication, and real-time updates. Features include image uploads, and responsive design.",
    image: "/images/blogv.PNG",
    technologies: ["React", "Node.js", "MySQL", "Express", "Gemini API", "SCSS"],
    liveUrl: null,
    githubUrl: "https://github.com/JPPawani22/blogv",
    period: "Present",
    size: "large",
    category: "web app",
    animation: "fadeIn"
  },
  {
    id: 2,
    title: "SkillSync - Learning Management System",
    description: "An interactive Career Support AI platform with interview preparation, progress tracking, roadmap generation, and assessment tools. Featured VAPI voice assistant and Gemini generative API.",
    image: "/images/skillsync.PNG",
    technologies: ["Next.js", "TypeScript", "Gemini API", "Firebase", "Tailwind", "VAPI"],
    liveUrl: "https://ai-interviews-nhkx70r61-sahan-champathi-weerasinghes-projects.vercel.app/sign-in",
    githubUrl: "https://github.com/JPPawani22/AI_Interviews",
    period: "2025",
    size: "large",
    category: "web app",
    animation: "slideInLeft"
  },
  {
    id: 3,
    title: "HomeFlow - Home & Work Management App",
    description: "A comprehensive home management solution that helps users organize household tasks, manage tasks, and track spendings with an user friendly interface.",
    image: "/images/homeflow.PNG",
    technologies: ["Next.js", "Tailwind SCSS", "TypeScript", "MySQL", "Firebase"],
    liveUrl: null,
    githubUrl: "https://github.com/JPPawani22/homeflow",
    period: "Pending",
    size: "large",
    category: "web app",
    animation: "popUp"
  },
  {
    id: 4,
    title: "Servio - Apartment Management System",
    description: "A Flutter-based service application that connects users with apartments management system for various home services with real-time tracking and booking features.",
    image: "/images/servio.jpeg",
    technologies: ["Flutter", "Firebase", "Ballerina"],
    liveUrl: null,
    githubUrl: "https://github.com/JPPawani22/iwb179-balletsyntax",
    period: "2024",
    size: "large",
    category: "mobile",
    animation: "fadeIn"
  },
  {
    id: 5,
    title: "My Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my projects and skills with smooth animations and interactive elements.",
    image: "/images/portfolio.PNG",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/JPPawani22/my-portfolio",
    period: "Present",
    size: "large",
    category: "web",
    animation: "slideInRight"
  },
  {
    id: 6,
    title: "MPMA ERP Website",
    description: "An Enterprise Resource Management (ERP) website for MPMA government higher education institute with admin dashboard and management system.",
    image: "/images/mpma.jpeg",
    technologies: ["Springboot", "Angular", "Primeng", "PostgreSQL", "Git"],
    liveUrl: null,
    githubUrl: null,
    period: "Pending",
    size: "large",
    category: "web",
    animation: "popUp"
  },
];

export default function AllProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Initialize ref array
  useEffect(() => {
    projectRefs.current = Array(projectsData.length).fill(null);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add(styles.animate);
          } else {
            target.classList.remove(styles.animate);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={sectionRef} className={styles.allProjects}>
      <div className={styles.techBackground} aria-hidden="true">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={styles.techShape}
            style={{
              '--delay': `${i * 0.08}s`,
              '--size': `${Math.random() * 8 + 4}px`,
              '--left': `${Math.random() * 100}%`,
              '--top': `${Math.random() * 100}%`,
              '--opacity': `${Math.random() * 0.3 + 0.1}`,
              '--animation-duration': `${Math.random() * 24 + 16}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Project Portfolio</h1>
          <p className={styles.subtitle}>
            Explore my collection of work and personal projects
          </p>
        </div>

        {/* Carousel Section */}
        <div className={styles.carouselSection}>
          <h2 className={styles.carouselTitle}>Featured Projects</h2>
          
          <div className={styles.carouselContainer}>
            <div 
              ref={carouselRef}
              className={styles.carousel}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projectsData.map((project, index) => (
                <div 
                  key={project.id}
                  className={styles.carouselSlide}
                >
                  <div className={styles.carouselCard}>
                    <div className={styles.carouselImage}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <div className={styles.projectLinks}>
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              className={styles.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View live demo of ${project.title}`}
                            >
                              <ExternalLink size={20} />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              className={styles.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View source code for ${project.title}`}
                            >
                              <Github size={20} />
                              <span>Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.carouselContent}>
                      <div className={styles.projectPeriod}>{project.period}</div>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      
                      <div className={styles.technologies}>
                        {project.technologies.map((tech, i) => (
                          <span key={i} className={styles.techPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button 
              className={styles.carouselControl} 
              onClick={prevSlide}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className={styles.carouselControl} 
              onClick={nextSlide}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                projectRefs.current[index] = el;
              }}
              className={`${styles.projectCard} ${styles[project.size]} ${styles[project.animation]}`}
              style={{ 
                '--delay': `${index * 0.08}s`,
                '--index': index
              } as React.CSSProperties}
            >
              <div className={styles.cardContent}>
                <div className={styles.projectImage}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.projectLinks}>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          className={styles.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          className={styles.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code for ${project.title}`}
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={styles.projectPeriod}>{project.period}</div>
                </div>

                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.projectFooter}>
                    <div className={styles.technologies}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} className={styles.techPill}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={styles.projectCategory}>
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footerLinks}>
          <a 
            href="https://github.com/JPPawani22" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.exploreButton}
          >
            <Github size={14.4} /> Explore More on GitHub
          </a>
          
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={14.4} /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}