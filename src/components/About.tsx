"use client"

import { useEffect, useRef, useState } from "react"
import styles from "../styles/About.module.scss"
import ImageUpload from "./ImageUpload"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=300&width=300")
  const [isEditing, setIsEditing] = useState(false)
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

  const handleImageUpload = (url: string) => {
    setProfileImage(url || "/placeholder.svg?height=300&width=300")
    setIsEditing(false)
  }

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={`${styles.aboutContent} ${isVisible ? styles.visible : ""}`}>
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
                <span className={styles.statNumber}>2+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>

          <div className={styles.aboutVisual}>
            <div className={styles.profileCard}>
              <div className={styles.cardGlow}></div>
              <div className={styles.profileImage}>
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className={styles.floatingTech}>
                <span className={styles.techItem}>React</span>
                <span className={styles.techItem}>Next.js</span>
                <span className={styles.techItem}>TypeScript</span>
                <span className={styles.techItem}>Node.js</span>
              </div>
            </div>

            {isEditing && (
              <div className="mt-4">
                <ImageUpload onImageUpload={handleImageUpload} currentImage={profileImage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
