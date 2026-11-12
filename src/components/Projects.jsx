import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal, ExternalLink, Cpu, Database, Radio, CheckCircle, Zap, Globe } from 'lucide-react';
import { projects } from '../data/portfolio';
import { sfx } from '../utils/audio';
import styles from './Projects.module.scss';

// Extended technical metadata for the modern bento showcase
const PROJECT_EXTENSIONS = {
  1: {
    badge: 'LIVE PRODUCTION PLATFORM',
    architecture: 'Three.js 3D Viewer ⇄ React UI ⇄ Express REST APIs ⇄ MySQL Quotation Engine ⇄ Cloudinary Storage & PDF Service',
    metrics: [
      { label: 'Turnaround', val: 'Instant Quote' },
      { label: '3D Preview Engine', val: 'Three.js' },
      { label: 'Storage & PDF', val: 'Cloudinary' },
    ],
    machineId: null,
  },
  2: {
    badge: 'MANUFACTURING ERP',
    architecture: 'React Component Library ⇄ Node.js / Express REST APIs ⇄ MS SQL Server (Inventory, PO, Production & Quality Stored Procs)',
    metrics: [
      { label: 'Core Modules', val: '7+ ERP Modules' },
      { label: 'Database Backend', val: 'MS SQL Server' },
      { label: 'Architecture', val: 'Full-Stack REST' },
    ],
    machineId: null,
  },
  3: {
    badge: 'CLIENT DEPLOYMENT',
    architecture: 'IoT Spectrometer Probes ⇄ Node.js Stream Pipeline ⇄ MS SQL Schema ⇄ Foundry Production Analytics UI',
    metrics: [
      { label: 'Efficiency Gain', val: '+25%' },
      { label: 'Latency', val: '<35ms' },
      { label: 'Spectro Accuracy', val: '99.8%' },
    ],
    machineId: 'psg-spec-02',
  },
  4: {
    badge: 'OPEN SOURCE / SIMULATOR',
    architecture: 'Socket.io Cluster ⇄ Express Server ⇄ React Dynamic Visualizers ⇄ Push Notification Webhooks',
    metrics: [
      { label: 'Simulated Nodes', val: '20+ Devices' },
      { label: 'Live Charts', val: '60 FPS' },
      { label: 'Alert Tripwire', val: '<10ms' },
    ],
    machineId: 'telemetry-01',
  },
  5: {
    badge: 'FULL-STACK ANALYTICS',
    architecture: 'MS SQL Server Query Optimization ⇄ Stored Procedures ⇄ Node.js REST API ⇄ React Reporting Engine',
    metrics: [
      { label: 'Query Speedup', val: '3.2x' },
      { label: 'Report Formats', val: 'PDF / CSV' },
      { label: 'Uptime SLA', val: '99.9%' },
    ],
    machineId: null,
  },
};

function BentoProjectCard({ project, index, onSimulateProject }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'arch'
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const ext = PROJECT_EXTENSIONS[project.id] || {};

  const handleSimulate = () => {
    sfx.click();
    if (ext.machineId && onSimulateProject) {
      onSimulateProject(ext.machineId);
    }
    const el = document.getElementById('iot-simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      className={styles.bentoCard}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ '--accent-color': project.accent }}
    >
      {/* Top Banner */}
      <div className={styles.cardHeader}>
        <div className={styles.indexBox}>
          <span className={styles.indexNum}>{project.num}</span>
          <span className={styles.badgeText}>{ext.badge || 'PROJECT'}</span>
        </div>
        <div className={styles.tabPills}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabActive : ''}`}
            onClick={() => {
              sfx.click();
              setActiveTab('overview');
            }}
          >
            Overview
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'arch' ? styles.tabActive : ''}`}
            onClick={() => {
              sfx.click();
              setActiveTab('arch');
            }}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className={styles.titleArea}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
      </div>

      {/* Tabbed Content Area */}
      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={styles.tabContent}
            >
              <p className={styles.descText}>{project.description}</p>
              
              {/* Highlight Impact Box */}
              <div className={styles.impactHighlight}>
                <Zap size={15} className={styles.impactIcon} />
                <span>{project.impact}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={styles.tabContent}
            >
              <div className={styles.archBox}>
                <div className={styles.archLabel}>
                  <Database size={13} />
                  <span>DATA FLOW &amp; PIPELINE BLUEPRINT</span>
                </div>
                <div className={styles.archFlow}>{ext.architecture}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Metrics Grid */}
      {ext.metrics && (
        <div className={styles.metricsGrid}>
          {ext.metrics.map((m, i) => (
            <div key={i} className={styles.metricBlock}>
              <span className={styles.metricVal}>{m.val}</span>
              <span className={styles.metricLbl}>{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Pills */}
      <div className={styles.techStack}>
        {project.tech.map((t) => (
          <span key={t} className={styles.techPill}>
            {t}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.actionGroup}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.click()}
              className={styles.liveLinkBtn}
            >
              <Globe size={13} />
              <span>Live Platform</span>
            </a>
          )}
          {ext.machineId && (
            <button onClick={handleSimulate} className={styles.liveSimBtn}>
              <Radio size={14} className={styles.pulseRadio} />
              <span>⚡ Test in IoT Simulator</span>
            </button>
          )}
        </div>
        <a
          href={project.githubUrl || 'https://github.com/kaviarasan231799'}
          target="_blank"
          rel="noreferrer"
          onClick={() => sfx.click()}
          className={styles.codeLink}
        >
          <span>{project.githubUrl && project.githubUrl.includes('/Bharani') ? 'View Code' : 'Repository'}</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects({ onSimulateProject }) {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section className={`${styles.projectsSection} section`} id="projects" ref={ref}>
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.labelPill}>
          <Terminal size={14} />
          <span>PRODUCTION SYSTEMS &amp; ARCHITECTURE</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Industrial <em>grade</em> engineering
        </h2>
        <p className={styles.sectionDesc}>
          Every project below solved mission-critical challenges: from sub-second sensor streaming on factory floors to high-performance SQL analytics.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <BentoProjectCard
            key={p.id}
            project={p}
            index={i}
            onSimulateProject={onSimulateProject}
          />
        ))}
      </div>

      <motion.div
        className={styles.githubCta}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a
          href="https://github.com/kaviarasan231799"
          target="_blank"
          rel="noreferrer"
          onClick={() => sfx.click()}
          className={styles.githubBtn}
        >
          <span>Explore All 15+ Repositories on GitHub</span>
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </section>
  );
}
