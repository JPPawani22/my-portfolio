"use client"

import React, { useEffect, useRef } from "react";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "../styles/AllProjects.module.scss";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/images/project1.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2023 - Present",
    size: "large",
    category: "web",
    animation: "fadeIn"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/project2.jpg",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2022 - 2023",
    size: "medium",
    category: "mobile",
    animation: "slideInLeft"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather application that provides detailed weather information with beautiful visualizations and forecasts.",
    image: "/images/project3.jpg",
    technologies: ["React", "Chart.js", "Weather API", "CSS3"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2021 - 2022",
    size: "small",
    category: "web",
    animation: "popUp"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.",
    image: "/images/project2.jpg",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2020 - 2021",
    size: "medium",
    category: "web",
    animation: "fadeIn"
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics with customizable widgets and real-time data updates.",
    image: "/images/project1.jpg",
    technologies: ["React", "D3.js", "Firebase", "Material UI"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2021 - 2022",
    size: "small",
    category: "analytics",
    animation: "slideInRight"
  },
  {
    id: 6,
    title: "Recipe Finder App",
    description: "Mobile-first application for discovering recipes based on ingredients with nutritional information and meal planning.",
    image: "/images/project3.jpg",
    technologies: ["React Native", "Redux", "Spoonacular API", "Expo"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2022 - 2023",
    size: "large",
    category: "mobile",
    animation: "popUp"
  },
  {
    id: 7,
    title: "AI Content Generator",
    description: "An AI-powered tool that generates marketing content based on user prompts with customizable tone and style.",
    image: "/images/project1.jpg",
    technologies: ["Python", "GPT-3", "Flask", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2023 - Present",
    size: "medium",
    category: "ai",
    animation: "fadeIn"
  },
  {
    id: 8,
    title: "Fitness Tracker",
    description: "Comprehensive fitness tracking application with workout logging, progress visualization, and community features.",
    image: "/images/project2.jpg",
    technologies: ["React Native", "Firebase", "Recharts", "Google Fit API"],
    liveUrl: "#",
    githubUrl: "#",
    period: "2021 - 2022",
    size: "medium",
    category: "mobile",
    animation: "slideInLeft"
  },
];

export default function AllProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        rootMargin: "0px 0px -100px 0px"
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

  return (
    <section ref={sectionRef} className={styles.allProjects}>
      <div className={styles.techBackground} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={styles.techShape}
            style={{
              '--delay': `${i * 0.1}s`,
              '--size': `${Math.random() * 10 + 5}px`,
              '--left': `${Math.random() * 100}%`,
              '--top': `${Math.random() * 100}%`,
              '--opacity': `${Math.random() * 0.3 + 0.1}`,
              '--animation-duration': `${Math.random() * 30 + 20}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Project Portfolio</h1>
          <p className={styles.subtitle}>
            Explore my collection of work. Each project has its own unique entrance animation.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                projectRefs.current[index] = el;
              }}
              className={`${styles.projectCard} ${styles[project.size]} ${styles[project.animation]}`}
              style={{ 
                '--delay': `${index * 0.1}s`,
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
                      <a 
                        href={project.liveUrl} 
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a 
                        href={project.githubUrl} 
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <Github size={20} />
                      </a>
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

        <div className={styles.backLink}>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}