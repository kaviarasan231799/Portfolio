import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowDown, Activity, Sparkles, Send, FileText } from 'lucide-react';
import { personal } from '../data/portfolio';
import IoTTelemetrySimulator from './IoTTelemetrySimulator';
import { sfx } from '../utils/audio';
import styles from './Hero.module.scss';

const techBadges = [
  'React.js',
  'Node.js',
  'WebSocket Stream',
  'MS SQL Server',
  'SCADA Dashboards',
  'Express.js',
  'Threshold Breach Systems',
  'REST APIs'
];

export default function Hero({ onOpenCommandPalette }) {
  const [time, setTime] = useState('');

  // Live IST Coimbatore Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTestCockpitClick = () => {
    sfx.click();
    const el = document.getElementById('iot-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} id="home">
      {/* Background Ambience */}
      <div className={styles.cyberGrid} />
      <div className={styles.radialGlow1} />
      <div className={styles.radialGlow2} />
      <div className={styles.scanlineOverlay} />

      <div className={styles.container}>
        {/* Left Column: Mission Briefing */}
        <div className={styles.briefingCol}>
          {/* Status Pill */}
          <motion.div
            className={styles.statusPill}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.radarDot} />
            <span className={styles.statusText}>READY FOR DEPLOYMENT</span>
            <span className={styles.statusDivider}>•</span>
            <span className={styles.clockText}>{time || 'Coimbatore, India'}</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className={styles.titleGroup}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <span className={styles.leadCode}>&lt;FullStackEngineer /&gt;</span>
            <h1 className={styles.nameHeader}>
              Kaviarasan <span className={styles.nameHighlight}>K.</span>
            </h1>
            <p className={styles.missionHeadline}>
              Architecting <strong>Real-Time Industrial IoT &amp; SCADA</strong> web platforms that stream telemetry, prevent machine failures, and eliminate factory downtime.
            </p>
          </motion.div>

          {/* Key Production Impact Metrics */}
          <motion.div
            className={styles.metricsBanner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>-20%</span>
              <span className={styles.metricLabel}>Downtime Averted</span>
            </div>
            <div className={styles.metricSep} />
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>&lt;50ms</span>
              <span className={styles.metricLabel}>WebSocket Latency</span>
            </div>
            <div className={styles.metricSep} />
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>2+ Yrs</span>
              <span className={styles.metricLabel}>IoT Web Production</span>
            </div>
          </motion.div>

          {/* Tech Badges */}
          <motion.div
            className={styles.badgeRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {techBadges.map((badge, i) => (
              <span key={i} className={styles.badge}>
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className={styles.actionCluster}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#projects"
              onClick={() => sfx.click()}
              className={styles.btnPrimary}
            >
              <span>Explore Projects</span>
              <Activity size={16} />
            </a>

            <button
              onClick={() => {
                sfx.click();
                if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              className={styles.btnCommand}
              title="Open Command Terminal (or press Ctrl + K)"
            >
              <Terminal size={15} />
              <span>Command HUD</span>
              <kbd className={styles.cmdKey}>⌘K</kbd>
            </button>

            <a
              href={`mailto:${personal.email}`}
              onClick={() => sfx.click()}
              className={styles.btnGhost}
            >
              <Send size={15} />
              <span>Contact</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Live Embedded IoT Telemetry Cockpit */}
        <motion.div
          className={styles.simulatorCol}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className={styles.cockpitWrapper}>
            <div className={styles.cockpitCornerTL} />
            <div className={styles.cockpitCornerBR} />
            <div className={styles.interactiveHint}>
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span>INTERACTIVE INDUSTRIAL SIMULATOR · CLICK SPIKE TO TEST</span>
            </div>
            <IoTTelemetrySimulator />
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <a href="#about" onClick={() => sfx.click()} className={styles.scrollLink}>
          <span>DISCOVER FULL DOSSIER</span>
          <ArrowDown size={14} className={styles.bounce} />
        </a>
      </div>
    </section>
  );
}
