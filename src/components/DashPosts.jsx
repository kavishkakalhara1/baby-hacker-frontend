import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle, HiPlus, HiX } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-4 md:p-6 w-full max-w-full overflow-x-hidden'>
      {currentUser.isAdmin ? (
        <>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>Articles</h2>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>Manage your blog posts</p>
            </div>
            <Link to='/create-post'>
              <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-[#00ff41] to-[#00d4ff] text-dark-900 hover:shadow-lg hover:shadow-[#00ff41]/25'
              }`}>
                <HiPlus className="w-5 h-5" />
                Create Post
              </button>
            </Link>
          </div>

          {userPosts.length > 0 ? (
            <>
              {/* Table */}
              <div className={`rounded-2xl overflow-hidden ${
                theme === 'light' 
                  ? 'bg-white border border-gray-200 shadow-lg' 
                  : 'bg-dark-800/80 border border-gray-800'
              }`}>
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className={theme === 'light' ? 'bg-gray-50' : 'bg-dark-900/50'}>
                        {['Date Updated', 'Image', 'Title', 'Category', 'Delete', 'Edit'].map((header) => (
                          <th key={header} className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
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
                      {userPosts.map((post) => (
                        <tr key={post._id} className={`transition-colors ${
                          theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-dark-700/50'
                        }`}>
                          <td className={`px-6 py-4 text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <Link to={`/post/${post.slug}`}>
                              <img
                                src={post.image}
                                alt={post.title}
                                className='w-20 h-10 object-cover rounded-lg hover:opacity-80 transition-opacity'
                              />
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              className={`font-medium hover:underline ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}
                              to={`/post/${post.slug}`}
                            >
                              {post.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-lg ${
                              theme === 'light'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-[#00ff41]/20 text-[#00ff41]'
                            }`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setShowModal(true);
                                setPostIdToDelete(post._id);
                              }}
                              className='text-red-500 hover:text-red-600 font-medium text-sm transition-colors'
                            >
                              Delete
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              className={`font-medium text-sm transition-colors ${
                                theme === 'light'
                                  ? 'text-sky-600 hover:text-sky-700'
                                  : 'text-[#00d4ff] hover:text-[#00ff41]'
                              }`}
                              to={`/update-post/${post._id}`}
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className={`w-full mt-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    theme === 'light'
                      ? 'text-emerald-600 hover:bg-emerald-50'
                      : 'text-[#00ff41] hover:bg-[#00ff41]/10'
                  }`}
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <div className={`text-center py-12 rounded-2xl ${
              theme === 'light' ? 'bg-gray-50' : 'bg-dark-800/50'
            }`}>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>No posts yet. Create your first article to get started.</p>
            </div>
          )}
        </>
      ) : (
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          You have no posts yet!
        </p>
      )}

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-2xl p-6 ${
            theme === 'light' ? 'bg-white' : 'bg-dark-800 border border-gray-700'
          }`}>
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
                theme === 'light' ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-dark-700 text-gray-400'
              }`}
            >
              <HiX className="w-5 h-5" />
            </button>
            
            <div className='text-center'>
              <HiOutlineExclamationCircle className={`mx-auto mb-4 w-14 h-14 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <h3 className={`mb-5 text-lg font-medium ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeletePost}
                  className='px-5 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors'
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-5 py-2.5 font-medium rounded-xl transition-colors ${
                    theme === 'light'
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}