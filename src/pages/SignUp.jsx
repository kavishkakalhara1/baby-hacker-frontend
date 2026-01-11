import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaEnvelope, FaUser, FaTerminal } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen cyber-bg flex items-center justify-center py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#bf00ff]/10 rounded-full blur-3xl" />
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
            Join Our <span className="text-[#00d4ff]">Security Network</span>
          </h1>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Create your account and get access to exclusive cybersecurity tutorials, 
            community discussions, and learning resources.
          </p>

          {/* Terminal Style Info */}
          <div className="glass rounded-xl p-6 font-mono text-sm">
            <div className="flex items-center gap-2 text-[#00d4ff] mb-3">
              <FaTerminal className="w-4 h-4" />
              <span>create_account.sh</span>
            </div>
            <div className="space-y-2 text-gray-500">
              <div><span className="text-[#00ff41]">→</span> Free lifetime access</div>
              <div><span className="text-[#00ff41]">→</span> Exclusive content unlocked</div>
              <div><span className="text-[#00ff41]">→</span> Join 10K+ security enthusiasts</div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="cyber-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30 mb-4">
              <HiUserAdd className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-mono">NEW AGENT</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-cyber">Create Account</h2>
            <p className="text-gray-500 text-sm mt-2">Initialize your security profile</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="agent_codename"
                  id="username"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="agent@babyhacker.com"
                  id="email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all"
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
                  className="w-full px-4 py-3 pl-11 text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                <>
                  <FaShieldAlt className="w-4 h-4" />
                  CREATE ACCOUNT
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
            Already have an account?{" "}
            <Link to="/sign-in" className="text-[#00ff41] hover:text-[#00d4ff] transition-colors">
              Sign In
            </Link>
          </p>

          {errorMessage && (
            <div className="mt-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}