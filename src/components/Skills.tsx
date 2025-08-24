"use client"

import React, { useEffect, useRef, useState } from "react"
import styles from "../styles/Skills.module.scss"
import { 
  FaReact, 
  FaAngular,
  FaJs, 
  FaPython, 
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaFigma,
  FaJava,
} from "react-icons/fa"
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiPostgresql, 
  SiMysql,
  SiTailwindcss,
  SiSpringboot,
} from "react-icons/si"

const skillsData = [
  { name: "React", icon: <FaReact />, category: "Frontend"},
  { name: "Angular", icon: <FaAngular />, category: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript />, category: "Language" },
  { name: "JavaScript", icon: <FaJs />, category: "Language" },
  { name: "Java", icon: <FaJava />, category: "Language" },
  { name: "Python", icon: <FaPython />, category: "Language" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database" },
  { name: "MySQL", icon: <SiMysql />, category: "Database" },
  { name: "GitHub", icon: <FaGithub />, category: "Tools" },
  { name: "Figma", icon: <FaFigma />, category: "Tools" },
  { name: "HTML", icon: <FaHtml5 />, category: "Frontend" },
  { name: "CSS", icon: <FaCss3Alt />, category: "Frontend" },
  { name: "Springboot", icon: <SiSpringboot />, category: "Backend" },
  { name: "Tailwind", icon: <SiTailwindcss />, category: "Frontend" },
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [animatedSkills, setAnimatedSkills] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Start sequential animation when section becomes visible
          startSequentialAnimation()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Mouse move effect for spotlight
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        spotlightRef.current.style.background = `radial-gradient(540px at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
      }
    }

    sectionRef.current?.addEventListener('mousemove', handleMouseMove)

    return () => {
      observer.disconnect()
      sectionRef.current?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const startSequentialAnimation = () => {
    // Initialize all skills as not animated
    setAnimatedSkills(new Array(skillsData.length).fill(false))
    
    // Calculate delay between each skill animation (0.9 seconds total)
    const delayPerSkill = 900 / skillsData.length
    
    // Animate each skill one by one
    skillsData.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSkills(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * delayPerSkill)
    })
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -180, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 180, behavior: 'smooth' })
    }
  }

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div ref={spotlightRef} className={styles.spotlight} />
      <div className={styles.particles}>
        {[...Array(18)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4.5}s`,
            animationDuration: `${4.5 + Math.random() * 9}s`
          }} />
        ))}
      </div>
      
      <div className={styles.skillsContainer}>
        <div className={`${styles.skillsContent} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          <p className={styles.sectionDescription}>
            The tools and technologies I use to bring ideas to life
          </p>

          {/* Desktop Grid View */}
          <div className={styles.desktopGrid}>
            <div className={styles.skillsGrid}>
              {skillsData.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`${styles.skillCard} ${animatedSkills[index] ? styles.animated : ''}`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ animationDelay: `${index * (900 / skillsData.length)}ms` }}
                >
                  <div className={styles.skillIcon}>
                    {React.cloneElement(skill.icon, {
                      className: styles.icon,
                      color: getIconColor(skill.name)
                    })}
                  </div>
                  {hoveredSkill === skill.name && (
                    <div className={styles.skillName}>
                      {skill.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Horizontal Scroll View */}
          <div className={styles.mobileScrollView}>
            <button className={styles.scrollButton} onClick={scrollLeft}>
              &lt;
            </button>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
              {skillsData.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`${styles.skillCard} ${animatedSkills[index] ? styles.animated : ''}`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ animationDelay: `${index * (900 / skillsData.length)}ms` }}
                >
                  <div className={styles.skillIcon}>
                    {React.cloneElement(skill.icon, {
                      className: styles.icon,
                      color: getIconColor(skill.name)
                    })}
                  </div>
                  <div className={styles.skillName}>
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.scrollButton} onClick={scrollRight}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function getIconColor(skillName: string): string {
  const colors: Record<string, string> = {
    'React': '#61DAFB',
    'Angular': '#DD0031',
    'Next.js': '#000000',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Java': '#007396',
    'Python': '#3776AB',
    'Node.js': '#339933',
    'Figma': '#F24E1E',
    'GitHub': '#181717',
    'PostgreSQL': '#336791',
    'MySQL': '#00758F',
    'Git': '#F05032',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'Tailwind': '#06B6D4',
    'Springboot': '#6DB33F',
    'Docker': '#2496ED',
    'Kubernetes': '#326CE5',
  }
  return colors[skillName] || '#8b5cf6'
}