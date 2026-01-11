import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export default function ScrollToTopButton() {
  const { theme } = useSelector((state) => state.theme);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-xl transition-all duration-300 group ${
            theme === 'dark'
              ? 'bg-[#12121a] border border-[#00ff41]/30 hover:border-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]'
              : 'bg-white border border-emerald-300 hover:border-emerald-500 hover:shadow-lg shadow-md'
          }`}
          aria-label="Scroll to top"
        >
          {/* Glow effect for dark mode */}
          {theme === 'dark' && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#00ff41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Arrow icon */}
          <HiArrowUp
            className={`w-6 h-6 relative z-10 transition-all duration-300 ${
              theme === 'dark'
                ? 'text-[#00ff41] group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]'
                : 'text-emerald-600 group-hover:text-emerald-700'
            }`}
          />

          {/* Animated ring effect */}
          <span
            className={`absolute inset-0 rounded-xl animate-ping opacity-20 ${
              theme === 'dark' ? 'bg-[#00ff41]' : 'bg-emerald-500'
            }`}
            style={{ animationDuration: '2s' }}
          />

          {/* Terminal-style label on hover (dark mode only) */}
          {theme === 'dark' && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0a0a0f] border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {'>'} scroll_top()
            </span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
