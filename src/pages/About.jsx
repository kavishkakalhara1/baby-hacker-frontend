import { motion } from "framer-motion";
import { FaShieldAlt, FaTerminal, FaBug, FaLock, FaGraduationCap, FaCode, FaUserShield } from "react-icons/fa";
import { HiLightningBolt, HiAcademicCap, HiGlobe } from "react-icons/hi";
import ContactCard from "../components/ContactCard";

export default function About() {
  const skills = [
    { icon: FaBug, label: "Penetration Testing", level: 90 },
    { icon: FaLock, label: "Network Security", level: 85 },
    { icon: FaCode, label: "Security Tools Dev", level: 80 },
    { icon: FaTerminal, label: "Ethical Hacking", level: 88 },
  ];

  const milestones = [
    { year: "2024", title: "Founded Baby Hacker", desc: "Started the cybersecurity blog" },
    { year: "2024", title: "YouTube Channel", desc: "Launched video tutorials" },
    { year: "2025", title: "Community Growth", desc: "10K+ active learners" },
  ];

  return (
    <div className="relative min-h-screen cyber-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#00ff41]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00ff41]/30 mb-6"
            >
              <FaUserShield className="w-4 h-4 text-[#00ff41]" />
              <span className="text-[#00ff41] text-sm font-mono">ABOUT US</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Welcome to{" "}
              <span className="gradient-text font-cyber">Baby Hacker</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
            >
              A cybersecurity education platform dedicated to empowering the next generation 
              of security professionals. Learn ethical hacking, penetration testing, and 
              digital defense strategies.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Mission Card */}
              <div className="cyber-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff41]/10 flex items-center justify-center">
                    <HiLightningBolt className="w-6 h-6 text-[#00ff41]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-cyber">Our Mission</h2>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  At Baby Hacker, we believe cybersecurity knowledge should be accessible to everyone. 
                  Our mission is to demystify the complex world of information security and provide 
                  practical, hands-on education.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Whether you're a complete beginner or an experienced professional, our content 
                  is designed to help you grow and stay ahead of emerging threats.
                </p>
              </div>

              {/* Founder Card */}
              <div className="cyber-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center">
                    <HiAcademicCap className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-cyber">The Founder</h2>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Founded by <span className="text-[#00ff41] font-semibold">Kavishka Kalhara</span>, 
                  a passionate Computer Engineering undergraduate at the University of Ruhuna 
                  with a deep interest in cybersecurity.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  With years of hands-on experience in ethical hacking and security research, 
                  Kavishka shares real-world knowledge and practical techniques through this platform.
                </p>
              </div>

              {/* Skills */}
              <div className="cyber-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 font-cyber">Expertise Areas</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-[#00ff41]" />
                          <span className="text-gray-300 text-sm">{skill.label}</span>
                        </div>
                        <span className="text-[#00ff41] text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#00ff41] to-[#00d4ff] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact & Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Contact Card */}
              <ContactCard />

              {/* Timeline */}
              <div className="cyber-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 font-cyber flex items-center gap-2">
                  <HiGlobe className="w-5 h-5 text-[#bf00ff]" />
                  Our Journey
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                        {idx < milestones.length - 1 && (
                          <div className="w-px h-full bg-gray-700 my-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <span className="text-[#00ff41] text-sm font-mono">{milestone.year}</span>
                        <h4 className="text-white font-semibold mt-1">{milestone.title}</h4>
                        <p className="text-gray-500 text-sm">{milestone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FaShieldAlt, title: "Security First", color: "#00ff41" },
                  { icon: FaGraduationCap, title: "Education", color: "#00d4ff" },
                  { icon: FaTerminal, title: "Hands-On", color: "#bf00ff" },
                  { icon: FaLock, title: "Ethics", color: "#ff006e" },
                ].map((value) => (
                  <div key={value.title} className="cyber-card rounded-xl p-5 text-center">
                    <value.icon className="w-8 h-8 mx-auto mb-3" style={{ color: value.color }} />
                    <span className="text-white text-sm font-medium">{value.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
