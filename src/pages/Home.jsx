import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaShieldAlt, FaLock, FaBug, FaTerminal, FaCode, FaServer, FaTimes, FaCheckCircle, FaBookOpen, FaTools, FaSkull, FaWifi, FaDatabase, FaFingerprint } from "react-icons/fa";
import { HiArrowRight, HiLightningBolt } from "react-icons/hi";

// Hacking Intro Loading Screen
function HackingIntro({ onComplete }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [bootMessages, setBootMessages] = useState([]);
  const [showSkull, setShowSkull] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  const phases = [
    { message: "[BOOT] Initializing BabyHacker OS v3.0...", delay: 300 },
    { message: "[KERNEL] Loading security modules...", delay: 250 },
    { message: "[NET] Establishing encrypted connection...", delay: 300 },
    { message: "[AUTH] Bypassing firewall protocols...", delay: 350 },
    { message: "[SYS] Mounting secure filesystem...", delay: 250 },
    { message: "[DB] Connecting to knowledge base...", delay: 300 },
    { message: "[SCAN] Running vulnerability scanner...", delay: 400 },
    { message: "[CRYPTO] Initializing encryption layer...", delay: 300 },
    { message: "[READY] All systems operational.", delay: 500 },
  ];

  useEffect(() => {
    if (currentPhase < phases.length) {
      const timer = setTimeout(() => {
        setBootMessages(prev => [...prev, phases[currentPhase].message]);
        setCurrentPhase(prev => prev + 1);
      }, phases[currentPhase].delay);
      return () => clearTimeout(timer);
    } else {
      // Show skull animation
      setTimeout(() => setShowSkull(true), 200);
      setTimeout(() => setGlitchText(true), 800);
      setTimeout(() => onComplete(), 2000);
    }
  }, [currentPhase]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center overflow-hidden"
    >
      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
        }}
      />

      {/* Moving Scan Line */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent"
        initial={{ top: 0 }}
        animate={{ top: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Matrix Rain */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff41] font-mono text-sm"
            style={{ left: `${i * 7}%` }}
            initial={{ y: -500 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {[...Array(25)].map((_, j) => (
              <div key={j} className="opacity-70">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 text-[#00ff41]/30 font-mono text-xs">
        <div>╔══════════════╗</div>
        <div>║ SYSTEM BOOT  ║</div>
        <div>╚══════════════╝</div>
      </div>
      <div className="absolute top-4 right-4 text-[#00ff41]/30 font-mono text-xs text-right">
        <div>MEM: 1337MB</div>
        <div>CPU: ██████ 100%</div>
        <div>NET: SECURE</div>
      </div>
      <div className="absolute bottom-4 left-4 text-[#00ff41]/30 font-mono text-xs">
        <div>IP: 127.0.0.1</div>
        <div>PORT: 443</div>
        <div>SSL: ENABLED</div>
      </div>
      <div className="absolute bottom-4 right-4 text-[#00ff41]/30 font-mono text-xs text-right">
        <div>FIREWALL: ACTIVE</div>
        <div>IDS: MONITORING</div>
        <div>STATUS: READY</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {!showSkull ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cyber-card rounded-2xl p-6 border border-[#00ff41]/20"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-gray-500 text-sm font-mono">root@babyhacker:~#</span>
            </div>

            {/* Boot Messages */}
            <div className="font-mono text-sm space-y-1 min-h-[250px]">
              {bootMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    msg.includes('[READY]') ? 'text-[#00ff41]' : 
                    msg.includes('[BOOT]') ? 'text-[#00d4ff]' : 'text-gray-400'
                  }`}
                >
                  {msg}
                </motion.div>
              ))}
              {currentPhase < phases.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-[#00ff41]"
                >
                  █
                </motion.span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-gray-500">LOADING SYSTEM</span>
                <span className="text-[#00ff41]">{Math.round((currentPhase / phases.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00ff41] via-[#00d4ff] to-[#bf00ff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPhase / phases.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Animated Logo Reveal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="relative inline-block mb-6"
            >
              <FaSkull className="w-24 h-24 text-[#00ff41] mx-auto" />
              <motion.div
                className="absolute inset-0 bg-[#00ff41] blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Glitch Title */}
            <motion.div
              className={`relative ${glitchText ? 'animate-pulse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold font-cyber tracking-wider">
                <span className="text-[#00ff41]">BABY</span>
                <span className="text-[#00d4ff]">HACKER</span>
              </h1>
              {glitchText && (
                <>
                  <h1 className="absolute top-0 left-0 w-full text-5xl md:text-6xl font-bold font-cyber tracking-wider text-[#ff006e] opacity-70" style={{ transform: 'translate(-2px, -2px)', clipPath: 'inset(0 0 50% 0)' }}>
                    <span>BABY</span>
                    <span>HACKER</span>
                  </h1>
                  <h1 className="absolute top-0 left-0 w-full text-5xl md:text-6xl font-bold font-cyber tracking-wider text-[#00d4ff] opacity-70" style={{ transform: 'translate(2px, 2px)', clipPath: 'inset(50% 0 0 0)' }}>
                    <span>BABY</span>
                    <span>HACKER</span>
                  </h1>
                </>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-500 mt-4 font-mono text-sm"
            >
              [ SYSTEM READY • WELCOME AGENT ]
            </motion.p>

            {/* Floating Icons */}
            <div className="flex justify-center gap-6 mt-8">
              {[FaShieldAlt, FaTerminal, FaWifi, FaDatabase, FaFingerprint].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Icon className="w-6 h-6 text-[#00ff41]/50" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Home({ text, index }) {
  const [posts, setPosts] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const features = [
    { 
      icon: FaShieldAlt, 
      title: "Security Research", 
      desc: "In-depth vulnerability analysis",
      color: "#00ff41",
      fullDesc: "Dive deep into the world of security research. Learn how to identify, analyze, and document vulnerabilities in software and systems.",
      topics: [
        "Vulnerability Assessment & Analysis",
        "CVE Research & Documentation",
        "Zero-Day Discovery Techniques",
        "Security Advisories & Reporting",
        "Threat Intelligence Gathering",
        "Malware Analysis Fundamentals"
      ],
      skills: ["Critical Thinking", "Technical Writing", "Reverse Engineering", "Code Analysis"],
      level: "Intermediate to Advanced"
    },
    { 
      icon: FaBug, 
      title: "Bug Bounty", 
      desc: "Ethical hacking tutorials",
      color: "#00d4ff",
      fullDesc: "Master the art of bug bounty hunting. Learn how to find security flaws in web applications and get rewarded for your discoveries.",
      topics: [
        "Web Application Security Testing",
        "OWASP Top 10 Vulnerabilities",
        "XSS, SQLi, CSRF Exploitation",
        "API Security Testing",
        "Mobile App Penetration Testing",
        "Bug Bounty Platform Navigation"
      ],
      skills: ["Web Technologies", "Scripting", "Reconnaissance", "Report Writing"],
      level: "Beginner to Advanced"
    },
    { 
      icon: FaTerminal, 
      title: "Exploitation", 
      desc: "Hands-on penetration testing",
      color: "#bf00ff",
      fullDesc: "Get hands-on experience with real-world exploitation techniques. Learn to think like an attacker to better defend systems.",
      topics: [
        "Network Penetration Testing",
        "Privilege Escalation Techniques",
        "Post-Exploitation Strategies",
        "Social Engineering Attacks",
        "Wireless Network Hacking",
        "Active Directory Exploitation"
      ],
      skills: ["Linux/Windows", "Networking", "Scripting", "Tool Proficiency"],
      level: "Intermediate to Advanced"
    },
    { 
      icon: FaLock, 
      title: "Defense", 
      desc: "Hardening & protection guides",
      color: "#ff006e",
      fullDesc: "Learn defensive security strategies to protect systems and networks. Build robust security architectures and incident response plans.",
      topics: [
        "System Hardening Best Practices",
        "Firewall & IDS/IPS Configuration",
        "Security Monitoring & SIEM",
        "Incident Response Procedures",
        "Security Architecture Design",
        "Compliance & Risk Management"
      ],
      skills: ["System Administration", "Network Security", "Log Analysis", "Policy Development"],
      level: "All Levels"
    },
  ];

  const closeModal = () => setSelectedFeature(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative min-h-screen cyber-bg">
      {/* Hacking Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <HackingIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto cyber-card rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-dark-700/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${selectedFeature.color}15` }}
                >
                  <selectedFeature.icon className="w-8 h-8" style={{ color: selectedFeature.color }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-cyber mb-1">{selectedFeature.title}</h2>
                  <span 
                    className="inline-block px-3 py-1 text-xs font-mono rounded-full"
                    style={{ backgroundColor: `${selectedFeature.color}20`, color: selectedFeature.color }}
                  >
                    {selectedFeature.level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8">
                {selectedFeature.fullDesc}
              </p>

              {/* Topics Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaBookOpen className="w-4 h-4" style={{ color: selectedFeature.color }} />
                  <h3 className="text-white font-semibold">Topics Covered</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedFeature.topics.map((topic, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/30 border border-gray-800"
                    >
                      <FaCheckCircle className="w-4 h-4 shrink-0" style={{ color: selectedFeature.color }} />
                      <span className="text-gray-300 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaTools className="w-4 h-4" style={{ color: selectedFeature.color }} />
                  <h3 className="text-white font-semibold">Skills You'll Develop</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFeature.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-dark-800/50 border border-gray-700 text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link to={`/search?category=${selectedFeature.title.toLowerCase().replace(' ', '-')}`}>
                <button 
                  className="w-full cyber-btn py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 group"
                  onClick={closeModal}
                >
                  <HiLightningBolt className="w-5 h-5" />
                  EXPLORE {selectedFeature.title.toUpperCase()} ARTICLES
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Decorative Elements */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: selectedFeature.color }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ff41]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-[#bf00ff]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-[90vh] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00ff41]/30"
              >
                <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                <span className="text-[#00ff41] text-sm font-mono">SYSTEM ACTIVE</span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  <span className="text-white">Master the Art of</span>
                  <br />
                  <span className="gradient-text font-cyber">CYBER SECURITY</span>
                </h1>
              </motion.div>

              {/* Typing Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-16"
              >
                <TypeAnimation
                  sequence={[
                    "{ Exploit. Learn. Defend. }",
                    2000,
                    "{ Penetration Testing }",
                    2000,
                    "{ Network Security }",
                    2000,
                    "{ Ethical Hacking }",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-xl md:text-2xl font-mono text-[#00ff41]"
                />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-gray-400 text-lg max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Dive deep into the world of cybersecurity. From beginner tutorials to advanced exploitation techniques, 
                we've got you covered.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/search">
                  <button className="cyber-btn px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-3 group">
                    <HiLightningBolt className="w-5 h-5" />
                    EXPLORE ARTICLES
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { value: "50+", label: "Articles" },
                  { value: "10K+", label: "Readers" },
                  { value: "100%", label: "Free" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-[#00ff41] font-mono">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Decorative */}
            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                {/* Terminal Window */}
                <div className="glass rounded-2xl p-6 border border-[#00ff41]/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-gray-500 text-sm font-mono">terminal@babyhacker</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-gray-500">$ whoami</div>
                    <div className="text-[#00ff41]">cyber_security_enthusiast</div>
                    <div className="text-gray-500 mt-4">$ cat mission.txt</div>
                    <div className="text-[#00d4ff]">Educating the next generation of security professionals...</div>
                    <div className="text-gray-500 mt-4">$ ./start_learning.sh</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00ff41]">[+] Initializing knowledge base...</span>
                      <span className="animate-pulse">█</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 glass rounded-2xl flex items-center justify-center border border-[#00d4ff]/30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaCode className="w-10 h-10 text-[#00d4ff]" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 glass rounded-2xl flex items-center justify-center border border-[#bf00ff]/30"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FaServer className="w-8 h-8 text-[#bf00ff]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cyber">
              What You'll <span className="text-[#00ff41]">Learn</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive cybersecurity education covering everything from basics to advanced techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cyber-card rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedFeature(feature)}
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)` 
                  }}
                />
                
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 relative z-10"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-7 h-7 transition-transform group-hover:scale-110" style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-500 text-sm relative z-10">{feature.desc}</p>
                
                {/* Click indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: feature.color }}>
                  <span>Learn more</span>
                  <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <CallToAction />
      </motion.div>

      {/* Recent Posts Section */}
      <motion.section
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {posts && posts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-cyber">
                    Latest <span className="text-[#00d4ff]">Articles</span>
                  </h2>
                  <p className="text-gray-500">Fresh content from the security frontier</p>
                </div>
                <Link
                  to="/search"
                  className="hidden md:flex items-center gap-2 text-[#00ff41] hover:text-[#00d4ff] transition-colors group"
                >
                  View All
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center md:hidden">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 text-[#00ff41] hover:text-[#00d4ff] transition-colors"
                >
                  View All Articles
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
