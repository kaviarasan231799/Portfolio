import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data/portfolio';
import styles from './Experience.module.scss';

function ExpItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const colorMap = {
    accent: 'var(--accent)',
    accent2: 'var(--accent2)',
  };
  const color = colorMap[item.color];

  return (
    <motion.div
      ref={ref}
      className={styles.item}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={styles.dot} style={{ background: color, boxShadow: `0 0 0 3px ${color}22` }} />

      <div className={styles.card}>
        <div className={styles.meta}>
          <span className={styles.company} style={{ color }}>{item.company}</span>
          <span className={styles.type}>{item.type}</span>
          <span className={styles.period}>{item.period}</span>
        </div>

        <h3 className={styles.role}>{item.role}</h3>

        <ul className={styles.bullets}>
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className={`${styles.experience} section`} id="experience" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">03 — Experience</p>
        <h2 className="section-title">
          Work <em>history</em>
        </h2>
      </motion.div>

      <div className={styles.timeline}>
        <div className={styles.line} />
        {experience.map((item, i) => (
          <ExpItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
