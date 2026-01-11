import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`flex p-4 text-sm border-b ${
      theme === 'light' ? 'border-gray-200' : 'border-gray-700'
    }`}>
      <div className='flex-shrink-0 mr-3'>
        <img
          className={`w-10 h-10 rounded-full object-cover ring-2 ${
            theme === 'light' ? 'ring-gray-200' : 'ring-gray-700'
          }`}
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className={`mr-2 text-xs font-bold truncate ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-xs text-gray-500'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className={`w-full mb-2 p-3 rounded-xl transition-all focus:outline-none resize-none ${
                theme === 'light'
                  ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500'
                  : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41]'
              }`}
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <button
                type='button'
                onClick={handleSave}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === 'light'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 hover:bg-[#00ff41]/30'
                }`}
              >
                Save
              </button>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === 'light'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={`pb-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>{comment.content}</p>
            <div className={`flex items-center gap-2 pt-2 text-xs border-t max-w-fit ${
              theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`transition-colors ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'
                    : 'text-gray-400 hover:text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className={`transition-colors ${
                        theme === 'light' 
                          ? 'text-gray-400 hover:text-emerald-600' 
                          : 'text-gray-400 hover:text-[#00ff41]'
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500 transition-colors'
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}