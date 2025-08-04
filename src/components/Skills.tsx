"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import styles from "../styles/Skills.module.scss"

const skillsData = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 80, category: "Language" },
  { name: "JavaScript", level: 95, category: "Language" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Python", level: 70, category: "Language" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "PostgreSQL", level: 75, category: "Database" },
  { name: "Git", level: 85, category: "Tools" },
  { name: "Docker", level: 65, category: "Tools" },
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateSkills, setAnimateSkills] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateSkills(true), 500)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [...new Set(skillsData.map((skill) => skill.category))]

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.skillsContainer}>
        <div className={`${styles.skillsContent} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          <p className={styles.sectionDescription}>
            Here are the technologies and tools I work with to bring ideas to life
          </p>

          <div className={styles.skillsGrid}>
            {categories.map((category, categoryIndex) => (
              <div key={category} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{category}</h3>
                <div className={styles.skillsList}>
                  {skillsData
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <div key={skill.name} className={styles.skillItem}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillPercentage}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillBar}>
                          <div
                            className={`${styles.skillProgress} ${animateSkills ? styles.animate : ""}`}
                            style={
                              {
                                "--skill-level": `${skill.level}%`,
                                "--animation-delay": `${categoryIndex * 0.2 + index * 0.1}s`,
                              } as React.CSSProperties
                            }
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.techIcons}>
            <div className={styles.techIcon}>⚛️</div>
            <div className={styles.techIcon}>🚀</div>
            <div className={styles.techIcon}>💻</div>
            <div className={styles.techIcon}>🎨</div>
            <div className={styles.techIcon}>📱</div>
            <div className={styles.techIcon}>🔧</div>
          </div>
        </div>
      </div>
    </section>
  )
}
