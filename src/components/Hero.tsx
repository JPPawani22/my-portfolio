"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import styles from "../styles/Hero.module.scss"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
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
              <span className={styles.titleLine}>Hi, I'm</span>
              <span className={styles.titleName}>Your Name</span>
              <span className={styles.titleRole}>Full Stack Developer</span>
            </h1>
            <p className={styles.heroDescription}>
              Passionate about creating elegant solutions to complex problems. I build modern web applications with
              cutting-edge technologies.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary} onClick={scrollToAbout}>
                View My Work
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingElements}>
              <div className={`${styles.element} ${styles.element1}`}></div>
              <div className={`${styles.element} ${styles.element2}`}></div>
              <div className={`${styles.element} ${styles.element3}`}></div>
            </div>
          </div>
        </div>
        <button className={styles.scrollIndicator} onClick={scrollToAbout}>
          <ChevronDown className={styles.scrollIcon} />
        </button>
      </div>
    </section>
  )
}
