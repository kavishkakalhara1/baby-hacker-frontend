import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import React, { useState, useEffect } from "react";
import AnimatedRoutes from "./components/Animatedroutes";
import { motion, AnimatePresence } from "framer-motion";
import { FaSkull, FaExclamationTriangle, FaTerminal } from "react-icons/fa";

// Right-Click Warning Popup Component
function RightClickPopup({ isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative max-w-md mx-4 p-8 rounded-2xl border border-red-500/30 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(18, 18, 26, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
            </div>

            {/* Scan Lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Warning Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 mb-6"
              >
                <FaExclamationTriangle className="w-10 h-10 text-red-500" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-red-500 font-cyber mb-2 tracking-wider">
                ACCESS DENIED
              </h2>

              {/* Terminal Style Message */}
              <div className="bg-black/50 rounded-xl p-4 mb-4 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 font-mono">
                  <FaTerminal className="w-3 h-3" />
                  <span>security_alert.log</span>
                </div>
                <div className="font-mono text-sm text-left space-y-1">
                  <div className="text-red-400">[WARNING] Unauthorized action detected</div>
                  <div className="text-gray-400">[INFO] Right-click is disabled on this site</div>
                  <div className="text-[#00ff41]">[STATUS] Nice try, hacker! 😎</div>
                </div>
              </div>

              {/* Subtext */}
              <p className="text-gray-400 text-sm">
                This action has been logged. Click anywhere to dismiss.
              </p>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Background Skull Click Effect Component
function SkullClickEffect({ clicks }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.08, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
            style={{
              left: click.x - 100,
              top: click.y - 100,
            }}
          >
            <FaSkull className="w-[200px] h-[200px] text-[#00ff41]" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Center Skull - Appears on any click */}
      <AnimatePresence>
        {clicks.length > 0 && (
          <motion.div
            key="center-skull"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 0.04, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <FaSkull className="w-[500px] h-[500px] text-[#00ff41]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [showRightClickPopup, setShowRightClickPopup] = useState(false);
  const [skullClicks, setSkullClicks] = useState([]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowRightClickPopup(true);
    };

    // Disable right-click
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Handle click for skull effect
  useEffect(() => {
    const handleClick = (e) => {
      // Check if click is on an interactive element
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
      const isInteractive = interactiveElements.includes(e.target.tagName) || 
                           e.target.closest('a, button, input, textarea, select, [role="button"], [onclick]');
      
      if (!isInteractive) {
        const newClick = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        
        setSkullClicks(prev => [...prev, newClick]);
        
        // Remove click after animation
        setTimeout(() => {
          setSkullClicks(prev => prev.filter(click => click.id !== newClick.id));
        }, 2000);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <BrowserRouter >
      {/* Background Skull Effect */}
      <SkullClickEffect clicks={skullClicks} />
      
      <RightClickPopup 
        isVisible={showRightClickPopup} 
        onClose={() => setShowRightClickPopup(false)} 
      />
      <ScrollToTop />
      <ScrollToTopButton />
      <Header/>
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
