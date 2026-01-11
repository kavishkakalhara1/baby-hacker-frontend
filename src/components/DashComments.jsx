import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle, HiX, HiHeart } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-6 w-full'>
      {/* Header */}
      <div className='mb-6'>
        <h2 className={`text-2xl font-bold ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>Comments</h2>
        <p className={`text-sm ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>Manage user comments</p>
      </div>

      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          {/* Table */}
          <div className={`rounded-2xl overflow-hidden ${
            theme === 'light' 
              ? 'bg-white border border-gray-200 shadow-lg' 
              : 'bg-dark-800/80 border border-gray-800'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={theme === 'light' ? 'bg-gray-50' : 'bg-dark-900/50'}>
                    {['Date', 'Content', 'Likes', 'Post ID', 'User ID', 'Delete'].map((header) => (
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
                  {comments.map((comment) => (
                    <tr key={comment._id} className={`transition-colors ${
                      theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-dark-700/50'
                    }`}>
                      <td className={`px-6 py-4 text-sm whitespace-nowrap ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </td>
                      <td className={`px-6 py-4 max-w-xs ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <p className="line-clamp-2 text-sm">{comment.content}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg ${
                          theme === 'light'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-pink-500/20 text-pink-400'
                        }`}>
                          <HiHeart className="w-3 h-3" />
                          {comment.numberOfLikes}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-mono text-xs ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <span className="truncate block max-w-[100px]">{comment.postId}</span>
                      </td>
                      <td className={`px-6 py-4 font-mono text-xs ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <span className="truncate block max-w-[100px]">{comment.userId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setCommentIdToDelete(comment._id);
                          }}
                          className='text-red-500 hover:text-red-600 font-medium text-sm transition-colors'
                        >
                          Delete
                        </button>
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
          }`}>You have no comments yet!</p>
        </div>
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
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeleteComment}
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