import { Link } from 'react-router-dom';
import { HiArrowRight, HiClock } from 'react-icons/hi';
import { FaShieldAlt } from 'react-icons/fa';

export default function PostCard({ post }) {
  return (
    <div className='cyber-card group relative w-full h-[420px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]'>
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00ff41]/10 to-transparent" />
      </div>
      
      {/* Image Container */}
      <Link to={`/post/${post.slug}`} className="block relative overflow-hidden">
        <div className="relative h-[220px] overflow-hidden">
          <img
            src={post.image}
            alt='post cover'
            className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75'
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#00ff41] bg-dark-900/80 backdrop-blur-sm rounded-full border border-[#00ff41]/30">
              <FaShieldAlt className="w-3 h-3" />
              {post.category}
            </span>
          </div>
          
          {/* Read Time */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-300 bg-dark-900/80 backdrop-blur-sm rounded-full">
              <HiClock className="w-3 h-3" />
              5 min
            </span>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className='relative flex flex-col gap-3 p-5 pb-20'>
        {/* Title */}
        <Link to={`/post/${post.slug}`}>
          <h3 className='text-lg font-semibold text-white line-clamp-2 group-hover:text-[#00ff41] transition-colors duration-300'>
            {post.title}
          </h3>
        </Link>
        
        {/* Date */}
        <p className="text-xs text-gray-500 font-mono">
          {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Read More Button - Outside content div */}
      <Link
        to={`/post/${post.slug}`}
        className='absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#00ff41]/10 hover:border-[#00ff41]/40'
      >
        Read Article
        <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}