import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink, Radio, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personal } from '../data/portfolio';
import { sfx } from '../utils/audio';
import styles from './Contact.module.scss';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copiedKey, setCopiedKey] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    sfx.success();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00ff87', '#00f0ff', '#ffd166']
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sfx.success();
    setFormSent(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
    // Open user's default email client prefilled
    const mailtoUrl = `mailto:${personal.email}?subject=Project%20or%20Role%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom:%20${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className={`${styles.contactSection} section`} id="contact" ref={ref}>
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.labelPill}>
          <Radio size={14} className={styles.pulseRadio} />
          <span>COMMUNICATION CHANNELS // DISPATCH</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Ready to deploy <em>impact</em>
        </h2>
        <p className={styles.sectionDesc}>
          Whether you need a real-time IoT web dashboard, high-throughput WebSocket microservices, or a dedicated Full Stack Engineer.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {/* Left: Dispatch Form Console */}
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, x: -25 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className={styles.terminalBar}>
            <span className={styles.termTitle}>DISPATCH CONSOLE // TRANSMIT MESSAGE</span>
            <span className={styles.termStatus}>TLS 1.3 SECURED</span>
          </div>

          {formSent ? (
            <div className={styles.sentSuccess}>
              <div className={styles.successIcon}>✓</div>
              <h3>TRANSMISSION DISPATCHED</h3>
              <p>Email client triggered. I typically respond within 12–24 hours.</p>
              <button
                className={styles.resetBtn}
                onClick={() => setFormSent(false)}
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>OPERATOR IDENTIFIER / YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan (Engineering Lead)"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>TRANSMISSION RETURN ADDRESS / EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MISSION BRIEF / DETAILS</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your tech stack, project scope, or full-time opportunity..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={15} />
                <span>Transmit Dispatch</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Right: Direct Channels & Telemetry Meta */}
        <motion.div
          className={styles.channelsCol}
          initial={{ opacity: 0, x: 25 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          {/* Email Quick Action Card */}
          <div className={styles.channelCard}>
            <div className={styles.channelTop}>
              <div className={styles.channelIconBox}>
                <Mail size={18} className={styles.channelIcon} />
              </div>
              <div>
                <span className={styles.channelLabel}>DIRECT EMAIL</span>
                <div className={styles.channelValue}>{personal.email}</div>
              </div>
            </div>
            <div className={styles.channelActions}>
              <button
                onClick={() => handleCopy(personal.email, 'email')}
                className={styles.btnAction}
              >
                {copiedKey === 'email' ? <Check size={14} className={styles.greenText} /> : <Copy size={14} />}
                <span>{copiedKey === 'email' ? 'Copied' : 'Copy Email'}</span>
              </button>
              <a
                href={`mailto:${personal.email}`}
                onClick={() => sfx.click()}
                className={styles.btnActionPrimary}
              >
                <span>Compose</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Phone Quick Action Card */}
          <div className={styles.channelCard}>
            <div className={styles.channelTop}>
              <div className={styles.channelIconBox}>
                <Phone size={18} className={styles.channelIcon} />
              </div>
              <div>
                <span className={styles.channelLabel}>DIRECT PHONE / WHATSAPP</span>
                <div className={styles.channelValue}>{personal.phone}</div>
              </div>
            </div>
            <div className={styles.channelActions}>
              <button
                onClick={() => handleCopy(personal.phone, 'phone')}
                className={styles.btnAction}
              >
                {copiedKey === 'phone' ? <Check size={14} className={styles.greenText} /> : <Copy size={14} />}
                <span>{copiedKey === 'phone' ? 'Copied' : 'Copy Phone'}</span>
              </button>
              <a
                href={`tel:${personal.phone}`}
                onClick={() => sfx.click()}
                className={styles.btnActionPrimary}
              >
                <span>Call Now</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Location & Availability HUD */}
          <div className={styles.statusBox}>
            <div className={styles.statusRow}>
              <span className={styles.liveRadarDot} />
              <span className={styles.statusHeading}>CURRENT OPERATIONAL STATUS</span>
            </div>
            <p className={styles.statusDesc}>
              Available for Full-Time Roles, Senior IoT Frontend contracts, and Full Stack Architecture.
            </p>
            <div className={styles.locationTag}>
              <MapPin size={13} />
              <span>Coimbatore, Tamil Nadu, India · UTC+05:30</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
