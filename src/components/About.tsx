"use client"

import { useEffect, useRef, useState } from "react"
import styles from "../styles/About.module.scss"
import { FaGraduationCap, FaTrophy, FaSchool } from "react-icons/fa"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
      icon: <FaGraduationCap />,
      title: "BSc(Hons) in Information Technology",
      year: "2023 - Present",
      description: "Undergraduate degree focusing on software engineering",
      delay: 0.3
    },
    {
      icon: <FaTrophy />,
      title: "Hackathon Winner",
      year: "2025",
      description: "2nd runners-up in Civic Tech Challenge competition",
      delay: 0.5
    },
      {
      icon: <FaSchool />,
      title: "Mahinda Rajapaksa College Matara",
      year: "2013 - 2022",
      description: "O/Ls: 9As, A/Ls: 3As (Com. Maths | Physics | Chemistry)",
      delay: 0.1
    }
  ]

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={`${styles.aboutContent} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.aboutDescription}>
              <p>
                I'm an aspiring Full Stack Developer with foundation in modern web technologies. 
                Currently pursuing my Bsc.(Hons) in IT while building real-world applications.
              </p>
              <p>
                My programming journey started with curiosity and evolved into a passion for creating
                elegant, efficient solutions. I enjoy learning new technologies and staying current.
              </p>
              <p>
                I'm passionate about exploring tech blogs and hackathons. I believe in continuous learning 
                and improving my skills daily.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>7+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>

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