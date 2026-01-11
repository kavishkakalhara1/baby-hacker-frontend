import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaShieldAlt, FaTerminal, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState, useRef } from "react";
import logoLight from "../assets/BabyHackerTextLogo.png";
import logoDark from "../assets/BabyHackerTextLogo_White.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const logo = theme === "light" ? logoLight : logoDark;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <nav className={`mx-auto max-w-7xl px-4 md:px-6 transition-all duration-300 ${
        scrolled 
          ? 'glass rounded-2xl shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <FaShieldAlt className={`w-8 h-8 transition-colors duration-300 pulse-glow ${
                theme === "light" ? "text-emerald-600 group-hover:text-sky-600" : "text-[#00ff41] group-hover:text-[#00d4ff]"
              }`} />
              <div className={`absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity ${
                theme === "light" ? "bg-emerald-500" : "bg-[#00ff41]"
              }`} />
            </div>
            <span className="text-xl font-bold tracking-wider font-cyber">
              <span className={theme === "light" ? "text-emerald-600" : "text-[#00ff41]"}>Baby</span>
              <span className={theme === "light" ? "text-sky-600" : "text-[#00d4ff]"}>Hacker</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSubmit} className="flex-1 hidden max-w-md mx-8 lg:flex">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search exploits, tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2.5 pl-11 text-sm placeholder-gray-500 rounded-xl focus:outline-none transition-all duration-300 ${
                  theme === "light"
                    ? "text-gray-700 bg-white/70 border border-gray-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    : "text-gray-300 bg-dark-800/50 border border-gray-700/50 focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20"
                }`}
              />
              <AiOutlineSearch className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                theme === "light" ? "text-gray-400 group-focus-within:text-emerald-600" : "text-gray-500 group-focus-within:text-[#00ff41]"
              }`} />
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                theme === "light"
                  ? "bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-sky-500/0"
                  : "bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/5 to-[#00d4ff]/0"
              }`} />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/50 border-gray-300 text-gray-600 hover:text-emerald-600 hover:border-emerald-500/50"
                  : "bg-dark-800/50 border-gray-700/50 text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative group focus:outline-none"
                >
                  <div className={`absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity ${
                    theme === "light" 
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500" 
                      : "bg-gradient-to-r from-[#00ff41] to-[#00d4ff]"
                  }`} />
                  <img 
                    src={currentUser.profilePicture} 
                    alt="user"
                    className={`relative w-10 h-10 rounded-full object-cover ring-2 ${
                      theme === "light" ? "ring-emerald-500/30" : "ring-[#00ff41]/30"
                    }`}
                  />
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl z-50 border ${
                    theme === "light"
                      ? "bg-white border-gray-200"
                      : "bg-dark-800 border-gray-700/50"
                  }`}>
                    {/* Header */}
                    <div className={`px-4 py-3 border-b ${
                      theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-dark-900/50"
                    }`}>
                      <span className={`block text-sm font-mono ${
                        theme === "light" ? "text-emerald-600" : "text-[#00ff41]"
                      }`}>@{currentUser.username}</span>
                      <span className="block text-sm text-gray-400 truncate">
                        {currentUser.email}
                      </span>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/dashboard?tab=profile"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                          theme === "light"
                            ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                            : "text-gray-300 hover:bg-[#00ff41]/10 hover:text-[#00ff41]"
                        }`}
                      >
                        <FaUser className="mr-3 w-4 h-4" /> Profile
                      </Link>
                      
                      {currentUser.isAdmin && (
                        <Link
                          to="/dashboard?tab=dash"
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                            theme === "light"
                              ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                              : "text-gray-300 hover:bg-[#00ff41]/10 hover:text-[#00ff41]"
                          }`}
                        >
                          <FaShieldAlt className="mr-3 w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      
                      <div className={`my-1 border-t ${
                        theme === "light" ? "border-gray-200" : "border-gray-700"
                      }`} />
                      
                      <button
                        onClick={() => {
                          handleSignout();
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${
                          theme === "light"
                            ? "text-gray-700 hover:bg-red-50 hover:text-red-600"
                            : "text-gray-300 hover:bg-red-500/10 hover:text-red-400"
                        }`}
                      >
                        <FaSignOutAlt className="mr-3 w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign-in">
                <button className="cyber-btn px-6 py-2.5 rounded-xl text-sm font-medium">
                  Access System
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/50 border-gray-300 text-gray-600 hover:text-emerald-600 hover:border-emerald-500/50"
                  : "bg-dark-800/50 border-gray-700/50 text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50"
              }`}
            >
              {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`py-3 mt-2 border-t lg:hidden ${
          theme === "light" ? "border-gray-200/50" : "border-gray-800/50"
        }`}>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2.5 pl-11 text-sm placeholder-gray-500 rounded-xl focus:outline-none transition-all ${
                theme === "light"
                  ? "text-gray-700 bg-white/70 border border-gray-300 focus:border-emerald-500/50"
                  : "text-gray-300 bg-dark-800/50 border border-gray-700/50 focus:border-[#00ff41]/50"
              }`}
            />
            <AiOutlineSearch className={`absolute -translate-y-1/2 left-4 top-1/2 ${
              theme === "light" ? "text-gray-400" : "text-gray-500"
            }`} />
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-3 border-t ${
            theme === "light" ? "border-gray-200/50" : "border-gray-800/50"
          }`}>
            <div className="flex flex-col gap-1">
              {[
                { path: '/', label: 'Home', icon: '⌂' },
                { path: '/about', label: 'About', icon: '◈' },
                { path: '/projects', label: 'Projects', icon: '⚡' },
                { path: '/search', label: 'Articles', icon: '◉' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    path === item.path
                      ? theme === "light" 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-[#00ff41] bg-[#00ff41]/10'
                      : theme === "light"
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-dark-700/50'
                  }`}
                >
                  <span className="mr-2 opacity-50">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Links - Desktop */}
        <div className="items-center justify-center hidden gap-1 py-2 border-t lg:flex border-gray-800/30">
          {[
            { path: '/', label: 'Home', icon: '⌂' },
            { path: '/about', label: 'About', icon: '◈' },
            { path: '/projects', label: 'Projects', icon: '⚡' },
            { path: '/search', label: 'Articles', icon: '◉' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                path === item.path
                  ? 'text-[#00ff41]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2 opacity-50">{item.icon}</span>
              {item.label}
              {path === item.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00ff41] rounded-full shadow-lg shadow-[#00ff41]/50" />
              )}
              <span className="absolute inset-0 rounded-lg bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 transition-colors" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}


