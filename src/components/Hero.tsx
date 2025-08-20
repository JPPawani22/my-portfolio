"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, Mail } from "lucide-react"
import styles from "../styles/Hero.module.scss"
import Image from "next/image"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [firstNameVisible, setFirstNameVisible] = useState(false)
  const [lastNameVisible, setLastNameVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Stagger the name animation
    const firstNameTimer = setTimeout(() => setFirstNameVisible(true), 300)
    const lastNameTimer = setTimeout(() => setLastNameVisible(true), 600)
    
    return () => {
      clearTimeout(firstNameTimer)
      clearTimeout(lastNameTimer)
    }
  }, [])

  const scrollToProjects = () => {
    const aboutSection = document.getElementById("projects")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={`${styles.heroContent} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>
                <span className={styles.waveHand} role="img" aria-label="hand wave">
                  👋
                </span>
                Hi, I'm
              </span>
              <div className={styles.nameContainer}>
                <div className={`${styles.nameLine} ${firstNameVisible ? styles.nameVisible : ""}`}>
                  <span className={styles.titleName}>
                    Pawani
                  </span>
                </div>
                <div className={`${styles.nameLine} ${lastNameVisible ? styles.nameVisible : ""}`}>
                  <span className={styles.titleName}>
                    Uthpalawanna
                  </span>
                </div>
              </div>
              <span className={styles.titleRole}>IT Undergraduate</span>
            </h1>
            <p className={styles.heroDescription}>
              Passionate about creating elegant solutions to complex problems. I build modern web applications with
              cutting-edge technologies.
            </p>
            <div className={styles.heroButtons}>
              <button
                className={styles.btnSecondary}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className={styles.btnIcon} size={18} />
                Get In Touch
              </button>
              <a 
                href="https://drive.google.com/your-cv-link-here" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <Download className={styles.btnIcon} size={18} />
                Download CV
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.profileImageContainer}>
              <Image
                src="/images/profile.png"
                alt="Pawani Uthpalawanna"
                width={500}
                height={500}
                className={styles.profileImage}
                priority
              />
            </div>
            <div className={styles.floatingElements}>
              <div className={`${styles.element} ${styles.element1}`}></div>
              <div className={`${styles.element} ${styles.element2}`}></div>
              <div className={`${styles.element} ${styles.element3}`}></div>
            </div>
          </div>
        </div>
        <button className={styles.scrollIndicator} onClick={scrollToProjects} aria-label="Scroll to projects">
          <ChevronDown className={styles.scrollIcon} />
        </button>
      </div>
    </section>
  )
}