"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code, Layout, Cpu, Database } from "lucide-react"
import Link from "next/link"
import styles from "../styles/Projects.module.scss"

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/images/project1.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    period: "2023 - Present",
    type: "fullstack"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/project2.jpg",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    period: "2022 - 2023",
    type: "fullstack"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather application that provides detailed weather information with beautiful visualizations and forecasts.",
    image: "/images/project3.jpg",
    technologies: ["React", "Chart.js", "Weather API", "CSS3"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    period: "2021 - 2022",
    type: "frontend"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.",
    image: "/images/project2.jpg",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    period: "2020 - 2021",
    type: "frontend"
  },
]

const statsData = {
  totalProjects: 12,
  uiUxDesigns: 8,
  frontendProjects: 7,
  fullstackProjects: 5,
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
    // Initial delay for the first animation
    setTimeout(() => {
      setIsAnimating(true)
      
      intervalRef.current = setInterval(() => {
        // Start fade out animation
        setIsAnimating(false)
        
        // After fade out completes, change project and start new animation
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % projectsData.length)
          setIsAnimating(true)
        }, 300) // Fade out duration
      }, 7000) // Total time per slide (3s zoom in + 4s visible)
    }, 50)
  }

  const stopAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const currentProject = projectsData[currentIndex]

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.techBackground} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.techShape} style={{
            '--delay': `${i * 0.1}s`,
            '--size': `${Math.random() * 10 + 5}px`,
            '--left': `${Math.random() * 100}%`,
            '--top': `${Math.random() * 100}%`,
            '--opacity': `${Math.random() * 0.5 + 0.1}`,
            '--animation-duration': `${Math.random() * 20 + 10}s`
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
                    {currentProject.featured && (
                      <div className={styles.featuredBadge}>Featured</div>
                    )}
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
                  <Code size={24} />
                </div>
                <div className={styles.statValue}>{statsData.totalProjects}+</div>
                <div className={styles.statLabel}>Total Projects</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'uiux' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('uiux')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Layout size={24} />
                </div>
                <div className={styles.statValue}>{statsData.uiUxDesigns}</div>
                <div className={styles.statLabel}>UI/UX Designs</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'frontend' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('frontend')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Cpu size={24} />
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
                  <Database size={24} />
                </div>
                <div className={styles.statValue}>{statsData.fullstackProjects}</div>
                <div className={styles.statLabel}>Fullstack</div>
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