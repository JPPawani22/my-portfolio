"use client"

import React, { useEffect, useRef, useState } from "react"
import styles from "../styles/Skills.module.scss"
import { 
  FaReact, 
  FaAngular,
  FaJs, 
  FaPython, 
  FaGitAlt,
  FaHtml5,
  FaCss3Alt
} from "react-icons/fa"
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiPostgresql, 
  SiTailwindcss,
  SiSpringboot
} from "react-icons/si"

const skillsData = [
  { name: "React", icon: <FaReact />, category: "Frontend" },
  { name: "Angular", icon: <FaAngular />, category: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript />, category: "Language" },
  { name: "JavaScript", icon: <FaJs />, category: "Language" },
  { name: "Python", icon: <FaPython />, category: "Language" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database" },
  { name: "Git", icon: <FaGitAlt />, category: "Tools" },
  { name: "HTML", icon: <FaHtml5 />, category: "Frontend" },
  { name: "Springboot", icon: <SiSpringboot />, category: "Backend" },
  { name: "CSS", icon: <FaCss3Alt />, category: "Frontend" },
  { name: "Tailwind", icon: <SiTailwindcss />, category: "Frontend" },
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const categories = [...new Set(skillsData.map((skill) => skill.category))]

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.skillsContainer}>
        <div className={`${styles.skillsContent} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          {!isMobile && (
            <p className={styles.sectionDescription}>
              Here are the technologies and tools I work with
            </p>
          )}

          <div className={styles.skillsCollage}>
            {isMobile ? (
              <div className={styles.mobileSkillsRow}>
                {skillsData.map((skill) => (
                  <div key={skill.name} className={styles.mobileSkillIcon}>
                    {React.cloneElement(skill.icon, { 
                      className: styles.icon,
                      color: getIconColor(skill.name)
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.categoriesContainer}>
                {categories.map((category) => (
                  <div key={category} className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                    <div className={styles.skillIconsGrid}>
                      {skillsData
                        .filter((skill) => skill.category === category)
                        .map((skill) => (
                          <div key={skill.name} className={styles.skillIconCard}>
                            <div className={styles.skillIcon}>
                              {React.cloneElement(skill.icon, { 
                                className: styles.icon,
                                color: getIconColor(skill.name)
                              })}
                            </div>
                            <span className={styles.skillName}>{skill.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
    'Python': '#3776AB',
    'PostgreSQL': '#336791',
    'Git': '#F05032',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'Tailwind': '#06B6D4',
    'Springboot': '#6DB33F',
  }
  return colors[skillName] || '#8b5cf6'
}