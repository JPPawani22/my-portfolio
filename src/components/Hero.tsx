'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/components/Hero.module.scss';

const Hero = () => {
  return (
    <section 
      id="home" 
      className={styles.hero}
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className={styles.hero__content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.hero__avatar}>
            <Image 
              src="/images/profile.jpg" 
              alt="Profile" 
              width={128} 
              height={128} 
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className={styles.hero__title}>
            Hi, I'm <span>Your Name</span>
          </h1>
          
          <h2 className={styles.hero__subtitle}>
            IT Undergraduate
          </h2>
          
          <p className={styles.hero__description}>
            Passionate about web development, software engineering, and creating digital solutions that make an impact.
          </p>
          
          <div className={styles.hero__actions}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn btn-primary"
            >
              Contact Me
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="btn btn-secondary"
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;