import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) setActive(s.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <a href="#home" className={styles.logo}>
        KAVI<span>.</span>
      </a>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={active === l.href.slice(1) ? styles.active : ''}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <a href="mailto:kavistc07@gmail.com" className={styles.cta}>
        Hire Me
      </a>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.open : ''} />
        <span className={menuOpen ? styles.open : ''} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button
              className={styles.mobileThemeToggle}
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }}
            >
              {theme === 'dark' ? '☀️ Switch to Day Mode' : '🌙 Switch to Night Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

