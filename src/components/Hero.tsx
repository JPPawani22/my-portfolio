"use client"

import { useEffect, useState } from "react"
import { ChevronDown,Download, Mail } from "lucide-react"
import styles from "../styles/Hero.module.scss"
import Image from "next/image"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [displayedFirstName, setDisplayedFirstName] = useState("")
  const [displayedLastName, setDisplayedLastName] = useState("")
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [currentStage, setCurrentStage] = useState(0) // 0 = typing first, 1 = typing last, 2 = deleting last, 3 = deleting first

  useEffect(() => {
    const firstName = "Pawani"
    const lastName = "Uthpalawanna"
    const pauseDuration = 2000 // 2 second pause between stages
    
    const handleTyping = () => {
      switch(currentStage) {
        case 0: // Typing first name
          setDisplayedFirstName(firstName.substring(0, displayedFirstName.length + 1))
          if (displayedFirstName === firstName) {
            setTypingSpeed(pauseDuration)
            setCurrentStage(1)
          }
          break
          
        case 1: // Typing last name
          setDisplayedLastName(lastName.substring(0, displayedLastName.length + 1))
          if (displayedLastName === lastName) {
            setTypingSpeed(pauseDuration)
            setCurrentStage(2)
          }
          break
          
        case 2: // Deleting last name
          setDisplayedLastName(lastName.substring(0, displayedLastName.length - 1))
          if (displayedLastName === "") {
            setTypingSpeed(pauseDuration)
            setCurrentStage(3)
          }
          break
          
        case 3: // Deleting first name
          setDisplayedFirstName(firstName.substring(0, displayedFirstName.length - 1))
          if (displayedFirstName === "") {
            setTypingSpeed(pauseDuration)
            setCurrentStage(0) // Restart the loop
          }
          break
      }
      
      // Adjust speed for typing vs deleting
      setTypingSpeed(
        currentStage === 0 || currentStage === 1 ? 250 : 150
      )
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayedFirstName, displayedLastName, currentStage, typingSpeed])

  useEffect(() => {
    setIsVisible(true)
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
                <div className={styles.nameLine}>
                  <span className={styles.titleName}>
                    {displayedFirstName}
                    {(currentStage === 0 || currentStage === 3) && (
                      <span className={styles.cursor}>|</span>
                    )}
                  </span>
                </div>
                <div className={styles.nameLine}>
                  <span className={styles.titleName}>
                    {displayedLastName}
                    {(currentStage === 1 || currentStage === 2) && (
                      <span className={styles.cursor}>|</span>
                    )}
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
                src="/images/profile.png" // Update this path to your profile image
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