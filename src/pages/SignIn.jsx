import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaLock, FaEnvelope, FaTerminal, FaCheckCircle, FaSkull } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

// Hacking Loading Screen Component
function HackingLoader({ onComplete, success, errorMsg }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const hackingSteps = [
    { text: "Initializing secure connection...", delay: 400 },
    { text: "Encrypting authentication payload...", delay: 600 },
    { text: "Bypassing firewall protocols...", delay: 500 },
    { text: "Verifying credentials hash...", delay: 700 },
    { text: "Establishing encrypted tunnel...", delay: 500 },
    { text: "Accessing user database...", delay: 600 },
    { text: "Validating session token...", delay: 400 },
    { text: "Decrypting user privileges...", delay: 500 },
  ];

  useEffect(() => {
    if (currentStep < hackingSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(((currentStep + 1) / hackingSteps.length) * 100);
      }, hackingSteps[currentStep].delay);
      return () => clearTimeout(timer);
    } else {
      // Show result after all steps complete
      setTimeout(() => setShowResult(true), 300);
      setTimeout(() => onComplete(), success ? 1500 : 2000);
    }
  }, [currentStep, success]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
    >
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff41] font-mono text-xs"
            style={{ left: `${i * 5}%` }}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {[...Array(30)].map((_, j) => (
              <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg p-8">
        {/* Terminal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="cyber-card rounded-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-dark-800/80 border-b border-gray-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-500 text-sm font-mono">auth_system@babyhacker ~ sudo ./access.sh</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm min-h-[350px]">
            {/* ASCII Art Header */}
            <pre className="text-[#00ff41] text-xs mb-4 hidden sm:block">
{`╔═══════════════════════════════════════════╗
║  ██████╗  █████╗ ██████╗ ██╗   ██╗        ║
║  ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝        ║
║  ██████╔╝███████║██████╔╝ ╚████╔╝         ║
║  ██╔══██╗██╔══██║██╔══██╗  ╚██╔╝          ║
║  ██████╔╝██║  ██║██████╔╝   ██║           ║
║  ╚═════╝ ╚═╝  ╚═╝╚═════╝    ╚═╝  HACKER   ║
╚═══════════════════════════════════════════╝`}
            </pre>

            <div className="text-[#00d4ff] mb-4">
              [SYSTEM] Authentication sequence initiated...
            </div>

            {/* Steps */}
            <div className="space-y-2 mb-6">
              {hackingSteps.slice(0, currentStep).map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#00ff41]">[✓]</span>
                  <span className="text-gray-400">{step.text}</span>
                </motion.div>
              ))}
              {currentStep < hackingSteps.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-yellow-500 animate-pulse">[→]</span>
                  <span className="text-white">{hackingSteps[currentStep].text}</span>
                  <span className="animate-pulse">█</span>
                </motion.div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">PROGRESS</span>
                <span className="text-[#00ff41]">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden border border-gray-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00ff41] to-[#00d4ff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border ${
                    success 
                      ? 'bg-[#00ff41]/10 border-[#00ff41]/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  {success ? (
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-6 h-6 text-[#00ff41]" />
                      <div>
                        <div className="text-[#00ff41] font-bold">ACCESS GRANTED</div>
                        <div className="text-gray-400 text-xs">Welcome back, agent. Redirecting to dashboard...</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <FaSkull className="w-6 h-6 text-red-500" />
                      <div>
                        <div className="text-red-500 font-bold">ACCESS DENIED</div>
                        <div className="text-gray-400 text-xs">{errorMsg || "Invalid credentials. Authentication failed."}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Random Hex Data Animation */}
            {!showResult && (
              <div className="text-[#00ff41]/30 text-xs font-mono break-all mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    {[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showHackingLoader, setShowHackingLoader] = useState(false);
  const [loginResult, setLoginResult] = useState({ success: false, error: null });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    
    // Show hacking loader
    setShowHackingLoader(true);
    
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        setLoginResult({ success: false, error: data.message });
        dispatch(signInFailure(data.message));
      } else if (res.ok) {
        setLoginResult({ success: true, error: null });
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      setLoginResult({ success: false, error: error.message });
      dispatch(signInFailure(error.message));
    }
  };

  const handleLoaderComplete = () => {
    setShowHackingLoader(false);
    if (loginResult.success) {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen cyber-bg flex items-center justify-center py-12 px-4">
      {/* Hacking Loading Screen */}
      <AnimatePresence>
        {showHackingLoader && (
          <HackingLoader 
            onComplete={handleLoaderComplete}
            success={loginResult.success}
            errorMsg={loginResult.error}
          />
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00ff41]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8"
      >
        {/* Left - Branding */}
        <div className="hidden md:flex flex-col justify-center p-8">
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <div className="relative">
              <FaShieldAlt className="w-12 h-12 text-[#00ff41] group-hover:text-[#00d4ff] transition-colors" />
              <div className="absolute inset-0 bg-[#00ff41] blur-xl opacity-20" />
            </div>
            <span className="text-3xl font-bold tracking-wider font-cyber">
              <span className="text-[#00ff41]">BABY</span>
              <span className="text-[#00d4ff]">HACKER</span>
            </span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Access Your <span className="text-[#00ff41]">Security Hub</span>
          </h1>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Sign in to access exclusive cybersecurity content, track your learning progress, 
            and join our community of security enthusiasts.
          </p>

          {/* Terminal Style Info */}
          <div className="glass rounded-xl p-6 font-mono text-sm">
            <div className="flex items-center gap-2 text-[#00ff41] mb-3">
              <FaTerminal className="w-4 h-4" />
              <span>system_access.sh</span>
            </div>
            <div className="space-y-2 text-gray-500">
              <div><span className="text-[#00d4ff]">→</span> Secure authentication enabled</div>
              <div><span className="text-[#00d4ff]">→</span> End-to-end encryption active</div>
              <div><span className="text-[#00d4ff]">→</span> Multi-factor support available</div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="cyber-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00ff41]/30 mb-4">
              <HiLightningBolt className="w-4 h-4 text-[#00ff41]" />
              <span className="text-[#00ff41] text-sm font-mono">SECURE LOGIN</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-cyber">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">Enter your credentials to continue</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="agent@babyhacker.com"
                  id="email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••••"
                  id="password"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FaShieldAlt className="w-4 h-4" />
                  ACCESS SYSTEM
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-800 text-gray-500">or continue with</span>
              </div>
            </div>

            <OAuth />
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-[#00ff41] hover:text-[#00d4ff] transition-colors">
              Create Account
            </Link>
          </p>

          {errorMessage && (
            <Alert className="mt-5 bg-red-500/10 border border-red-500/30 text-red-400" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </motion.div>
    </div>
  );
}
