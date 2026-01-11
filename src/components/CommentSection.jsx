import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle, HiX } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='w-full max-w-2xl p-3 mx-auto'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-sm text-gray-500'>
          <p>Signed in as:</p>
          <img
            className='object-cover w-5 h-5 rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='flex gap-1 my-5 text-sm text-teal-500'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className={`p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-[#12121a] border-[#00ff41]/30'
              : 'bg-white border-emerald-300'
          }`}
        >
          <textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none ${
              theme === 'dark'
                ? 'bg-[#0a0a0f] border-[#00ff41]/30 text-gray-100 placeholder-gray-500 focus:ring-[#00ff41]/50 focus:border-[#00ff41]'
                : 'bg-gray-50 border-emerald-200 text-gray-900 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          />
          <div className='flex items-center justify-between mt-4'>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {200 - comment.length} characters remaining
            </p>
            <button
              type='submit'
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#00ff41] to-[#00d4ff] text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                  : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-600 hover:to-sky-600'
              }`}
            >
              Submit
            </button>
          </div>
          {commentError && (
            <div className={`mt-4 p-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-red-900/20 border-red-500/50 text-red-400'
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              {commentError}
            </div>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className={`my-5 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>No comments yet!</p>
      ) : (
        <>
          <div className='flex items-center gap-2 my-5 text-sm'>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Comments</p>
            <div className={`px-3 py-1 rounded-md ${
              theme === 'dark'
                ? 'bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41]'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
            }`}>
              <p className='font-mono'>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          <div className={`relative w-full max-w-md p-6 mx-4 rounded-lg ${
            theme === 'dark'
              ? 'bg-[#12121a] border border-[#00ff41]/30'
              : 'bg-white border border-gray-200'
          }`}>
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-[#00ff41] hover:bg-[#00ff41]/10'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <HiX className='w-5 h-5' />
            </button>
            <div className='text-center pt-4'>
              <HiOutlineExclamationCircle className={`mx-auto mb-4 h-14 w-14 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-500'
              }`} />
              <h3 className={`mb-6 text-lg font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => handleDelete(commentToDelete)}
                  className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}