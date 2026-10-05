import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX, Moon, Sun, Menu, X, Radio } from 'lucide-react';
import { sfx } from '../utils/audio';
import styles from './Navbar.module.scss';

const links = [
  { href: '#home', label: 'Mission' },
  { href: '#about', label: 'Dossier' },
  { href: '#skills', label: 'Ecosystem' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Dispatch' },
];

export default function Navbar({ onOpenCommandPalette, onToggleSound, isSoundMuted }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 150) setActive(s.id);
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
    sfx.click();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = () => {
    sfx.click();
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.navContainer}>
        {/* Brand Logo & Telemetry Indicator */}
        <a href="#home" onClick={() => sfx.click()} className={styles.logo}>
          <span className={styles.logoPrefix}>KAVI</span>
          <span className={styles.logoDot}>.</span>
          <span className={styles.logoSub}>SCADA // DEV</span>
        </a>

        {/* Center Desktop Navigation Links */}
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => sfx.click()}
                className={active === l.href.slice(1) ? styles.active : ''}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Tools Cluster */}
        <div className={styles.navActions}>
          {/* Command Terminal Trigger Button */}
          <button
            onClick={() => {
              sfx.click();
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className={styles.cmdBtn}
            title="Open Command HUD (Ctrl+K)"
          >
            <Terminal size={14} />
            <span className={styles.cmdText}>CMD</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={onToggleSound}
            className={`${styles.iconBtn} ${!isSoundMuted ? styles.soundActive : ''}`}
            title={isSoundMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
          >
            {isSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={styles.iconBtn}
            title={theme === 'dark' ? 'Switch to Day Light' : 'Switch to Cyber Dark'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            onClick={() => sfx.click()}
            className={styles.ctaBtn}
          >
            Deploy Me
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={styles.hamburger}
            onClick={() => {
              sfx.click();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={handleNavClick}
                className={active === l.href.slice(1) ? styles.mobileActive : ''}
              >
                {l.label}
              </a>
            ))}
            <div className={styles.mobileTools}>
              <button
                onClick={() => {
                  onToggleSound();
                  setMenuOpen(false);
                }}
                className={styles.mobileToolBtn}
              >
                {isSoundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}</span>
              </button>
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className={styles.mobileToolBtn}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Cyber Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
