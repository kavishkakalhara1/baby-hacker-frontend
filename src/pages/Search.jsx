import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown, FaTag } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import PostCard from '../components/PostCard';

export default function Search() {
  const { theme } = useSelector((state) => state.theme);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    { value: 'uncategorized', label: 'All Categories' },
    { value: 'ethical-hacking', label: 'Ethical Hacking' },
    { value: 'network-security', label: 'Network Security' },
    { value: 'penetration-testing', label: 'Penetration Testing' },
    { value: 'security-tools', label: 'Security Tools' },
    { value: 'web-security', label: 'Web Security' },
    { value: 'tutorials', label: 'Tutorials' },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen cyber-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#00ff41]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00ff41]/30 mb-6">
            <FaSearch className="w-4 h-4 text-[#00ff41]" />
            <span className="text-[#00ff41] text-sm font-mono">SEARCH DATABASE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cyber">
            Explore <span className="text-[#00ff41]">Articles</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Search through our collection of cybersecurity tutorials, guides, and research articles
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cyber-card rounded-2xl p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search articles..."
                id="searchTerm"
                value={sidebarData.searchTerm || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-1 transition-all ${
                  theme === 'light'
                    ? 'text-gray-700 placeholder-gray-400 bg-white border border-gray-300 focus:border-emerald-500/50 focus:ring-emerald-500/20'
                    : 'text-gray-300 placeholder-gray-600 bg-dark-800/50 border border-gray-700 focus:border-[#00ff41]/50 focus:ring-[#00ff41]/20'
                }`}
              />
            </div>

            {/* Sort Select */}
            <div className="relative min-w-[150px]">
              <FaSortAmountDown className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                id="sort"
                value={sidebarData.sort}
                onChange={handleChange}
                className={`w-full px-4 py-3 pl-11 pr-10 rounded-xl focus:outline-none appearance-none cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'text-gray-700 bg-white border border-gray-300 focus:border-emerald-500/50'
                    : 'text-gray-300 bg-dark-800/50 border border-gray-700 focus:border-[#00ff41]/50'
                }`}
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
              <HiChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Category Select */}
            <div className="relative min-w-[180px]">
              <FaTag className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                id="category"
                value={sidebarData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 pl-11 pr-10 rounded-xl focus:outline-none appearance-none cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'text-gray-700 bg-white border border-gray-300 focus:border-emerald-500/50'
                    : 'text-gray-300 bg-dark-800/50 border border-gray-700 focus:border-[#00ff41]/50'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <HiChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cyber-btn px-8 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              Apply Filters
            </button>
          </form>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-gray-400">
            Found <span className="text-[#00ff41] font-mono">{posts.length}</span> articles
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="text-center">
                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto ${
                  theme === 'dark' ? 'border-[#00ff41]' : 'border-emerald-500'
                }`}></div>
                <p className={`mt-4 font-mono text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>Scanning database...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full cyber-card rounded-2xl p-12 text-center"
            >
              <FaSearch className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-gray-500">Try adjusting your search filters or explore our latest content</p>
            </motion.div>
          ) : (
            posts.map((post, idx) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </div>

        {/* Show More Button */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleShowMore}
              className="cyber-btn px-8 py-3 rounded-xl text-sm font-semibold"
            >
              Load More Articles
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}