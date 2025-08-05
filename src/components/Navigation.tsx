"use client"

import { useState, useEffect } from "react"
import styles from "../styles/Navigation.module.scss"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Map section IDs to display names
  const sectionDisplayNames: Record<string, string> = {
    hero: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact"
  }

  return (
    <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <span className={styles.logoText}>Portfolio</span>
        </div>

        <ul className={styles.navLinks}>
          {["hero", "about", "skills", "projects", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`${styles.navLink} ${activeSection === section ? styles.active : ""}`}
              >
                {sectionDisplayNames[section]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}