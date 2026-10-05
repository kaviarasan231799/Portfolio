import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Cpu, Radio, RefreshCw, Zap, ShieldCheck, Terminal } from 'lucide-react';
import { sfx } from '../utils/audio';
import styles from './IoTTelemetrySimulator.module.scss';

const MACHINES = [
  {
    id: 'amigos-04',
    name: 'Die-Casting Cell #04',
    client: 'Amigos Die Casting',
    nominalTemp: 74,
    nominalVolt: 415,
    nominalAmp: 38.5,
    maxTemp: 90,
    maxVolt: 440,
    type: 'Hydraulic Casting Press',
  },
  {
    id: 'psg-spec-02',
    name: 'Spectrometer Induction #02',
    client: "PSG & Sons' Charities",
    nominalTemp: 82,
    nominalVolt: 400,
    nominalAmp: 52.0,
    maxTemp: 95,
    maxVolt: 430,
    type: 'Foundry Induction Unit',
  },
  {
    id: 'telemetry-01',
    name: 'Predictive Telemetry Node #01',
    client: 'Industrial IoT Suite',
    nominalTemp: 68,
    nominalVolt: 230,
    nominalAmp: 18.2,
    maxTemp: 85,
    maxVolt: 250,
    type: 'High-Frequency Vibration & Power',
  },
];

export default function IoTTelemetrySimulator({ selectedMachineId, onSelectMachine }) {
  const [activeMachineIndex, setActiveMachineIndex] = useState(0);
  const activeMachine = MACHINES[activeMachineIndex];

  const [metrics, setMetrics] = useState({
    voltage: activeMachine.nominalVolt,
    temp: activeMachine.nominalTemp,
    current: activeMachine.nominalAmp,
    vibration: 1.4,
    powerFactor: 0.94,
  });

  const [history, setHistory] = useState(() => Array.from({ length: 24 }, (_, i) => activeMachine.nominalTemp + Math.sin(i) * 2));
  const [isAlerting, setIsAlerting] = useState(false);
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [rawView, setRawView] = useState(false);
  const [packetCount, setPacketCount] = useState(14820);
  const [latency, setLatency] = useState(14);
  const [logMessages, setLogMessages] = useState([
    'WS Client connected to wss://iot.telemetry.internal/v2/stream',
    'Subscribed to topic: telemetry/industrial/stream',
    'Threshold listener initialized: temp_max=90.0°C, volt_max=440V',
  ]);

  const canvasRef = useRef(null);

  // Sync if external selectedMachineId changes
  useEffect(() => {
    if (selectedMachineId) {
      const idx = MACHINES.findIndex(m => m.id === selectedMachineId);
      if (idx !== -1) setActiveMachineIndex(idx);
    }
  }, [selectedMachineId]);

  // Real-time telemetry generator loop (simulates WebSocket packets)
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount(c => c + 1);
      setLatency(12 + Math.floor(Math.random() * 6));

      setMetrics(prev => {
        if (isSimulatingSpike) return prev; // handled by spike routine

        const voltJitter = (Math.random() - 0.5) * 2.2;
        const tempJitter = (Math.random() - 0.5) * 0.8;
        const ampJitter = (Math.random() - 0.5) * 1.1;
        const vibJitter = (Math.random() - 0.5) * 0.15;

        const newVolt = +(activeMachine.nominalVolt + voltJitter).toFixed(1);
        const newTemp = +(activeMachine.nominalTemp + tempJitter).toFixed(1);
        const newAmp = +(activeMachine.nominalAmp + ampJitter).toFixed(1);
        const newVib = +(Math.max(0.6, 1.4 + vibJitter)).toFixed(2);

        setHistory(h => [...h.slice(1), newTemp]);

        return {
          voltage: newVolt,
          temp: newTemp,
          current: newAmp,
          vibration: newVib,
          powerFactor: +(0.93 + Math.random() * 0.03).toFixed(2),
        };
      });
    }, 750);

    return () => clearInterval(interval);
  }, [activeMachineIndex, isSimulatingSpike, activeMachine]);

  // Canvas sparkline renderer for high-frequency telemetry visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Threshold line
    const thresholdY = height * 0.22;
    ctx.strokeStyle = isAlerting ? 'rgba(255, 75, 75, 0.8)' : 'rgba(255, 183, 3, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(width, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw waveform line
    const minVal = activeMachine.nominalTemp - 10;
    const maxVal = activeMachine.nominalTemp + 25;
    const range = maxVal - minVal;

    ctx.beginPath();
    history.forEach((val, i) => {
      const x = (i / (history.length - 1)) * width;
      const normalized = (val - minVal) / range;
      const y = height - (normalized * (height - 16) + 8);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    const lineColor = isAlerting ? '#ff4b4b' : '#00ff87';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Fill gradient under waveform
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, isAlerting ? 'rgba(255, 75, 75, 0.35)' : 'rgba(0, 255, 135, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

  }, [history, isAlerting, activeMachine]);

  // Trigger simulated industrial spike (threshold breach test)
  const handleSimulateSpike = () => {
    if (isSimulatingSpike) return;
    sfx.alarm();
    setIsSimulatingSpike(true);
    setIsAlerting(true);

    const spikeTemp = activeMachine.nominalTemp + 28;
    const spikeVolt = activeMachine.nominalVolt + 45;
    const spikeAmp = activeMachine.nominalAmp + 25;

    setMetrics({
      voltage: spikeVolt,
      temp: spikeTemp,
      current: spikeAmp,
      vibration: 4.85,
      powerFactor: 0.72,
    });
    setHistory(h => [...h.slice(1), spikeTemp]);

    setLogMessages(prev => [
      `[CRITICAL ALERT] Threshold breach: Temp=${spikeTemp}°C (Threshold: ${activeMachine.maxTemp}°C)`,
      `[AUTOMATED RULE] WebSocket trigger event fired -> Tripping emergency circuit breaker`,
      `[RECOVERY] Stator coil cooling initiated. Downtime prevented: ~2.5 hrs`,
      ...prev.slice(0, 3)
    ]);

    // Automatic recovery after 4.5 seconds
    setTimeout(() => {
      setIsAlerting(false);
      setIsSimulatingSpike(false);
      sfx.success();
      setLogMessages(prev => [
        `[STATUS RESTORED] Sensor telemetry stabilized within safe envelope.`,
        ...prev.slice(0, 4)
      ]);
    }, 4500);
  };

  const switchMachine = (idx) => {
    sfx.click();
    setActiveMachineIndex(idx);
    setIsAlerting(false);
    setIsSimulatingSpike(false);
    if (onSelectMachine) onSelectMachine(MACHINES[idx].id);
  };

  return (
    <div className={styles.telemetryCard} id="iot-simulator">
      {/* Top Header Bar */}
      <div className={styles.cockpitHeader}>
        <div className={styles.headerLeft}>
          <span className={`${styles.statusDot} ${isAlerting ? styles.alerting : styles.nominal}`} />
          <span className={styles.liveTag}>LIVE TELEMETRY STREAM</span>
          <span className={styles.pipe}>|</span>
          <span className={styles.wsInfo}>
            <Radio size={12} className={styles.pulseIcon} />
            WS: {latency}ms
          </span>
          <span className={styles.packetBadge}>#{packetCount} RX</span>
        </div>

        <div className={styles.headerRight}>
          <button
            className={`${styles.viewToggle} ${rawView ? styles.active : ''}`}
            onClick={() => {
              sfx.click();
              setRawView(!rawView);
            }}
            title="Toggle Raw JSON WebSocket Stream"
          >
            <Terminal size={13} />
            <span>{rawView ? 'UI View' : 'Raw JSON'}</span>
          </button>
        </div>
      </div>

      {/* Machine Selector Tabs */}
      <div className={styles.machineTabs}>
        {MACHINES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => switchMachine(idx)}
            className={`${styles.machineTab} ${idx === activeMachineIndex ? styles.activeTab : ''}`}
          >
            <span className={styles.tabName}>{m.name}</span>
            <span className={styles.tabClient}>{m.client}</span>
          </button>
        ))}
      </div>

      {/* Main Cockpit Display */}
      {rawView ? (
        <div className={styles.rawTerminal}>
          <div className={styles.terminalBar}>
            <span>ws://iot-gateway.dyna4cast.internal:8080/stream</span>
            <span className={styles.greenText}>● STREAMING (60 Hz)</span>
          </div>
          <pre className={styles.jsonOutput}>
{JSON.stringify(
  {
    event: 'SENSOR_TELEMETRY_PACKET',
    timestamp: new Date().toISOString(),
    machine_id: activeMachine.id,
    type: activeMachine.type,
    metrics: {
      voltage_v: metrics.voltage,
      temp_celsius: metrics.temp,
      current_amp: metrics.current,
      vibration_mm_s: metrics.vibration,
      power_factor: metrics.powerFactor,
    },
    thresholds: {
      max_temp: activeMachine.maxTemp,
      max_volt: activeMachine.maxVolt,
    },
    status: isAlerting ? 'CRITICAL_BREACH' : 'NOMINAL_OPERATION',
    automated_action: isAlerting ? 'TRIP_SAFETY_RELAY' : 'NONE',
  },
  null,
  2
)}
          </pre>
        </div>
      ) : (
        <div className={styles.cockpitBody}>
          {/* Real-Time Metrics Dials */}
          <div className={styles.metricsGrid}>
            <div className={`${styles.metricTile} ${metrics.temp > activeMachine.maxTemp ? styles.tileAlert : ''}`}>
              <div className={styles.tileHeader}>
                <span>CORE TEMP</span>
                <span className={styles.tileUnit}>°C</span>
              </div>
              <div className={styles.tileValue}>
                {metrics.temp}
                <span className={styles.tileSub}>/ {activeMachine.maxTemp}° Max</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min(100, (metrics.temp / (activeMachine.maxTemp * 1.15)) * 100)}%`,
                    backgroundColor: metrics.temp > activeMachine.maxTemp ? '#ff4b4b' : '#00ff87',
                  }}
                />
              </div>
            </div>

            <div className={`${styles.metricTile} ${metrics.voltage > activeMachine.maxVolt ? styles.tileAlert : ''}`}>
              <div className={styles.tileHeader}>
                <span>3-PHASE VOLTAGE</span>
                <span className={styles.tileUnit}>VAC</span>
              </div>
              <div className={styles.tileValue}>
                {metrics.voltage}
                <span className={styles.tileSub}>/ {activeMachine.maxVolt}V Limit</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min(100, (metrics.voltage / (activeMachine.maxVolt * 1.1)) * 100)}%`,
                    backgroundColor: metrics.voltage > activeMachine.maxVolt ? '#ff4b4b' : '#00f0ff',
                  }}
                />
              </div>
            </div>

            <div className={styles.metricTile}>
              <div className={styles.tileHeader}>
                <span>CURRENT LOAD</span>
                <span className={styles.tileUnit}>AMPS</span>
              </div>
              <div className={styles.tileValue}>
                {metrics.current}
                <span className={styles.tileSub}>RMS</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min(100, (metrics.current / 70) * 100)}%`,
                    backgroundColor: '#ffd166',
                  }}
                />
              </div>
            </div>

            <div className={styles.metricTile}>
              <div className={styles.tileHeader}>
                <span>VIBRATION FREQ</span>
                <span className={styles.tileUnit}>mm/s</span>
              </div>
              <div className={styles.tileValue}>
                {metrics.vibration}
                <span className={styles.tileSub}>Tri-Axial</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min(100, (metrics.vibration / 5) * 100)}%`,
                    backgroundColor: '#a78bfa',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Canvas Waveform Sparkline Display */}
          <div className={styles.sparklineContainer}>
            <div className={styles.sparklineHeader}>
              <div className={styles.sparkTitle}>
                <Activity size={14} />
                <span>DYNAMIC THERMAL &amp; VOLTAGE HARMONIC OSCILLATION</span>
              </div>
              <span className={styles.thresholdMarker}>
                --- Upper Tripwire: {activeMachine.maxTemp}°C
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={560}
              height={110}
              className={styles.canvasGraph}
            />
          </div>

          {/* Interactive Trigger Bar */}
          <div className={styles.actionRow}>
            <button
              onClick={handleSimulateSpike}
              disabled={isSimulatingSpike}
              className={`${styles.spikeBtn} ${isAlerting ? styles.spikeActive : ''}`}
            >
              {isAlerting ? (
                <>
                  <AlertTriangle size={15} className={styles.spin} />
                  <span>BREACH IN PROGRESS (AUTO-TRIP ACTIVE)</span>
                </>
              ) : (
                <>
                  <Zap size={15} />
                  <span>⚡ Inject Thermal Surge / Test Alert Tripwire</span>
                </>
              )}
            </button>

            <div className={styles.systemStatusBadge}>
              {isAlerting ? (
                <span className={styles.statusBreach}>
                  <AlertTriangle size={13} /> OVERLOAD TRIGGERED
                </span>
              ) : (
                <span className={styles.statusNominal}>
                  <ShieldCheck size={13} /> SCADA LOGIC NOMINAL
                </span>
              )}
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className={styles.eventLog}>
            <div className={styles.logHeader}>
              <Cpu size={12} />
              <span>REAL-TIME SCADA DISPATCH LOG</span>
            </div>
            <div className={styles.logList}>
              {logMessages.map((msg, i) => (
                <div key={i} className={`${styles.logItem} ${msg.includes('CRITICAL') ? styles.logAlert : ''}`}>
                  <span className={styles.logTime}>[{new Date().toLocaleTimeString()}]</span> {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Note */}
      <div className={styles.cockpitFooter}>
        <span>⚡ Built with React, Canvas API &amp; WebSocket Architecture</span>
        <span className={styles.impactSnippet}>Reduced equipment downtime by 20% in production</span>
      </div>
    </div>
  );
}
