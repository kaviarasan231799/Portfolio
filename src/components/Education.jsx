import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education } from '../data/portfolio';
import styles from './Education.module.scss';

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className={`${styles.education} section`} id="education" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">05 — Education</p>
        <h2 className="section-title">
          Academic <em>background</em>
        </h2>
      </motion.div>

      <div className={styles.list}>
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            className={styles.card}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <span className={styles.year}>{edu.year}</span>
            <div className={styles.divider} />
            <div>
              <div className={styles.degree}>{edu.degree}</div>
              <div className={styles.inst}>{edu.institution}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
