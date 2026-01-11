import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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

  const SidebarItem = ({ icon: Icon, label, to, active, badge, onClick }) => {
    const content = (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
          active
            ? theme === 'light'
              ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/10 text-emerald-600 border border-emerald-500/30'
              : 'bg-gradient-to-r from-[#00ff41]/20 to-[#00d4ff]/10 text-[#00ff41] border border-[#00ff41]/30'
            : theme === 'light'
              ? 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600 border border-transparent'
              : 'text-gray-400 hover:bg-dark-700/50 hover:text-[#00ff41] border border-transparent'
        }`}
        onClick={onClick}
      >
        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
          active 
            ? theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'
            : ''
        }`} />
        <span className="font-medium">{label}</span>
        {badge && (
          <span className={`ml-auto px-2 py-0.5 text-xs rounded-full font-mono ${
            theme === 'light'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-[#00ff41]/20 text-[#00ff41]'
          }`}>
            {badge}
          </span>
        )}
      </div>
    );

    if (to) {
      return <Link to={to}>{content}</Link>;
    }
    return content;
  };

  return (
    <aside className={`w-full h-full md:min-h-screen md:sticky md:top-0 p-4 ${
      theme === 'light' 
        ? 'bg-white/50 border-r border-gray-200' 
        : 'bg-dark-800/50 border-r border-gray-800'
    }`}>
      {/* Terminal Header */}
      <div className={`mb-6 p-3 rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-dark-900/50'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`font-mono text-xs ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-500'
        }`}>
          <span className={theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'}>admin</span>
          <span className="text-gray-500">@</span>
          <span className={theme === 'light' ? 'text-sky-600' : 'text-[#00d4ff]'}>dashboard</span>
          <span className="text-gray-500">:~$</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2">
        {currentUser && currentUser.isAdmin && (
          <SidebarItem
            icon={HiChartPie}
            label="Dashboard"
            to="/dashboard?tab=dash"
            active={tab === 'dash' || !tab}
          />
        )}
        
        <SidebarItem
          icon={HiUser}
          label="Profile"
          to="/dashboard?tab=profile"
          active={tab === 'profile'}
          badge={currentUser.isAdmin ? 'Admin' : 'User'}
        />
        
        {currentUser.isAdmin && (
          <>
            <SidebarItem
              icon={HiDocumentText}
              label="Posts"
              to="/dashboard?tab=posts"
              active={tab === 'posts'}
            />
            
            <SidebarItem
              icon={HiOutlineUserGroup}
              label="Users"
              to="/dashboard?tab=users"
              active={tab === 'users'}
            />
            
            <SidebarItem
              icon={HiAnnotation}
              label="Comments"
              to="/dashboard?tab=comments"
              active={tab === 'comments'}
            />
          </>
        )}

        {/* Divider */}
        <div className={`my-4 h-px ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-gray-700 to-transparent'
        }`} />

        <SidebarItem
          icon={HiArrowSmRight}
          label="Sign Out"
          onClick={handleSignout}
        />
      </nav>

      {/* Status Indicator */}
      <div className={`mt-6 p-3 rounded-xl text-xs font-mono ${
        theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-dark-900/50 text-gray-500'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            theme === 'light' ? 'bg-emerald-500' : 'bg-[#00ff41]'
          }`}></div>
          <span>System Active</span>
        </div>
      </div>
    </aside>
  );
}