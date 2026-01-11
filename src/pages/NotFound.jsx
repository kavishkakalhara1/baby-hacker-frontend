import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaHome, FaSearch, FaExclamationTriangle, FaSkull, FaTerminal } from 'react-icons/fa'
import { HiArrowRight, HiRefresh } from 'react-icons/hi'

export default function NotFound() {
  const { theme } = useSelector((state) => state.theme);
  const [glitchText, setGlitchText] = useState('404');
  const [scanLine, setScanLine] = useState(0);

  // Glitch effect for 404
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newText = '404'.split('').map((char, i) => 
          Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(newText);
        setTimeout(() => setGlitchText('404'), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative min-h-screen flex items-center justify-center px-6 overflow-hidden ${
      theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-gray-50'
    }`}>
      {/* Animated Grid Background */}
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
      )}

      {/* Scan Line Effect */}
      {theme === 'dark' && (
        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent pointer-events-none"
          style={{ top: `${scanLine}%` }}
        />
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-red-500/10' : 'bg-red-200/30'
          }`} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className={`absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-[#00ff41]/10' : 'bg-emerald-200/30'
          }`}
        />
      </div>

      {/* Floating Particles */}
      {theme === 'dark' && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00ff41]/50 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -200],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Error Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            theme === 'dark' 
              ? 'bg-red-500/10 border border-red-500/30' 
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <FaExclamationTriangle className={`w-4 h-4 animate-pulse ${
            theme === 'dark' ? 'text-red-500' : 'text-red-600'
          }`} />
          <span className={`text-sm font-mono ${
            theme === 'dark' ? 'text-red-500' : 'text-red-600'
          }`}>ACCESS DENIED</span>
          <FaSkull className={`w-4 h-4 ${
            theme === 'dark' ? 'text-red-500' : 'text-red-600'
          }`} />
        </motion.div>

        {/* 404 Number with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          <h1 className="text-[120px] md:text-[180px] font-bold leading-none select-none">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-red-500 via-[#00ff41] to-[#00d4ff]' 
                : 'from-red-500 via-emerald-500 to-sky-500'
            }`}>
              {glitchText}
            </span>
          </h1>
          {/* Glitch layers */}
          <div className="absolute inset-0 text-[120px] md:text-[180px] font-bold leading-none text-red-500/20 blur-xl pointer-events-none">
            404
          </div>
          <motion.div 
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 text-[120px] md:text-[180px] font-bold leading-none text-cyan-500/10 pointer-events-none"
            style={{ clipPath: 'inset(30% 0 30% 0)' }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Terminal Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-2xl p-6 mb-8 text-left font-mono text-sm border ${
            theme === 'dark' 
              ? 'bg-[#12121a] border-[#00ff41]/20' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/30">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <FaTerminal className={`ml-4 w-3 h-3 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
              error_handler.sh
            </span>
          </div>
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}
            >
              <span className="text-gray-500">$</span> ERROR: Requested resource not found
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            >
              <span className="text-gray-500">$</span> PATH: <span className={theme === 'dark' ? 'text-[#00d4ff]' : 'text-sky-600'}>{window.location.pathname}</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            >
              <span className="text-gray-500">$</span> STATUS: <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>404 - NOT FOUND</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className={theme === 'dark' ? 'text-[#00ff41]' : 'text-emerald-600'}
            >
              <span className="text-gray-500">$</span> SOLUTION: Redirecting to valid endpoint...
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1"
              >▊</motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Page Not <span className={theme === 'dark' ? 'text-red-500' : 'text-red-600'}>Found</span>
          </h2>
          <p className={`max-w-md mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The resource you're looking for doesn't exist or has been moved. 
            Please check the URL or navigate back to safety.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/">
            <button className={`px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 group transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#00ff41] to-[#00d4ff] text-black hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]'
                : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-600 hover:to-sky-600 shadow-lg'
            }`}>
              <FaHome className="w-4 h-4" />
              RETURN HOME
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/search">
            <button className={`px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 border border-gray-700 hover:border-[#00d4ff]/50 hover:text-[#00d4ff]'
                : 'text-gray-600 border border-gray-300 hover:border-emerald-400 hover:text-emerald-600 bg-white'
            }`}>
              <FaSearch className="w-4 h-4" />
              Search Articles
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className={`px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 border border-gray-700 hover:border-[#00ff41]/50 hover:text-[#00ff41]'
                : 'text-gray-600 border border-gray-300 hover:border-sky-400 hover:text-sky-600 bg-white'
            }`}
          >
            <HiRefresh className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`mt-12 text-sm font-mono ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          <FaShieldAlt className={`inline w-3 h-3 mr-2 ${
            theme === 'dark' ? 'text-[#00ff41]' : 'text-emerald-500'
          }`} />
          KalShield Security System v3.0
        </motion.p>
      </motion.div>

      {/* CSS for grid animation */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}
