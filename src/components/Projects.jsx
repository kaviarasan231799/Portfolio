import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/portfolio';
import styles from './Projects.module.scss';

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15 }}
      style={{ '--card-accent': project.accent }}
    >
      <div className={styles.cardGlow} />
      <div className={styles.cardInner}>
        <div className={styles.num}>{project.num}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.impact}>
          <span className={styles.impactIcon}>↑</span>
          {project.impact}
        </div>
        <div className={styles.tech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.badge}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      className={`${styles.projects} section`}
      id="projects"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">04 — Projects</p>
        <h2 className="section-title">
          Featured <em>work</em>
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <motion.div
        className={styles.cta}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a
          href="https://github.com/kaviarasan231799"
          target="_blank"
          rel="noreferrer"
          className={styles.ctaLink}
        >
          View more on GitHub ↗
        </a>
      </motion.div>
    </section>
  );
}
