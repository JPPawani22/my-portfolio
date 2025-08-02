// src/components/About.tsx
'use client';
import styles from '../styles/components/About.module.scss';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.about__container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.about__education}
        >
          <div className={styles.about__educationContent}>
            <h3 className={styles.about__educationTitle}>Education</h3>
            <div className={styles.about__educationItem}>
              <h4 className={styles.about__educationInstitution}>University Name</h4>
              <p className={styles.about__educationDegree}>Bachelor of Science in Information Technology</p>
              <p className={styles.about__educationPeriod}>2021 - Present</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.about__content}
        >
          <h3 className={styles.about__title}>Who I Am</h3>
          <p className={styles.about__description}>
            I'm an enthusiastic IT undergraduate with a passion for web development and software engineering. 
            Currently pursuing my degree while working on personal projects to expand my skillset.
          </p>
          <p className={styles.about__description}>
            My journey in technology began when I was in high school, and since then I've been constantly 
            learning and exploring new technologies to build innovative solutions.
          </p>
          <p className={styles.about__description}>
            When I'm not coding, you can find me reading tech blogs, contributing to open-source projects, 
            or exploring new frameworks and libraries.
          </p>
          
          <div className={styles.about__skills}>
            {['Web Development', 'UI/UX', 'Problem Solving', 'Teamwork'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={styles.about__skill}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;