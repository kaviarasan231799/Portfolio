export const personal = {
  name: 'Kaviarasan K',
  role: 'Full Stack Developer',
  stack: 'React.js · Node.js · WebSocket · MS SQL Server',
  location: 'Coimbatore, India',
  email: 'kavistc07@gmail.com',
  phone: '+91 86674 94136',
  linkedin: 'https://linkedin.com/in/kaviarasanccbp',
  github: 'https://github.com/kaviarasan231799',
  summary:
    "Full Stack Developer with 2+ years of hands-on experience building real-time, high-availability web applications for industrial IoT environments. Currently at Dyna4cast Technologies, I architect monitoring systems that track live voltage, current, and temperature sensor data via WebSockets — helping factories reduce equipment downtime by 20%.",
};

export const skills = [
  {
    category: 'Frontend (Core Strength)',
    color: 'accent',
    items: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Bootstrap', 'WebSocket UI Integration'],
  },
  {
    category: 'Backend & Real-Time APIs',
    color: 'accent2',
    items: ['Node.js', 'Express.js', 'Java (Basic)', 'RESTful APIs', 'WebSocket Data Streaming'],
  },
  {
    category: 'Database Architecture',
    color: 'accent3',
    items: ['MS SQL Server', 'MySQL', 'SQL', 'Query Optimization', 'Schema Design'],
  },
  {
    category: 'Tools & Cloud',
    color: 'yellow',
    items: ['Git & GitHub', 'Postman', 'Nginx', 'AWS EC2 (Basic)', 'Cloudinary'],
  },
];

export const experience = [
  {
    id: 1,
    company: 'Dyna4cast Technologies',
    role: 'Junior Full Stack Developer',
    period: 'Jun 2024 – Present',
    location: 'Coimbatore, India',
    type: 'Full-time',
    color: 'accent',
    bullets: [
      'Built real-time IoT dashboards using React.js with live WebSocket data streaming to monitor voltage, current, and temperature across industrial machinery.',
      'Developed a library of reusable, responsive UI components with HTML5, CSS3, JavaScript, and Bootstrap ensuring cross-device compatibility.',
      'Integrated RESTful APIs into React frontend for seamless communication between UI and backend microservices.',
      'Implemented automated threshold breach alert systems for continuous sensor feeds to prevent costly machine failures.',
      'Participated in Agile sprint planning, code reviews, and documentation to maintain a clean, production-grade codebase.',
    ],
  },
  {
    id: 2,
    company: 'Dyna4cast Technologies',
    role: 'Web Development Intern',
    period: 'Feb 2024 – May 2024',
    location: 'Coimbatore, India',
    type: 'Internship',
    color: 'accent2',
    bullets: [
      'Developed interactive IoT dashboard components using React.js for real-time sensor data visualization.',
      'Enhanced frontend user experience through responsive design patterns and clean component architecture.',
      'Supported REST API integration and executed database queries using MS SQL Server.',
    ],
  },
];

export const projects = [
  {
    id: 1,
    num: '01',
    title: 'Rapid3D',
    subtitle: '3D Printing Quotation Platform',
    liveUrl: 'https://quote.rapid3d.co.in',
    githubUrl: 'https://github.com/kaviarasan231799',
    description:
      'A high-performance web platform where users upload 3D models and receive instant quotations for 3D printing requirements. Features technology & material selection workflows with real-time cost calculation algorithms, dynamic 3D model visualization, automated PDF quotation generation, and Cloudinary storage.',
    impact: '⚡ Instant 3D model quotation engine with dynamic pricing calculations & automated PDF generation',
    tech: ['React.js', 'Node.js', 'Express.js', 'Three.js', 'MySQL', 'Cloudinary', 'PDF Generation'],
    accent: '#00f0ff',
  },
  {
    id: 2,
    num: '02',
    title: 'Barani DRP',
    subtitle: 'Manufacturing ERP System',
    liveUrl: null,
    githubUrl: 'https://github.com/kaviarasan231799/Bharani',
    description:
      'A comprehensive manufacturing ERP solution built to streamline operations across inventory, production planning, stores, purchase orders, quality assurance, accounts, and reporting. Delivers responsive React interfaces, robust REST APIs, and optimized SQL data handling for stock and procurement workflows.',
    impact: '⚡ Streamlined manufacturing operations & real-time visibility across 7+ core business modules',
    tech: ['React.js', 'Node.js', 'Express.js', 'MS SQL Server', 'REST APIs'],
    accent: '#64ff82',
  },
  {
    id: 3,
    num: '03',
    title: "PSG & Sons' Charities",
    subtitle: 'Metallurgy & Foundry Division (Client Project)',
    liveUrl: null,
    githubUrl: 'https://github.com/kaviarasan231799',
    description:
      'An IoT-enabled dashboard built to monitor spectrometer readings and raw material usage in real time. Integrated live IoT sensor feeds for temperature analysis and material consumption tracking to empower production managers.',
    impact: '⚡ Improved operational efficiency & production monitoring accuracy across foundry division',
    tech: ['React.js', 'Node.js', 'MS SQL Server', 'IoT Sensors'],
    accent: '#3de8c0',
  },
  {
    id: 4,
    num: '04',
    title: 'Real-Time IoT Sensor Telemetry Suite',
    subtitle: 'Open Source / Demo Project',
    liveUrl: null,
    githubUrl: 'https://github.com/kaviarasan231799',
    description:
      'Interactive multi-device simulator & live monitoring suite. Streams mock sensor data (voltage spikes, heat maps, vibration analysis) via Socket.io with dynamic charts and instant push notifications.',
    impact: '⚡ Showcases end-to-end WebSocket architecture and real-time frontend charts',
    tech: ['React.js', 'Express.js', 'Socket.io', 'Chart.js'],
    accent: '#a78bfa',
  },
  {
    id: 5,
    num: '05',
    title: 'Smart Predictive Maintenance Portal',
    subtitle: 'Analytics & Reporting Application',
    liveUrl: null,
    githubUrl: 'https://github.com/kaviarasan231799',
    description:
      'Full-stack management portal providing historical machine uptime analytics, automated SQL reporting, shift maintenance logs, and exportable PDF audit summary reports.',
    impact: '⚡ Demonstrates complex SQL query optimization, data aggregation, and report generation',
    tech: ['React.js', 'Node.js', 'MS SQL Server', 'REST API'],
    accent: '#bd93f9',
  },
];

export const education = [
  {
    year: '2022–2023',
    degree: 'Industry Ready Certification — Full Stack Development',
    institution: 'NxtWave Disruptive Technologies',
  },
  {
    year: '2017–2019',
    degree: 'Master of Social Work (MSW)',
    institution: 'NGM College, Pollachi · 66%',
  },
  {
    year: '2014–2017',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'STC College, Pollachi · 60%',
  },
];

export const stats = [
  { num: '2+', label: 'Years Experience' },
  { num: '5+', label: 'Projects Built' },
  { num: '20%', label: 'Downtime Reduced' },
  { num: '12+', label: 'Tech Stack Skills' },
];

export const marqueeItems = [
  'React.js', 'Node.js', 'Three.js', 'WebSocket', 'MS SQL Server', 'MySQL',
  'Cloudinary', 'IoT Monitoring', 'REST APIs', 'Express.js', 'Real-Time Dashboards',
  'Java', 'TypeScript', 'AWS EC2', 'Bootstrap', 'Nginx', 'Git & GitHub',
];

