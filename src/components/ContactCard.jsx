import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { HiLocationMarker, HiAcademicCap } from "react-icons/hi";
import portraitImg from "../assets/my.jpg";

export default function ContactCard() {
  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/94701117791", label: "WhatsApp", color: "#25D366" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/kavishkakalhara/", label: "LinkedIn", color: "#0077B5" },
    { icon: FaGithub, href: "https://github.com/kavishkakalhara1", label: "GitHub", color: "#ffffff" },
    { icon: FaEnvelope, href: "mailto:contact@babyhacker.lk", label: "Email", color: "#00d4ff" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card rounded-2xl p-8 text-center"
    >
      {/* Profile Image */}
      <div className="relative inline-block mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff41] via-[#00d4ff] to-[#bf00ff] rounded-full blur opacity-30" />
        <img
          alt="Kavishka Kalhara"
          src={portraitImg}
          loading="lazy"
          className="relative w-28 h-28 rounded-full object-cover border-2 border-dark-600 transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105"
        />
        {/* Online Indicator */}
        <span className="absolute bottom-2 right-2 w-4 h-4 bg-[#00ff41] rounded-full border-2 border-dark-800 animate-pulse" />
      </div>

      {/* Name & Title */}
      <h3 className="text-2xl font-bold text-white mb-2 font-cyber">
        Kavishka Kalhara
      </h3>
      <p className="text-[#00ff41] text-sm font-mono mb-4">
        @kavishkakalhara
      </p>

      {/* Info Tags */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 bg-dark-700/50 rounded-full border border-gray-700">
          <HiAcademicCap className="w-3 h-3 text-[#00d4ff]" />
          Computer Engineering
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 bg-dark-700/50 rounded-full border border-gray-700">
          <HiLocationMarker className="w-3 h-3 text-[#bf00ff]" />
          University of Ruhuna
        </span>
      </div>

      {/* Bio */}
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Cybersecurity enthusiast passionate about ethical hacking, 
        penetration testing, and security research.
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-3 mb-6">
        {socialLinks.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-dark-700/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-current transition-all duration-300"
            style={{ '--hover-color': social.color }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = social.color;
              e.currentTarget.style.borderColor = social.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
              e.currentTarget.style.borderColor = '';
            }}
            title={social.label}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>

      {/* Contact Button */}
      <motion.a
        href="https://wa.me/94701117791"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cyber-btn w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
      >
        <FaWhatsapp className="w-4 h-4" />
        Get In Touch
      </motion.a>

      {/* Terminal Style Footer */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="font-mono text-xs text-gray-600">
          <span className="text-[#00ff41]">$</span> status: <span className="text-[#00d4ff]">available for collaboration</span>
        </div>
      </div>
    </motion.div>
  );
}
