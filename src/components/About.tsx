"use client"

import { useEffect, useRef, useState } from "react"
import styles from "../styles/About.module.scss"
import { FaGraduationCap, FaTrophy, FaCode, FaAward } from "react-icons/fa"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  // const [profileImage, setProfileImage] = useState("../images/project2.jpg?height=300&width=300")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
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

    return () => observer.disconnect()
  }, [])

  const milestones = [
    {
      icon: <FaGraduationCap />,
      title: "BSc in Computer Science",
      year: "2021 - Present",
      description: "Currently pursuing my undergraduate degree with focus on software engineering",
      delay: 0.1
    },
    {
      icon: <FaCode />,
      title: "Full Stack Developer",
      year: "2022 - Present",
      description: "Building web applications using modern technologies",
      delay: 0.3
    },
    {
      icon: <FaTrophy />,
      title: "Hackathon Winner",
      year: "2023",
      description: "Won first prize in university coding competition",
      delay: 0.5
    }
  ]

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={`${styles.aboutContent} ${isVisible ? styles.visible : ""}`}>
          {/* Left Side - Milestones */}
          <div className={styles.milestones}>
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

          {/* Right Side - About Content */}
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.aboutDescription}>
              <p>
                I'm a passionate Full Stack Developer with a strong foundation in modern web technologies. Currently
                pursuing my undergraduate degree while building real-world applications that solve meaningful problems.
              </p>
              <p>
                My journey in programming started with curiosity and has evolved into a deep passion for creating
                elegant, efficient, and user-friendly solutions. I love learning new technologies and staying up-to-date
                with industry trends.
              </p>
              <p>
                When I'm not coding, you can find me exploring new frameworks, contributing to open-source projects, or
                sharing knowledge with fellow developers in the community.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}