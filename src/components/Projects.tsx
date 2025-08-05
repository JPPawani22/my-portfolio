"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import styles from "../styles/Projects.module.scss"

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "../images/project1.jpg?height=300&width=400",
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
    image: "../images/project2.jpg?height=300&width=400",
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
    image: "../images/project3.jpg?height=300&width=400",
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
    image: "../images/project2.jpg?height=300&width=400",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    period: "2020 - 2021"
  },
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredProjects = 
    filter === "all"
      ? projectsData
      : filter === "featured"
        ? projectsData.filter((project) => project.featured)
        : projectsData.filter((project) => !project.featured)

  const getVisibleProjects = () => {
    if (isMobile) {
      // For mobile, show only one project at a time
      return [filteredProjects[currentIndex % filteredProjects.length]]
    } else {
      // For desktop, show 3 projects at a time with wrapping
      const visible = filteredProjects.slice(currentIndex, currentIndex + 3)
      if (visible.length < 3 && filteredProjects.length > 3) {
        visible.push(...filteredProjects.slice(0, 3 - visible.length))
      }
      return visible
    }
  }

  const visibleProjects = getVisibleProjects()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoRotate, filteredProjects.length, isMobile])

  const handleTransition = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const handleNext = () => {
    handleTransition()
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
    setAutoRotate(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handlePrev = () => {
    handleTransition()
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
    setAutoRotate(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const goToProject = (index: number) => {
    handleTransition()
    setCurrentIndex(index)
    setAutoRotate(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.projectsContainer}>
        <div className={`${styles.projectsContent} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionDescription}>
            Here are some of my recent projects that showcase my skills and passion for development
          </p>

          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
              onClick={() => {
                setFilter("all")
                setCurrentIndex(0)
                setAutoRotate(true)
                handleTransition()
              }}
            >
              All Projects
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "featured" ? styles.active : ""}`}
              onClick={() => {
                setFilter("featured")
                setCurrentIndex(0)
                setAutoRotate(true)
                handleTransition()
              }}
            >
              Featured
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "other" ? styles.active : ""}`}
              onClick={() => {
                setFilter("other")
                setCurrentIndex(0)
                setAutoRotate(true)
                handleTransition()
              }}
            >
              Other
            </button>
          </div>

          <div className={styles.projectsCarousel}>
            <button className={styles.carouselArrow} onClick={handlePrev} aria-label="Previous project">
              <ChevronLeft size={32} />
            </button>

            <div ref={gridRef}
              className={styles.projectsGrid}
              style={{
                overflow: isTransitioning ? 'hidden' : 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              } as React.CSSProperties}
            >
              {visibleProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className={`${styles.projectCard} ${project.featured ? styles.featured : ""}`}
                  style={{
                    '--animation-delay': `${index * 0.2}s`,
                    '--translate-x': isMobile ? '0' : `${(index - 1) * 10}%`,
                    '--scale': isMobile ? '1' : index === 1 ? '1.05' : '0.95'
                  } as React.CSSProperties}
                >
                  <div className={styles.projectPeriod}>{project.period}</div>
                  <div className={styles.projectImage}>
                    <img src={project.image || "/placeholder.svg"} alt={project.title} />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectLinks}>
                        <a
                          href={project.liveUrl}
                          className={styles.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubUrl}
                          className={styles.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>

                    <div className={styles.projectTechnologies}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.carouselArrow} onClick={handleNext} aria-label="Next project">
              <ChevronRight size={32} />
            </button>
          </div>

          <div className={styles.carouselIndicators}>
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`}
                onClick={() => goToProject(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}