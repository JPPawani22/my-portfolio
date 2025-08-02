'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.footer__brand}>
            <Link href="/">
              My Portfolio
            </Link>
            <div>© {new Date().getFullYear()} All Rights Reserved</div>
          </div>
        </motion.div>
      
      </div>
    </footer>
  );
};

export default Footer;