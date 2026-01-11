import { FaYoutube, FaPlay, FaShieldAlt } from "react-icons/fa";
import { HiArrowRight, HiLightningBolt } from "react-icons/hi";

export default function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#00ff41]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30">
              <FaYoutube className="w-4 h-4 text-red-500" />
              <span className="text-[#00d4ff] text-sm font-mono">VIDEO TUTORIALS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Level Up Your
              <br />
              <span className="gradient-text font-cyber">Hacking Skills</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Join our YouTube channel for in-depth video tutorials, live hacking sessions, 
              and step-by-step guides on cybersecurity.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@BabyHacker_lk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="cyber-btn px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-3 group">
                  <FaPlay className="w-4 h-4" />
                  WATCH NOW
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              
              <button className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-300 border border-gray-700 hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-all duration-300 flex items-center gap-2">
                <HiLightningBolt className="w-4 h-4" />
                Subscribe
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-gray-800">
              {[
                { value: "100+", label: "Videos" },
                { value: "5K+", label: "Subscribers" },
                { value: "Weekly", label: "Uploads" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#00d4ff] font-mono">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative glass rounded-3xl p-2 border border-[#00ff41]/20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
                  alt="Cybersecurity"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                
                {/* Play Button */}
                <a
                  href="https://www.youtube.com/@BabyHacker_lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00ff41]/20 backdrop-blur-sm border border-[#00ff41]/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00ff41]/30 transition-all duration-300">
                    <FaPlay className="w-8 h-8 text-[#00ff41] ml-1" />
                  </div>
                </a>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <FaShieldAlt className="w-5 h-5 text-[#00ff41]" />
                    <span className="text-[#00ff41] text-sm font-mono">LATEST VIDEO</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold">
                    Introduction to Penetration Testing
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 glass rounded-2xl flex items-center justify-center border border-red-500/30 animate-pulse">
              <FaYoutube className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
