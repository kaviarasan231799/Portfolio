import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { sfx } from './utils/audio';
import { Terminal } from 'lucide-react';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(() => sfx.isMuted());
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [selectedSimMachine, setSelectedSimMachine] = useState(null);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const muted = sfx.toggleMute();
    setIsSoundMuted(muted);
  };

  const handleToggleTheme = () => {
    sfx.click();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSimulateProject = (machineId) => {
    setSelectedSimMachine(machineId);
  };

  return (
    <>
      <Cursor />
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onToggleSound={handleToggleSound}
        isSoundMuted={isSoundMuted}
      />
      <main>
        <Hero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects onSimulateProject={handleSimulateProject} />
        <Education />
        <Contact />
      </main>
      <Footer />

      {/* Floating HUD Terminal Quick Action Button */}
      <button
        onClick={() => {
          sfx.click();
          setCommandPaletteOpen(true);
        }}
        className="floating-cmd-hud"
        title="Open Command Terminal (Ctrl + K)"
        aria-label="Command Terminal"
      >
        <Terminal size={16} />
        <span>COMMAND HUD</span>
        <kbd>⌘K</kbd>
      </button>

      {/* Futuristic Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onToggleSound={handleToggleSound}
        isSoundMuted={isSoundMuted}
        onToggleTheme={handleToggleTheme}
        currentTheme={theme}
      />
    </>
  );
}
