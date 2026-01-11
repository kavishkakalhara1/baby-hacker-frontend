import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaLock, FaBug, FaTerminal, FaCode, FaServer } from "react-icons/fa";
import { HiLightningBolt, HiArrowRight } from "react-icons/hi";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  const projects = [
    {
      title: "Network Scanner",
      description: "A Python-based network scanning tool for discovering hosts and open ports on a network.",
      tags: ["Python", "Networking", "Security"],
      icon: FaServer,
      color: "#00ff41",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
    {
      title: "Password Analyzer",
      description: "Tool to analyze password strength and check against common breach databases.",
      tags: ["Python", "Security", "API"],
      icon: FaLock,
      color: "#00d4ff",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
    {
      title: "XSS Detection Tool",
      description: "Automated cross-site scripting vulnerability scanner for web applications.",
      tags: ["JavaScript", "Web Security", "Automation"],
      icon: FaBug,
      color: "#bf00ff",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
    {
      title: "Secure File Encryptor",
      description: "File encryption utility using AES-256 encryption for secure data protection.",
      tags: ["Python", "Cryptography", "Security"],
      icon: FaShieldAlt,
      color: "#ff006e",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
    {
      title: "Log Analyzer",
      description: "Security log analysis tool for detecting anomalies and potential threats.",
      tags: ["Python", "Analysis", "Monitoring"],
      icon: FaTerminal,
      color: "#00ff41",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
    {
      title: "API Security Tester",
      description: "REST API security testing framework for identifying vulnerabilities.",
      tags: ["Python", "API", "Testing"],
      icon: FaCode,
      color: "#00d4ff",
      github: "https://github.com/kavishkakalhara1",
      demo: "#",
    },
  ];

  return (
    <div className="relative min-h-screen cyber-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#00ff41]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bf00ff]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#bf00ff]/30 mb-6"
          >
            <HiLightningBolt className="w-4 h-4 text-[#bf00ff]" />
            <span className="text-[#bf00ff] text-sm font-mono">SECURITY TOOLS</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-cyber"
          >
            Open Source <span className="gradient-text">Projects</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Explore our collection of cybersecurity tools and projects. 
            All open source and ready to help you learn and protect.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="cyber-card rounded-2xl p-6 group"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${project.color}15` }}
              >
                <project.icon className="w-7 h-7" style={{ color: project.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff41] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 text-xs font-mono text-gray-400 bg-dark-700/50 rounded-md border border-gray-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-300 bg-dark-700/50 border border-gray-700 rounded-xl hover:border-gray-500 hover:text-white transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-xl hover:bg-[#00ff41]/20 transition-all"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cyber-card rounded-2xl p-8 md:p-12 text-center mb-20"
        >
          <FaGithub className="w-16 h-16 text-[#00ff41] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 font-cyber">
            Want to <span className="text-[#00ff41]">Contribute</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            All our projects are open source. Feel free to contribute, report issues, 
            or suggest new features. Together, we make security better.
          </p>
          <a
            href="https://github.com/kavishkakalhara1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 cyber-btn px-8 py-4 rounded-xl text-sm font-semibold group"
          >
            <FaGithub className="w-5 h-5" />
            VIEW ON GITHUB
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CallToAction />
        </motion.div>
      </motion.div>
    </div>
  );
}
