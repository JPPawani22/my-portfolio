"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Mail, Github, Linkedin, Send, Phone } from "lucide-react"
import styles from "../styles/Contact.module.scss"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showResumePreview, setShowResumePreview] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
   const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

 useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleResumePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowResumePreview(!showResumePreview)
  }

  return (
     <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.contactContainer}>
        <div className={`${styles.contactContent} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.sectionDescription}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>

          <div className={styles.contactWrapper}>
           <div className={styles.contactInfo}>
  {isMobile ? (
    <div className={styles.socialLinksMobile}>
      <a 
        href="mailto:pawani02jp@gmail.com" 
        className={styles.socialLink}
        aria-label="Email"
      >
        <Mail size={21.6} />
      </a>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="GitHub"
      >
        <Github size={21.6} />
      </a>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="LinkedIn"
      >
        <Linkedin size={21.6} />
      </a>
    </div>
  ) : (
    <>
      <a 
          href="mailto:pawani02jp@gmail.com" 
          className={styles.infoItem}
          target="_blank" 
          rel="noopener noreferrer"
      >
          <div className={styles.infoIcon}>
              <Mail size={21.6} />
          </div>
          <div className={styles.infoContent}>
              <h3>Email Me</h3> 
              {/* <p>pawani02jp@gmail.com</p> */}
          </div>
      </a>

      <a 
        href="https://github.com/JPPawani22" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.infoItem}
      >
        <div className={styles.infoIcon}>
          <Github size={21.6} />
        </div>
        <div className={styles.infoContent}>
          <h3>GitHub</h3>
        </div>
      </a>

      <a 
        href="https://www.linkedin.com/in/pawani-uthpalawanna" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.infoItem}
      >
        <div className={styles.infoIcon}>
          <Linkedin size={21.6} />
        </div>
        <div className={styles.infoContent}>
          <h3>Linkedin</h3>
        </div>
      </a>

    </>
  )}

              <div className={styles.contactVisual}>
                <div className={styles.floatingShapes}>
                  <div className={`${styles.shape} ${styles.shape1}`}></div>
                  <div className={`${styles.shape} ${styles.shape2}`}></div>
                  <div className={`${styles.shape} ${styles.shape3}`}></div>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={`${styles.formInput} ${styles.formTextarea}`}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isSubmitting ? (
                  <span className={styles.pulseAnimation}>Sending...</span>
                ) : (
                  <>
                    <Send size={18} className={styles.sendIcon} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className={`${styles.statusMessage} ${styles.success}`}>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`${styles.statusMessage} ${styles.error}`}>
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

       <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {currentYear} PawaniUthpalawanna. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/JPPawani22" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/pawani-uthpalawanna" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:pawani02jp@gmail.com" 
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}