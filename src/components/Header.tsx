'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMoon, FiSun } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from '../styles/components/Header.module.scss';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true';
      setDarkMode(isDark);
      document.body.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.body.classList.toggle('dark', newMode);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className={styles.header__logo}>
            My Portfolio
          </Link>
        </motion.div>

        <nav className={styles.header__nav}>
          {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`#${item}`}
                className={styles.header__link}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.div>
          ))}

          <motion.button
            onClick={toggleDarkMode}
            className={styles['header__theme-toggle']}
            aria-label="Toggle dark mode"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default Header;