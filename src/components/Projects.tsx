"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code, Layout, Cpu, Database, ArrowLeft } from "lucide-react"
import Link from "next/link"
import styles from "../styles/Projects.module.scss"

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
    type: "fullstack"
  },
  {
    id: 2,
    title: "Servio - Apartment Management System",
    description: "A Flutter-based service service application that connects users with apartments management system for various home services with real-time tracking and booking features.",
    image: "/images/servio.jpeg",
    technologies: ["Flutter", "Firebase", "Ballerina"],
    liveUrl: null,
    githubUrl: "https://github.com/JPPawani22/iwb179-balletsyntax",
    period: "2024",
    type: "mobile"
  },
  {
    id: 3,
    title: "My Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my projects and skills with smooth animations and interactive elements.",
    image: "/images/portfolio.PNG",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/JPPawani22/my-portfolio",
    period: "Present",
    type: "frontend"
  },
  {
    id: 4,
    title: "MPMA ERP Website",
    description: "An Enterprise Resourse Management(ERP) website for MPMA government higher education institute with admin dashboard and management system. - Second Year Software Project",
    image: "/images/mpma.jpeg",
    technologies: ["Springboot", "Angular", "Primeng", "PostgreSQL"],
    liveUrl: null,
    githubUrl: null,
    period: "Pending",
    type: "fullstack"
  }
]

const statsData = {
  totalProjects: 4,
  frontendProjects: 1,
  fullstackProjects: 2,
  mobileProjects: 1
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const [activeStat, setActiveStat] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          startAutoRotate()
        } else {
          setIsVisible(false)
          stopAutoRotate()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      stopAutoRotate()
    }
  }, [])

  const startAutoRotate = () => {
    setIsAnimating(true)
    
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Start the slideshow immediately
    intervalRef.current = setInterval(() => {
      // Start fade out animation
      setIsAnimating(false)
      
      // After fade out completes, change project and start new animation
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % projectsData.length)
        setIsAnimating(true)
      }, 300) // Fade out duration
    }, 4000) // Reduced from 7000ms to 4000ms for faster transitions
  }

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Start the slideshow immediately when component mounts
  useEffect(() => {
    startAutoRotate()
    
    return () => {
      stopAutoRotate()
    }
  }, [])

  const currentProject = projectsData[currentIndex]

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.techBackground} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.techShape} style={{
            '--delay': `${i * 0.1}s`,
            '--size': `${Math.random() * 7 + 3.5}px`, // Reduced size by ~30%
            '--left': `${Math.random() * 100}%`,
            '--top': `${Math.random() * 100}%`,
            '--opacity': `${Math.random() * 0.5 + 0.1}`,
            '--animation-duration': `${Math.random() * 14 + 7}s` // Reduced duration by ~30%
          } as React.CSSProperties} />
        ))}
      </div>
      
      <div className={`${styles.projectsContainer} ${isVisible ? styles.visible : ''}`}>
        <h2 className={styles.sectionTitle}>Project Highlights</h2>
        <p className={styles.sectionDescription}>
          A curated selection of my work. Explore more in the <Link href="/all-projects" className={styles.viewAllLink}>full portfolio</Link>.
        </p>

        <div className={styles.columnsContainer}>
          {/* Left Column - Project Showcase (2/3 width) */}
          <div className={styles.projectShowcase}>
            <div className={styles.slideshowContainer}>
              <div 
                className={`${styles.slide} ${isAnimating ? styles.animating : ''}`}
                onClick={() => window.open(`/all-projects#project-${currentProject.id}`, '_blank')}
              >
                <div className={styles.slideContent}>
                  <div className={styles.slideImage}>
                    <img 
                      src={currentProject.image} 
                      alt={currentProject.title} 
                      className={styles.projectImage}
                    />
                    <div className={styles.projectPeriod}>{currentProject.period}</div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                    <p className={styles.projectDescription}>{currentProject.description}</p>
                    <div className={styles.technologies}>
                      {currentProject.technologies.map((tech, index) => (
                        <span key={index} className={styles.techPill}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.slideshowIndicators}>
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => {
                    setIsAnimating(false)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setIsAnimating(true)
                    }, 300)
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Statistics (1/2 width) */}
          <div className={styles.statsColumn}>
            
            <div className={styles.statsGrid}>
              <div 
                className={`${styles.statCard} ${activeStat === 'total' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('total')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Code size={20} /> {/* Reduced icon size by ~17% */}
                </div>
                <div className={styles.statValue}>{statsData.totalProjects}+</div>
                <div className={styles.statLabel}>Total Projects</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'frontend' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('frontend')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Cpu size={20} /> {/* Reduced icon size by ~17% */}
                </div>
                <div className={styles.statValue}>{statsData.frontendProjects}</div>
                <div className={styles.statLabel}>Frontend</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'fullstack' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('fullstack')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Database size={20} /> {/* Reduced icon size by ~17% */}
                </div>
                <div className={styles.statValue}>{statsData.fullstackProjects}</div>
                <div className={styles.statLabel}>Fullstack</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'mobile' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('mobile')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Layout size={20} /> {/* Reduced icon size by ~17% */}
                </div>
                <div className={styles.statValue}>{statsData.mobileProjects}</div>
                <div className={styles.statLabel}>Mobile</div>
              </div>
            </div>

            <Link href="/all-projects" className={styles.viewAllButton}>
              View Full Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}