import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal, stats } from '../data/portfolio';
import styles from './About.module.scss';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className={`${styles.about} section`} id="about" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">01 — About</p>
        <h2 className="section-title">
          Building <em>real-time</em>
          <br />
          systems that matter
        </h2>
      </motion.div>

      <div className={styles.grid}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <p>
            I'm a <strong>Full Stack Developer</strong> with 2+ years building scalable,
            real-time web applications for industrial IoT environments.
          </p>
          <p>
            Currently at <strong>Dyna4cast Technologies</strong>, I develop IoT-based
            monitoring systems that track live voltage, current, and temperature —
            helping factories reduce downtime and improve operational visibility.
          </p>
          <p>
            My stack revolves around <strong>React.js + Node.js + MS SQL Server</strong>,
            with strong command of WebSocket for live data streaming, RESTful API
            design, and performance tuning.
          </p>
          <div className={styles.links}>
            <a href="https://linkedin.com/in/kaviarasanccbp" target="_blank" rel="noreferrer" className={styles.link}>
              LinkedIn ↗
            </a>
            <a href="https://github.com/kaviarasan231799" target="_blank" rel="noreferrer" className={styles.link}>
              GitHub ↗
            </a>
            <a href={`mailto:${personal.email}`} className={styles.link}>
              Email ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
