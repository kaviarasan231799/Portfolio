import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.logo}>KAVI<span>.</span></span>
        <span className={styles.copy}>© {new Date().getFullYear()} Kaviarasan K</span>
      </div>
      <div className={styles.center}>
        <span>Built with React.js + SCSS</span>
      </div>
      <div className={styles.right}>
        <a href="https://github.com/kaviarasan231799" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/kaviarasanccbp" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}
