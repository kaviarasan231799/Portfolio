import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Zap, Copy, Volume2, VolumeX, Moon, Sun, ArrowRight, Check, X, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';
import { personal } from '../data/portfolio';
import styles from './CommandPalette.module.scss';

export default function CommandPalette({ isOpen, onClose, onToggleSound, isSoundMuted, onToggleTheme, currentTheme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagStep, setDiagStep] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      sfx.blip();
    } else {
      setQuery('');
      setSelectedIndex(0);
      setDiagRunning(false);
    }
  }, [isOpen]);

  const runDiagnostics = () => {
    setDiagRunning(true);
    setDiagStep(1);
    sfx.click();

    setTimeout(() => {
      setDiagStep(2);
      sfx.blip();
    }, 600);

    setTimeout(() => {
      setDiagStep(3);
      sfx.blip();
    }, 1200);

    setTimeout(() => {
      setDiagStep(4);
      sfx.success();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 1800);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    sfx.success();
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#00ff87', '#00f0ff', '#ffd166']
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const navigateTo = (selector) => {
    sfx.click();
    onClose();
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const allActions = [
    {
      id: 'iot-simulator',
      category: 'Simulate',
      title: 'Open Real-Time IoT Telemetry Cockpit',
      desc: 'Test live machine sensor streams and emergency threshold alert triggers',
      icon: <Zap size={16} className={styles.iconAccent} />,
      perform: () => navigateTo('#iot-simulator'),
    },
    {
      id: 'projects',
      category: 'Navigation',
      title: 'Jump to Featured Projects',
      desc: 'Explore Amigos Die Casting, PSG Foundry, and Telemetry Suite',
      icon: <Terminal size={16} className={styles.iconCyan} />,
      perform: () => navigateTo('#projects'),
    },
    {
      id: 'skills',
      category: 'Navigation',
      title: 'Explore Tech Ecosystem & Skills Matrix',
      desc: 'React.js, Node.js, WebSocket, MS SQL Server, and IoT protocols',
      icon: <ArrowRight size={16} className={styles.iconYellow} />,
      perform: () => navigateTo('#skills'),
    },
    {
      id: 'experience',
      category: 'Navigation',
      title: 'View Engineering Experience Timeline',
      desc: 'Dyna4cast Technologies full-time & internship achievements',
      icon: <ArrowRight size={16} />,
      perform: () => navigateTo('#experience'),
    },
    {
      id: 'contact',
      category: 'Navigation',
      title: 'Go to Contact & Dispatch Station',
      desc: 'Direct line to Kaviarasan for opportunities and partnerships',
      icon: <ArrowRight size={16} />,
      perform: () => navigateTo('#contact'),
    },
    {
      id: 'copy-email',
      category: 'Action',
      title: `Copy Email: ${personal.email}`,
      desc: 'Quick copy to your clipboard with confetti confirmation',
      icon: copiedKey === 'email' ? <Check size={16} className={styles.iconGreen} /> : <Copy size={16} />,
      perform: () => copyToClipboard(personal.email, 'email'),
    },
    {
      id: 'copy-phone',
      category: 'Action',
      title: `Copy Phone: ${personal.phone}`,
      desc: 'Quick copy mobile phone to clipboard',
      icon: copiedKey === 'phone' ? <Check size={16} className={styles.iconGreen} /> : <Copy size={16} />,
      perform: () => copyToClipboard(personal.phone, 'phone'),
    },
    {
      id: 'diagnostics',
      category: 'Diagnostics',
      title: 'Run SCADA System Health Diagnostics',
      desc: 'Execute real-time integrity check on WebSocket streams and memory latency',
      icon: <ShieldAlert size={16} className={styles.iconYellow} />,
      perform: runDiagnostics,
    },
    {
      id: 'toggle-sound',
      category: 'Preferences',
      title: isSoundMuted ? 'Unmute Cyber Sound FX' : 'Mute Cyber Sound FX',
      desc: 'Procedural audio clicks and telemetry chimes',
      icon: isSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} className={styles.iconAccent} />,
      perform: onToggleSound,
    },
    {
      id: 'toggle-theme',
      category: 'Preferences',
      title: currentTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Cyber Dark Theme',
      desc: 'Toggle visual environment aesthetic',
      icon: currentTheme === 'dark' ? <Sun size={16} className={styles.iconYellow} /> : <Moon size={16} />,
      perform: onToggleTheme,
    },
  ];

  const filteredActions = allActions.filter(action =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.desc.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % filteredActions.length);
      sfx.click();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filteredActions.length) % filteredActions.length);
      sfx.click();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].perform();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} onKeyDown={handleKeyDown}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, navigate, or run diagnostics... (Esc to close)"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className={styles.input}
              />
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={16} />
              </button>
            </div>

            {/* Diagnostics progress overlay if active */}
            {diagRunning ? (
              <div className={styles.diagContainer}>
                <div className={styles.diagHeader}>
                  <Terminal size={14} />
                  <span>SYSTEM DIAGNOSTIC SEQUENCE INITIATED</span>
                </div>
                <div className={styles.diagSteps}>
                  <div className={`${styles.diagRow} ${diagStep >= 1 ? styles.active : ''}`}>
                    <span className={styles.diagCheck}>{diagStep >= 1 ? '✓' : '...'}</span>
                    <span>1. Probing WebSocket socket latency &amp; packet drop rates...</span>
                    {diagStep >= 1 && <span className={styles.diagMetric}>12ms - 0% loss</span>}
                  </div>
                  <div className={`${styles.diagRow} ${diagStep >= 2 ? styles.active : ''}`}>
                    <span className={styles.diagCheck}>{diagStep >= 2 ? '✓' : '...'}</span>
                    <span>2. Querying MS SQL Server industrial telemetry schema...</span>
                    {diagStep >= 2 && <span className={styles.diagMetric}>Indexed - Optimized</span>}
                  </div>
                  <div className={`${styles.diagRow} ${diagStep >= 3 ? styles.active : ''}`}>
                    <span className={styles.diagCheck}>{diagStep >= 3 ? '✓' : '...'}</span>
                    <span>3. Verifying automated threshold alert tripwires...</span>
                    {diagStep >= 3 && <span className={styles.diagMetric}>Tripwire Active</span>}
                  </div>
                  <div className={`${styles.diagRow} ${diagStep >= 4 ? styles.done : ''}`}>
                    <span className={styles.diagCheck}>{diagStep >= 4 ? '✓' : '...'}</span>
                    <span>4. Overall System Status:</span>
                    {diagStep >= 4 && <strong className={styles.diagSuccess}>ALL SYSTEMS NOMINAL (100% OPERATIONAL)</strong>}
                  </div>
                </div>
                {diagStep >= 4 && (
                  <button
                    className={styles.diagCloseBtn}
                    onClick={() => setDiagRunning(false)}
                  >
                    Return to Commands
                  </button>
                )}
              </div>
            ) : (
              /* Action List */
              <div className={styles.actionsList}>
                {filteredActions.length === 0 ? (
                  <div className={styles.emptyState}>No matching commands found.</div>
                ) : (
                  filteredActions.map((action, idx) => (
                    <div
                      key={action.id}
                      className={`${styles.actionItem} ${idx === selectedIndex ? styles.selected : ''}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={action.perform}
                    >
                      <div className={styles.actionIcon}>{action.icon}</div>
                      <div className={styles.actionText}>
                        <div className={styles.actionTitleRow}>
                          <span className={styles.actionTitle}>{action.title}</span>
                          <span className={styles.categoryBadge}>{action.category}</span>
                        </div>
                        <span className={styles.actionDesc}>{action.desc}</span>
                      </div>
                      <span className={styles.returnHint}>↵</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Footer */}
            <div className={styles.modalFooter}>
              <div className={styles.keyHints}>
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Select</span>
                <span><kbd>Esc</kbd> Close</span>
              </div>
              <span className={styles.developerSignature}>Kaviarasan K · Mission Control</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
