import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolio';
import styles from './Skills.module.scss';

const colorMap = {
  accent: 'var(--accent)',
  accent2: 'var(--accent2)',
  accent3: 'var(--accent3)',
  yellow: 'var(--yellow)',
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className={`${styles.skills} section`} id="skills" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">02 — Skills</p>
        <h2 className="section-title">
          Technical <em>toolkit</em>
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            className={styles.group}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: gi * 0.1 }}
          >
            <div
              className={styles.groupTitle}
              style={{ color: colorMap[group.color] }}
            >
              {group.category}
            </div>
            <div className={styles.items}>
              {group.items.map((item) => (
                <div key={item} className={styles.item}>
                  <span
                    className={styles.dot}
                    style={{ background: colorMap[group.color] }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.proficiencies}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {[
          { label: 'React.js', pct: 90 },
          { label: 'Node.js', pct: 85 },
          { label: 'MS SQL Server', pct: 80 },
          { label: 'WebSocket / Real-Time', pct: 82 },
          { label: 'REST API Design', pct: 88 },
        ].map((bar) => (
          <div key={bar.label} className={styles.bar}>
            <div className={styles.barMeta}>
              <span className={styles.barLabel}>{bar.label}</span>
              <span className={styles.barPct}>{bar.pct}%</span>
            </div>
            <div className={styles.barTrack}>
              <motion.div
                className={styles.barFill}
                initial={{ width: 0 }}
                animate={inView ? { width: `${bar.pct}%` } : {}}
                transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
