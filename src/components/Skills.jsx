import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Terminal, Radio, Database, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sfx } from '../utils/audio';
import styles from './Skills.module.scss';

const SKILL_NODES = [
  {
    name: 'WebSocket Streams',
    category: 'realtime',
    level: 95,
    tagline: 'Bidirectional sub-50ms sensor pipelines',
    proof: 'Engineered high-frequency live telemetry streaming for 16 parallel sensor channels at Dyna4cast.',
    connected: ['React.js', 'Node.js', 'Express.js', 'IoT Protocols'],
    accent: '#00ff87',
  },
  {
    name: 'React.js',
    category: 'frontend',
    level: 92,
    tagline: 'High-performance UI & Dynamic Dashboards',
    proof: 'Developed responsive, component-driven SCADA dashboards, live canvas charts, and interactive control panels.',
    connected: ['WebSocket Streams', 'JavaScript (ES6+)', 'TypeScript', 'Bootstrap'],
    accent: '#00f0ff',
  },
  {
    name: 'Node.js & Express',
    category: 'backend',
    level: 88,
    tagline: 'Microservices, REST APIs, & Event Loops',
    proof: 'Architected backend event loops and REST endpoints handling raw telemetry buffers with zero frame drop.',
    connected: ['WebSocket Streams', 'MS SQL Server', 'RESTful APIs', 'Nginx'],
    accent: '#3de8c0',
  },
  {
    name: 'MS SQL Server',
    category: 'database',
    level: 85,
    tagline: 'Industrial Schema Design & Query Optimization',
    proof: 'Authored indexed tables, time-series aggregation queries, and automated reporting stored procedures.',
    connected: ['Node.js & Express', 'RESTful APIs'],
    accent: '#ffd166',
  },
  {
    name: 'IoT & SCADA Integration',
    category: 'realtime',
    level: 90,
    tagline: 'Threshold Breaches & Machinery Telemetry',
    proof: 'Built automated alert tripwires for voltage, current, and temperature feeds that averted equipment downtime by 20%.',
    connected: ['WebSocket Streams', 'React.js'],
    accent: '#ff6b6b',
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'frontend',
    level: 90,
    tagline: 'Modern ES6+, Asynchronous & Typed Logic',
    proof: 'Clean modular codebases with strict asynchronous event orchestration and robust error boundaries.',
    connected: ['React.js', 'Node.js & Express'],
    accent: '#00f0ff',
  },
  {
    name: 'RESTful API Architecture',
    category: 'backend',
    level: 89,
    tagline: 'Clean Endpoints, Auth, & Payload Optimization',
    proof: 'Designed secure, predictable JSON REST endpoints integrating frontend UI with industrial microservices.',
    connected: ['Node.js & Express', 'MS SQL Server'],
    accent: '#3de8c0',
  },
  {
    name: 'Git, Nginx & EC2',
    category: 'devops',
    level: 82,
    tagline: 'Production Deployments & Version Control',
    proof: 'Reverse proxy configuration with Nginx, version-controlled Agile workflows with Git & GitHub.',
    connected: ['Node.js & Express'],
    accent: '#a78bfa',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'realtime', label: 'Real-Time & IoT' },
  { id: 'frontend', label: 'Frontend UI' },
  { id: 'backend', label: 'Backend APIs' },
  { id: 'database', label: 'Database & SQL' },
  { id: 'devops', label: 'Tools & DevOps' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_NODES[0]);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered = activeCategory === 'all'
    ? SKILL_NODES
    : SKILL_NODES.filter(s => s.category === activeCategory);

  return (
    <section className={`${styles.skillsSection} section`} id="skills" ref={ref}>
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.labelPill}>
          <Cpu size={14} />
          <span>TECHNICAL DNA &amp; SIGNAL MATRIX</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Ecosystem <em>capabilities</em>
        </h2>
        <p className={styles.sectionDesc}>
          An interconnected stack built specifically for sub-second real-time responsiveness and industrial reliability.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sfx.click();
              setActiveCategory(cat.id);
            }}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeFilter : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Skill Matrix + Technical Inspector */}
      <div className={styles.matrixLayout}>
        {/* Left: Skill Cards Grid */}
        <div className={styles.cardsGrid}>
          {filtered.map((skill, i) => {
            const isHovered = hoveredSkill === skill.name;
            const isConnected = hoveredSkill && SKILL_NODES.find(s => s.name === hoveredSkill)?.connected.includes(skill.name);
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                className={`${styles.skillCard} ${isSelected ? styles.cardSelected : ''} ${isConnected ? styles.cardConnected : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                onMouseEnter={() => {
                  setHoveredSkill(skill.name);
                  sfx.blip();
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => {
                  sfx.click();
                  setSelectedSkill(skill);
                }}
                style={{ '--node-accent': skill.accent }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>

                <div className={styles.skillMeterTrack}>
                  <motion.div
                    className={styles.skillMeterFill}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                    style={{ background: skill.accent }}
                  />
                </div>

                <p className={styles.nodeTagline}>{skill.tagline}</p>

                <div className={styles.cardBottom}>
                  <span className={styles.connectedCount}>
                    {skill.connected.length} Linked Nodes
                  </span>
                  <ArrowUpRight size={13} className={styles.inspectArrow} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Technical Inspector Dossier */}
        {selectedSkill && (
          <div className={styles.inspectorPanel}>
            <div className={styles.inspectorHeader}>
              <div className={styles.inspectSignalDot} style={{ background: selectedSkill.accent }} />
              <span className={styles.inspectTitle}>TECHNICAL NODE INSPECTOR</span>
            </div>

            <div className={styles.inspectBody}>
              <h3 className={styles.inspectNodeName}>{selectedSkill.name}</h3>
              <p className={styles.inspectSubtitle}>{selectedSkill.tagline}</p>

              <div className={styles.proofCard}>
                <div className={styles.proofTitle}>
                  <CheckCircle2 size={14} className={styles.checkIcon} />
                  <span>PRODUCTION PROOF &amp; IMPACT</span>
                </div>
                <p className={styles.proofText}>{selectedSkill.proof}</p>
              </div>

              <div className={styles.relSection}>
                <span className={styles.relTitle}>CONNECTED ECOSYSTEM DEPENDENCIES</span>
                <div className={styles.relPills}>
                  {selectedSkill.connected.map(dep => (
                    <span key={dep} className={styles.relPill}>
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.inspectorFooter}>
              <span>STATUS: PRODUCTION VALIDATED</span>
              <span className={styles.proficiencyTag}>Proficiency: {selectedSkill.level}%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
