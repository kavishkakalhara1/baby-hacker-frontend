import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaCalendar, FaArrowLeft, FaShare, FaBookmark } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen bg-dark-900'>
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 bg-[#00ff41] blur-xl opacity-20 animate-pulse" />
          </div>
          <p className="mt-4 text-gray-500 font-mono text-sm">Loading article...</p>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen cyber-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#00ff41]/5 rounded-full blur-3xl" />
        <div className="absolute top-60 right-20 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      </div>

      <motion.main 
        className='relative z-10 max-w-4xl mx-auto px-6 py-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/search" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00ff41] transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Category */}
          <Link to={`/search?category=${post && post.category}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#00ff41] bg-[#00ff41]/10 rounded-full border border-[#00ff41]/30 hover:bg-[#00ff41]/20 transition-colors mb-6">
              <FaShieldAlt className="w-3 h-3" />
              {post && post.category}
            </span>
          </Link>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6'>
            {post && post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <FaCalendar className="w-4 h-4 text-[#00d4ff]" />
              <span>{post && new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-[#00d4ff]" />
              <span>{post && (post.content.length / 1000).toFixed(0)} min read</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="p-3 rounded-xl bg-dark-700/50 border border-gray-700 text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50 transition-all">
              <FaShare className="w-4 h-4" />
            </button>
            <button className="p-3 rounded-xl bg-dark-700/50 border border-gray-700 text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all">
              <FaBookmark className="w-4 h-4" />
            </button>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12 rounded-2xl overflow-hidden"
        >
          <img
            src={post && post.image}
            alt={post && post.title}
            className='w-full max-h-[500px] object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='cyber-card rounded-2xl p-8 md:p-12 mb-12'
        >
          <div
            className='post-content prose prose-invert max-w-none'
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          />
        </motion.article>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <CallToAction />
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="cyber-card rounded-2xl p-8 mb-12"
        >
          <CommentSection postId={post._id} />
        </motion.div>

        {/* Recent Articles */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className='text-2xl font-bold text-white font-cyber'>
              More <span className="text-[#00ff41]">Articles</span>
            </h2>
            <Link
              to="/search"
              className="flex items-center gap-2 text-[#00ff41] hover:text-[#00d4ff] transition-colors group text-sm"
            >
              View All
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recentPosts &&
              recentPosts.map((post, idx) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}