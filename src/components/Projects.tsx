"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import styles from "../styles/Projects.module.scss"

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A responsive weather application that provides detailed weather information with beautiful visualizations and forecasts.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Chart.js", "Weather API", "CSS3"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "SCSS", "Framer Motion", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredProjects =
    filter === "all"
      ? projectsData
      : filter === "featured"
        ? projectsData.filter((project) => project.featured)
        : projectsData.filter((project) => !project.featured)

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
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "featured" ? styles.active : ""}`}
              onClick={() => setFilter("featured")}
            >
              Featured
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "other" ? styles.active : ""}`}
              onClick={() => setFilter("other")}
            >
              Other
            </button>
          </div>

          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.projectCard} ${project.featured ? styles.featured : ""}`}
                style={{ "--animation-delay": `${index * 0.2}s` } as React.CSSProperties}
              >
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
        </div>
      </div>
    </section>
  )
}
