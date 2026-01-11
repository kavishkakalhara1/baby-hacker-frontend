import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaShieldAlt, FaTerminal, FaBug, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FooterComponent() {
  const { theme } = useSelector((state) => state.theme);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800 to-transparent opacity-95" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 px-6 py-16 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <FaShieldAlt className="w-10 h-10 text-[#00ff41] group-hover:text-[#00d4ff] transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#00ff41] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <span className="text-2xl font-bold tracking-wider font-cyber">
                <span className="text-[#00ff41]">Baby</span>
                <span className="text-[#00d4ff]">Hacker</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Empowering the next generation of cybersecurity experts. Learn, explore, and secure the digital frontier.
            </p>
            {/* Terminal Style Info */}
            <div className="p-4 font-mono text-xs rounded-lg glass-dark">
              <div className="flex items-center gap-2 text-[#00ff41] mb-2">
                <FaTerminal className="w-3 h-3" />
                <span>status: online</span>
              </div>
              <div className="text-gray-500">
                <span className="text-[#00d4ff]">→</span> protecting digital assets since 2024
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 mb-6 text-sm tracking-wider text-white uppercase font-cyber">
              <span className="text-[#00ff41]">◈</span> Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/search', label: 'Articles' },
                { to: '/projects', label: 'Projects' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-[#00ff41] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-gray-600 group-hover:text-[#00ff41] transition-colors">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="flex items-center gap-2 mb-6 text-sm tracking-wider text-white uppercase font-cyber">
              <span className="text-[#00d4ff]">◈</span> Topics
            </h3>
            <ul className="space-y-3">
              {[
                { icon: FaBug, label: 'Ethical Hacking' },
                { icon: FaLock, label: 'Network Security' },
                { icon: FaTerminal, label: 'Penetration Testing' },
                { icon: FaShieldAlt, label: 'Security Tools' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={`/search?category=${item.label.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <item.icon className="w-3 h-3 text-gray-600 group-hover:text-[#00d4ff] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="flex items-center gap-2 mb-6 text-sm tracking-wider text-white uppercase font-cyber">
              <span className="text-[#bf00ff]">◈</span> Connect
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Stay updated with the latest in cybersecurity.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: BsGithub, href: 'https://github.com/kavishkakalhara1', color: 'hover:text-white' },
                { icon: BsLinkedin, href: 'https://www.linkedin.com/in/kavishkakalhara/', color: 'hover:text-[#0077b5]' },
                { icon: BsYoutube, href: 'https://www.youtube.com/@BabyHacker_lk', color: 'hover:text-red-500' },
                { icon: BsTwitterX, href: '#', color: 'hover:text-white' },
                { icon: BsInstagram, href: '#', color: 'hover:text-pink-500' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-dark-700/50 border border-gray-700/50 flex items-center justify-center text-gray-400 ${social.color} hover:border-current transition-all duration-300`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-[#00ff41]">©</span>
            <span>{currentYear} Baby Hacker Cyber Security.</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link to="#" className="text-gray-500 hover:text-[#00ff41] transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 hover:text-[#00ff41] transition-colors">
              Terms of Service
            </Link>
            <span className="font-mono text-xs text-gray-600">
              v3.0.0
            </span>
          </div>
        </div>

        {/* ASCII Art / Decorative Element */}
        <div className="mt-8 text-center">
          <div className="inline-block font-mono text-[10px] text-gray-700 select-none">
            {'<'}<span className="text-[#00ff41]">/</span>{'>'}  <span className="text-gray-600">SECURE THE FUTURE</span>  {'<'}<span className="text-[#00ff41]">/</span>{'>'}
          </div>
        </div>
      </div>
    </footer>
  );
}
