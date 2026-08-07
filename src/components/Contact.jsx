import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal } from '../data/portfolio';
import styles from './Contact.module.scss';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className={`${styles.contact} section`} id="contact" ref={ref}>
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
          ref={ref}
        >
          <p className="section-label">06 — Contact</p>
          <h2 className={styles.heading}>
            Let's build something <em>great</em> together
          </h2>
          <p className={styles.subtext}>
            Open to full-time roles, freelance projects, and exciting collaborations in React.js, Node.js, or IoT web platforms. Based in Coimbatore — open to remote.
          </p>

          <div className={styles.links}>
            <a href={`mailto:${personal.email}`} className={styles.link}>
              <span className={styles.linkIcon}>✉</span>
              <div>
                <span className={styles.linkLabel}>Email</span>
                <span className={styles.linkValue}>{personal.email}</span>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
            <a href={`tel:${personal.phone}`} className={styles.link}>
              <span className={styles.linkIcon}>✆</span>
              <div>
                <span className={styles.linkLabel}>Phone</span>
                <span className={styles.linkValue}>{personal.phone}</span>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className={styles.socials}>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className={styles.socialCard}
            >
              <span className={styles.socialName}>LinkedIn</span>
              <span className={styles.socialHandle}>kaviarasanccbp</span>
              <span className={styles.socialArrow}>↗</span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className={styles.socialCard}
            >
              <span className={styles.socialName}>GitHub</span>
              <span className={styles.socialHandle}>kaviarasan231799</span>
              <span className={styles.socialArrow}>↗</span>
            </a>
          </div>

          <div className={styles.availability}>
            <div className={styles.availDot} />
            <div>
              <div className={styles.availTitle}>Available for opportunities</div>
              <div className={styles.availSub}>Full-time · Freelance · Remote</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
