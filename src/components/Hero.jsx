import { motion } from 'framer-motion';
import { personal } from '../data/portfolio';
import styles from './Hero.module.scss';

const techTags = ['React.js', 'Node.js', 'WebSocket', 'MS SQL Server', 'Express.js', 'IoT Systems', 'REST APIs', 'AWS EC2'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.gridBg} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.content}>
        <motion.p className={styles.eyebrow} {...fade(0.1)}>
          <span className={styles.dot} />
          Full Stack Developer &nbsp;·&nbsp; {personal.location}
        </motion.p>

        <motion.h1 className={styles.name} {...fade(0.6)}>
          Kaviarasan
        </motion.h1>

        <motion.p className={styles.tagline} {...fade(0.35)}>
          Building <strong>real-time</strong>, scalable web applications — from IoT dashboards to industrial monitoring systems — with React, Node.js &amp; modern backend architecture.
        </motion.p>

        <motion.div className={styles.tags} {...fade(0.45)}>
          {techTags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </motion.div>

        <motion.div className={styles.actions} {...fade(0.55)}>
          <a href="#projects" className={styles.btnPrimary}>View Projects</a>
          <a href="#contact" className={styles.btnOutline}>Get In Touch</a>
          <a href="https://github.com/kaviarasan231799" target="_blank" rel="noreferrer" className={styles.btnGhost}>GitHub ↗</a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>

      <div className={styles.badge}>
        <span>Open to Opportunities</span>
        <div className={styles.badgeDot} />
      </div>
    </section>
  );
}
