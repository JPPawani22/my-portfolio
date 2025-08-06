"use client"

import { useEffect, useRef, useState } from "react"
import styles from "../styles/About.module.scss"
import { FaGraduationCap, FaTrophy, FaCode, FaAward, FaSchool, FaBook, FaChild } from "react-icons/fa"
import { FaSchoolCircleCheck, FaSchoolFlag } from "react-icons/fa6"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check if mobile on mount
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const milestones = [
    {
      icon: <FaSchool />,
      title: "Mahinda Rajapaksa College Matara",
      year: "2013 - 2022",
      description: "O/Ls : 9As and A/Ls : 3As (Com. Maths | Physics | Chemistry) in Physical Science Stream",
      delay: 0.1
    },
    {
      // icon: <FaCode />,
      icon: <FaGraduationCap />,
      title: "BSc(Hons) in Information Technology",
      year: "2023 - Present",
      description: "Currently pursuing my undergraduate degree with focus on software engineering",
      delay: 0.3
    },
    {
      icon: <FaTrophy />,
      title: "Hackathon Winner",
      year: "2025",
      description: "2nd runners-up in Civic Tech Challenge competition",
      delay: 0.5
    }
  ]

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={`${styles.aboutContent} ${isVisible ? styles.visible : ""}`}>
          {/* About Content - Now on top for mobile */}
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.aboutDescription}>
              <p>
                I'm an aspiring Full Stack Developer with the foundation in modern web technologies. Currently
                pursuing my Bsc.(Hons) in Information Technology degree while building real-world applications that solve meaningful problems.
              </p>
              <p>
                My journey in programming started with curiosity and has evolved into a deep passion for creating
                elegant, efficient, and user-friendly solutions. I love learning new technologies and staying up-to-date
                with industry trends.
              </p>
              <p>
                I'm passionate about exploring new tech blogs or participating in hackathons. I believe in continuous learning and strive to improve my skills every day. 
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>7+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>

          {/* Milestones - Now below for mobile */}
          <div className={styles.milestones}>
            <h2 className={`${styles.sectionTitle} ${styles.mobileOnly}`}>My Journey</h2>
            <div className={styles.timeline}>
              {milestones.map((item, index) => (
                <div 
                  key={index}
                  className={`${styles.timelineItem} ${isVisible ? styles.animate : ""}`}
                  style={{ animationDelay: `${item.delay}s` }}
                >
                  <div className={styles.timelineIcon}>{item.icon}</div>
                  <div className={styles.timelineContent}>
                    <h3>{item.title}</h3>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}