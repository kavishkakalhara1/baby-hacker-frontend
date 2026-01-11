import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, lastMonth, color }) => (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${
      theme === 'light' 
        ? 'bg-white border border-gray-200 shadow-lg' 
        : 'bg-dark-800/80 border border-gray-800'
    }`}>
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${color}`} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium uppercase tracking-wider ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>{title}</p>
          <p className={`mt-2 text-4xl font-bold font-mono ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>{value}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`flex items-center text-sm font-medium ${
              theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'
            }`}>
              <HiArrowNarrowUp className="w-4 h-4" />
              {lastMonth}
            </span>
            <span className={`text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            }`}>Last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  // Custom Table Component
  const DataTable = ({ title, linkTo, linkText, headers, children }) => (
    <div className={`rounded-2xl overflow-hidden ${
      theme === 'light' 
        ? 'bg-white border border-gray-200 shadow-lg' 
        : 'bg-dark-800/80 border border-gray-800'
    }`}>
      <div className={`flex items-center justify-between px-6 py-4 border-b ${
        theme === 'light' ? 'border-gray-200' : 'border-gray-700'
      }`}>
        <h3 className={`font-semibold ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>{title}</h3>
        <Link to={linkTo}>
          <button className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:shadow-lg hover:shadow-emerald-500/25'
              : 'bg-gradient-to-r from-[#00ff41]/20 to-[#00d4ff]/20 text-[#00ff41] border border-[#00ff41]/30 hover:bg-[#00ff41]/30'
          }`}>
            {linkText}
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={theme === 'light' ? 'bg-gray-50' : 'bg-dark-900/50'}>
              {headers.map((header, index) => (
                <th key={index} className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${
            theme === 'light' ? 'divide-gray-200' : 'divide-gray-800'
          }`}>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className='p-6 md:mx-auto max-w-7xl'>
      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-3'>
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={HiOutlineUserGroup}
          lastMonth={lastMonthUsers}
          color={theme === 'light' ? 'bg-teal-500' : 'bg-gradient-to-br from-teal-500 to-teal-600'}
        />
        <StatCard
          title="Total Comments"
          value={totalComments}
          icon={HiAnnotation}
          lastMonth={lastMonthComments}
          color={theme === 'light' ? 'bg-indigo-500' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}
        />
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon={HiDocumentText}
          lastMonth={lastMonthPosts}
          color={theme === 'light' ? 'bg-lime-500' : 'bg-gradient-to-br from-lime-500 to-green-600'}
        />
      </div>

      {/* Tables Grid */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Recent Users */}
        <DataTable
          title="Recent Users"
          linkTo="/dashboard?tab=users"
          linkText="See all"
          headers={['User', 'Username']}
        >
          {users && users.map((user) => (
            <tr key={user._id} className={`transition-colors ${
              theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-dark-700/50'
            }`}>
              <td className="px-6 py-4">
                <img
                  src={user.profilePicture}
                  alt='user'
                  className={`w-10 h-10 rounded-full object-cover ring-2 ${
                    theme === 'light' ? 'ring-gray-200' : 'ring-gray-700'
                  }`}
                />
              </td>
              <td className={`px-6 py-4 font-medium ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>{user.username}</td>
            </tr>
          ))}
        </DataTable>

        {/* Recent Comments */}
        <DataTable
          title="Recent Comments"
          linkTo="/dashboard?tab=comments"
          linkText="See all"
          headers={['Content', 'Likes']}
        >
          {comments && comments.map((comment) => (
            <tr key={comment._id} className={`transition-colors ${
              theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-dark-700/50'
            }`}>
              <td className={`px-6 py-4 max-w-xs ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                <p className='line-clamp-2'>{comment.content}</p>
              </td>
              <td className={`px-6 py-4 font-mono ${
                theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'
              }`}>{comment.numberOfLikes}</td>
            </tr>
          ))}
        </DataTable>

        {/* Recent Posts */}
        <DataTable
          title="Recent Posts"
          linkTo="/dashboard?tab=posts"
          linkText="See all"
          headers={['Image', 'Title', 'Category']}
        >
          {posts && posts.map((post) => (
            <tr key={post._id} className={`transition-colors ${
              theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-dark-700/50'
            }`}>
              <td className="px-6 py-4">
                <img
                  src={post.image}
                  alt='post'
                  className='h-10 rounded-lg w-14 object-cover'
                />
              </td>
              <td className={`px-6 py-4 font-medium max-w-[150px] truncate ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>{post.title}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                  theme === 'light'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-[#00ff41]/20 text-[#00ff41]'
                }`}>
                  {post.category}
                </span>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}