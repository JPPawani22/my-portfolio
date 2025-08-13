"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
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
    period: "2023 - Present"
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
    period: "2022 - 2023"
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
    period: "2021 - 2022"
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
    period: "2020 - 2021"
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

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
    intervalRef.current = setInterval(() => {
      handleNext()
    }, 5000)
  }

  const stopAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleTransition = () => {
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleNext = () => {
    handleTransition()
    setCurrentIndex(prev => (prev + 1) % projectsData.length)
    stopAutoRotate()
    startAutoRotate()
  }

  const handlePrev = () => {
    handleTransition()
    setCurrentIndex(prev => (prev - 1 + projectsData.length) % projectsData.length)
    stopAutoRotate()
    startAutoRotate()
  }

  const goToSlide = (index: number) => {
    handleTransition()
    setCurrentIndex(index)
    stopAutoRotate()
    startAutoRotate()
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

        <div className={styles.slideshowContainer}>
          <button 
            className={styles.navButton} 
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <ChevronLeft size={32} />
          </button>

          <div className={`${styles.slide} ${isTransitioning ? styles.transitioning : ''}`}>
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

              <div className={styles.slideInfo}>
                <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                <p className={styles.projectDescription}>{currentProject.description}</p>
                
                <div className={styles.technologies}>
                  {currentProject.technologies.map((tech, index) => (
                    <span key={index} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  <a 
                    href={currentProject.liveUrl} 
                    className={styles.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a 
                    href={currentProject.githubUrl} 
                    className={styles.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} /> View Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          <button 
            className={styles.navButton} 
            onClick={handleNext}
            aria-label="Next project"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className={styles.slideshowIndicators}>
          {projectsData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Link href="/all-projects" className={styles.viewAllButton}>
          View Full Portfolio
        </Link>
      </div>
    </section>
  )
}