"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
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
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Email</h3>
                  <p>your.email@example.com</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Location</h3>
                  <p>Your City, Country</p>
                </div>
              </div>

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

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
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
          <p>&copy; 2024 Your Name. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              GitHub
            </a>
            <a href="#" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="#" className={styles.socialLink}>
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
