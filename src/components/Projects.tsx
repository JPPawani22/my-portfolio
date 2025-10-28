"use client";

import React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code, Layout, Cpu, Database, ArrowLeft, Star, Calendar, Users } from "lucide-react"
import Link from "next/link"
import styles from "../styles/Projects.module.scss"

const projectsData = [
  {
    id: 1,
    title: "BlogV - Modern Blogging Platform",
    description: "A full-stack blogging platform with rich text editing, user authentication, and real-time updates. Features include image uploads, and responsive design.",
    image: "/images/blogV.PNG",
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
]

const statsData = {
  totalProjects: "6+",
  frontendProjects: 1,
  fullstackProjects: 4,
  mobileProjects: 1,
  activeProjects: 2
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const [activeStat, setActiveStat] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (isAutoPlaying) {
            startAutoRotate()
          }
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
  }, [isAutoPlaying])

  const startAutoRotate = () => {
    setIsAnimating(true)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % projectsData.length)
        setIsAnimating(true)
      }, 300)
    }, 4000)
  }

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setIsAnimating(false)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % projectsData.length)
      setIsAnimating(true)
    }, 300)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setIsAnimating(false)
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + projectsData.length) % projectsData.length)
      setIsAnimating(true)
    }, 300)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setIsAnimating(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(true)
    }, 300)
  }

  const currentProject = projectsData[currentIndex]

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.techBackground} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.techShape} style={{
            '--delay': `${i * 0.1}s`,
            '--size': `${Math.random() * 7 + 3.5}px`,
            '--left': `${Math.random() * 100}%`,
            '--top': `${Math.random() * 100}%`,
            '--opacity': `${Math.random() * 0.5 + 0.1}`,
            '--animation-duration': `${Math.random() * 14 + 7}s`
          } as React.CSSProperties} />
        ))}
      </div>
      
      <div className={`${styles.projectsContainer} ${isVisible ? styles.visible : ''}`}>
        <h2 className={styles.sectionTitle}>Project Highlights</h2>
        <p className={styles.sectionDescription}>
          A curated selection of my work. Explore more in the <Link href="/all-projects" className={styles.viewAllLink}>full portfolio</Link>.
        </p>

        <div className={styles.columnsContainer}>
          {/* Left Column - Carousel Showcase */}
          <div className={styles.projectShowcase}>
            <div className={styles.carouselContainer}>
              <div 
                className={`${styles.carouselSlide} ${isAnimating ? styles.animating : ''}`}
              >
                <div className={styles.slideContent}>
                  <div className={styles.slideImage}>
                    <div className={styles.imageContainer}>
                      <img 
                        src={currentProject.image} 
                        alt={currentProject.title} 
                        className={styles.projectImage}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.backgroundColor = '#1f2937';
                          target.style.display = 'flex';
                          target.style.alignItems = 'center';
                          target.style.justifyContent = 'center';
                          target.style.color = '#8b5cf6';
                          target.style.fontSize = '1rem';
                          target.style.fontWeight = '600';
                          target.innerHTML = 'Image Loading...';
                        }}
                      />
                    </div>
                    <div className={styles.imageOverlay}>
                      <div className={styles.projectActions}>
                        {currentProject.liveUrl && (
                          <a 
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectButton}
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                        {currentProject.githubUrl && (
                          <a 
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectButton}
                          >
                            <Github size={14} />
                            Code
                          </a>
                        )}
                        {!currentProject.liveUrl && !currentProject.githubUrl && (
                          <span className={styles.noLinkMessage}>
                            Private Repository
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.projectBadges}>
                      <div className={styles.projectPeriod}>{currentProject.period}</div>
                      
                    </div>
                  </div>
                  
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                    <p className={styles.projectDescription}>{currentProject.description}</p>
                    
                    <div className={styles.technologies}>
                      {currentProject.technologies.map((tech, index) => (
                        <span key={index} className={styles.techPill}>{tech}</span>
                      ))}
                    </div>

                    <div className={styles.projectMeta}>
                      
                      <div className={styles.projectLinks}>
                        {currentProject.liveUrl && (
                          <a 
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkIcon}
                            title="Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {currentProject.githubUrl && (
                          <a 
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkIcon}
                            title="Source Code"
                          >
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button 
                className={styles.carouselControl} 
                onClick={prevSlide}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              
              <button 
                className={styles.carouselControl} 
                onClick={nextSlide}
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>

              {/* Carousel Indicators */}
              <div className={styles.carouselIndicators}>
                {projectsData.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className={styles.statsColumn}>
            <h3 className={styles.statsTitle}>Project Insights</h3>
            
            <div className={styles.statsGrid}>
              <div 
                className={`${styles.statCard} ${activeStat === 'total' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('total')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Code size={16} />
                </div>
                <div className={styles.statValue}>{statsData.totalProjects}</div>
                <div className={styles.statLabel}>Total Projects</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'fullstack' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('fullstack')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Database size={16} />
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
                  <Layout size={16} />
                </div>
                <div className={styles.statValue}>{statsData.mobileProjects}</div>
                <div className={styles.statLabel}>Mobile</div>
              </div>

              <div 
                className={`${styles.statCard} ${activeStat === 'active' ? styles.active : ''}`}
                onMouseEnter={() => setActiveStat('active')}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className={styles.statIcon}>
                  <Calendar size={16} />
                </div>
                <div className={styles.statValue}>{statsData.activeProjects}</div>
                <div className={styles.statLabel}>Ongoing</div>
              </div>
            </div>

            <div className={styles.techOverview}>
              <h4 className={styles.techTitle}>Tech Stack</h4>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Angular</span>
                <span className={styles.techTag}>Springboot</span>
                <span className={styles.techTag}>Next.js</span>
                <span className={styles.techTag}>React</span>
                <span className={styles.techTag}>TypeScript</span>
                <span className={styles.techTag}>Node.js</span>
                <span className={styles.techTag}>PostgreSQL</span>
                <span className={styles.techTag}>MySQL</span>
                <span className={styles.techTag}>Flutter</span>
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