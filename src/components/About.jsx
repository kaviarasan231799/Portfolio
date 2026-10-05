import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Terminal, MapPin, CheckCircle, Copy, Check, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personal, stats } from '../data/portfolio';
import { sfx } from '../utils/audio';
import styles from './About.module.scss';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    sfx.success();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00ff87', '#00f0ff']
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`${styles.aboutSection} section`} id="about" ref={ref}>
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.labelPill}>
          <Terminal size={14} />
          <span>DOSSIER // BACKGROUND &amp; PHILOSOPHY</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Bridging real-world <em>hardware</em> with modern web software
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {/* Left Column: Narrative Dossier */}
        <motion.div
          className={styles.narrativeCol}
          initial={{ opacity: 0, x: -25 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className={styles.terminalCard}>
            <div className={styles.terminalHeader}>
              <div className={styles.dots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.terminalTitle}>kavi@scada-node:~# cat mission_statement.txt</span>
            </div>

            <div className={styles.terminalBody}>
              <p className={styles.leadParagraph}>
                I'm a <strong>Full Stack Developer</strong> specializing in high-concurrency, real-time industrial platforms. At <strong>Dyna4cast Technologies</strong>, I bridge the gap between heavy factory machinery and web browsers.
              </p>

              <p className={styles.bodyParagraph}>
                Industrial machinery generates gigabytes of time-critical sensor data every second. A missed spike in voltage or motor temperature means thousands of dollars in destroyed hardware. My job is to ensure that sensor data travels from raw machine registers to reactive React dashboards with <strong>zero frame drop and sub-50ms latency</strong>.
              </p>

              <div className={styles.highlightQuote}>
                "Helping industrial leaders like Amigos Die Casting reduce unplanned machinery downtime by 20% through real-time predictive alerting."
              </div>

              <div className={styles.specList}>
                <div className={styles.specItem}>
                  <MapPin size={15} className={styles.specIcon} />
                  <span>Base of Operations: <strong>Coimbatore, India (Open to Remote &amp; Global)</strong></span>
                </div>
                <div className={styles.specItem}>
                  <Shield size={15} className={styles.specIcon} />
                  <span>Focus: <strong>React, Node.js, WebSockets, MS SQL Server, SCADA UI</strong></span>
                </div>
                <div className={styles.specItem}>
                  <Award size={15} className={styles.specIcon} />
                  <span>Unique Perspective: <strong>BCA + MSW (Deep analytical problem solving + empathy)</strong></span>
                </div>
              </div>

              {/* Action Buttons inside Dossier */}
              <div className={styles.dossierActions}>
                <button onClick={handleCopyEmail} className={styles.btnCopy}>
                  {copied ? <Check size={14} className={styles.greenText} /> : <Copy size={14} />}
                  <span>{copied ? 'Email Copied!' : 'Copy Direct Email'}</span>
                </button>
                <a
                  href={`mailto:${personal.email}?subject=Full%20Stack%20Role%20Inquiry`}
                  onClick={() => sfx.click()}
                  className={styles.btnContact}
                >
                  <span>Dispatch Message</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Performance Stats & System Metrics */}
        <motion.div
          className={styles.metricsCol}
          initial={{ opacity: 0, x: 25 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <div className={styles.statsContainer}>
            {stats.map((s, idx) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statIndex}>// METRIC 0{idx + 1}</span>
                <div className={styles.statNumber}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Core Principles */}
          <div className={styles.principlesCard}>
            <span className={styles.principlesHeader}>ENGINEERING PHILOSOPHIES</span>
            <div className={styles.principlesList}>
              <div className={styles.principleItem}>
                <CheckCircle size={16} className={styles.pIcon} />
                <div>
                  <strong>Zero-Latency First:</strong> Real-time feeds must never block UI threads or freeze browsers during high sampling frequencies.
                </div>
              </div>
              <div className={styles.principleItem}>
                <CheckCircle size={16} className={styles.pIcon} />
                <div>
                  <strong>Fail-Safe Alerting:</strong> Every threshold breach triggers instant visual and automated audio safety failovers.
                </div>
              </div>
              <div className={styles.principleItem}>
                <CheckCircle size={16} className={styles.pIcon} />
                <div>
                  <strong>Scalable Relational Architecture:</strong> Clean MS SQL Server indexing for ultra-fast time-series sensor queries.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
