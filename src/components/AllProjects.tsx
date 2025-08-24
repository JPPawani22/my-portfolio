"use client"

import React, { useEffect, useRef } from "react";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "../styles/AllProjects.module.scss";

const projectsData = [
  {
    id: 1,
    title: "HomeFlow - Home & Work Management App",
    description: "A comprehensive home management solution that helps users organize household tasks, manage tasks, and track spendings with an user friendly interface.",
    image: "/images/homeflow.PNG",
    technologies: ["Next.js", "Tailwind SCSS", "TypeScript", "MySQL", "Firebase"],
    liveUrl: "https://homeflow-app.vercel.app/",
    githubUrl: "https://github.com/JPPawani22/homeflow",
    period: "Pending",
    size: "large",
    category: "web app",
    animation: "fadeIn"
  },
  {
    id: 2,
    title: "Servio - Apartment Management System",
    description: "A Flutter-based service service application that connects users with apartments management system for various home services with real-time tracking and booking features.",
    image: "/images/servio.jpeg",
    technologies: ["Flutter", "Firebase", "Ballerina"],
    liveUrl: null, // No live demo available
    githubUrl: "https://github.com/JPPawani22/iwb179-balletsyntax",
    period: "2024",
    size: "large",
    category: "mobile",
    animation: "slideInLeft"
  },
  {
    id: 3,
    title: "My Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my projects and skills with smooth animations and interactive elements.",
    image: "/images/portfolio.PNG",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#", // Current website
    githubUrl: "https://github.com/JPPawani22/my-portfolio",
    period: "Present",
    size: "large",
    category: "web",
    animation: "popUp"
  },
  {
    id: 4,
    title: "MPMA ERP Website",
    description: "An Enterprise Resourse Management(ERP) website for MPMA government higher education institute with admin dashboard and management system. - Second Year Software Project",
    image: "/images/mpma.jpeg",
    technologies: ["Springboot", "Angular", "Primeng", "PostgreSQL"],
    liveUrl: null,
    githubUrl: null, // Private repository
    period: "Pending",
    size: "large",
    category: "web",
    animation: "fadeIn"
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