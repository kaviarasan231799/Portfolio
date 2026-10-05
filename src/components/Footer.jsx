import React from 'react';
import { Terminal, Shield, ArrowUp, Activity } from 'lucide-react';
import { sfx } from '../utils/audio';
import styles from './Footer.module.scss';

export default function Footer() {
  const scrollToTop = () => {
    sfx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.left}>
          <span className={styles.brand}>KAVI<span>.</span></span>
          <span className={styles.tagline}>Real-Time Industrial SCADA &amp; Full Stack Architecture</span>
          <span className={styles.coords}>LAT 11.0168° N · LON 76.9558° E · COIMBATORE</span>
        </div>

        <div className={styles.center}>
          <div className={styles.statusPill}>
            <span className={styles.dot} />
            <span>NODE STATUS: 100% OPERATIONAL</span>
          </div>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Kaviarasan K. All rights reserved.
          </span>
        </div>

        <div className={styles.right}>
          <div className={styles.links}>
            <a
              href="https://github.com/kaviarasan231799"
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.click()}
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/kaviarasanccbp"
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.click()}
            >
              LinkedIn ↗
            </a>
          </div>
          <button onClick={scrollToTop} className={styles.topBtn} title="Back to top">
            <span>TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
