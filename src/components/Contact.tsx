"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import styles from "../styles/Contact.module.scss"
import { RxResume } from "react-icons/rx"
import { GrResume } from "react-icons/gr"
import { FcDocument } from "react-icons/fc"

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
              <a 
                href="mailto:pawani02jp@gmail.com" 
                className={styles.infoItem}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Email Me</h3>
                </div>
              </a>

              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.infoItem}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className={styles.infoIcon}>
                  <Github size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>GitHub</h3>
                </div>
              </a>


              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.infoItem}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className={styles.infoIcon}>
                  <Linkedin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Linkedin</h3>
                </div>
              </a>

              
              <div 
                className={styles.infoItem}
                onClick={toggleResumePreview}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className={styles.infoIcon}>
                  <FcDocument size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Resume</h3>
                </div>
              </div>

              {showResumePreview && (
                <div className={styles.resumePreview}>
                  <iframe 
                    src="https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/preview" 
                    width="100%" 
                    height="500px"
                    allow="autoplay"
                  ></iframe>
                  <div className={styles.resumeActions}>
                    <a 
                      href="https://drive.google.com/uc?export=download&id=YOUR_GOOGLE_DRIVE_FILE_ID"
                      className={styles.downloadBtn}
                    >
                      Download
                    </a>
                    <button 
                      onClick={() => setShowResumePreview(false)}
                      className={styles.closeBtn}
                    >
                      Close
                    </button>
                  </div>
                </div>
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
                  rows={5}
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
                    <Send size={20} className={styles.sendIcon} />
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
          <p>&copy; 2024 PawaniUthpalawanna. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <Github size={20} className={styles.socialIcon} />
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <Linkedin size={20} className={styles.socialIcon} />
            </a>
            <a 
              href="mailto:pawani02jp@gmail.com" 
              className={styles.socialLink}
            >
              <Mail size={20} className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}