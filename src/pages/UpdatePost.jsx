import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiUpload } from 'react-icons/hi';

export default function UpdatePost() {
  const { theme } = useSelector((state) => state.theme);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='max-w-3xl min-h-screen p-6 mx-auto'>
      <h1 className={`text-3xl font-bold text-center mb-8 ${
        theme === 'light' ? 'text-gray-900' : 'text-white'
      }`}>Update Post</h1>
      
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ''}
            className={`flex-1 px-4 py-3 rounded-xl transition-all focus:outline-none ${
              theme === 'light'
                ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20'
            }`}
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || 'uncategorized'}
            className={`px-4 py-3 rounded-xl transition-all focus:outline-none ${
              theme === 'light'
                ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500'
                : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41]'
            }`}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </select>
        </div>
        
        <div className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-dashed ${
          theme === 'light' ? 'border-emerald-400 bg-emerald-50/50' : 'border-[#00ff41]/50 bg-[#00ff41]/5'
        }`}>
          <label className={`flex-1 cursor-pointer ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
            />
            <div className='flex items-center gap-2'>
              <HiUpload className={`w-5 h-5 ${
                theme === 'light' ? 'text-emerald-600' : 'text-[#00ff41]'
              }`} />
              <span>{file ? file.name : 'Choose a new image'}</span>
            </div>
          </label>
          <button
            type='button'
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              theme === 'light'
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50'
                : 'border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41]/10 disabled:opacity-50'
            }`}
          >
            {imageUploadProgress ? (
              <div className='w-8 h-8'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  styles={{
                    path: { stroke: theme === 'light' ? '#059669' : '#00ff41' },
                    text: { fill: theme === 'light' ? '#059669' : '#00ff41', fontSize: '28px' }
                  }}
                />
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </div>
        
        {imageUploadError && (
          <div className='px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm'>
            {imageUploadError}
          </div>
        )}
        
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='object-cover w-full h-72 rounded-xl'
          />
        )}
        
        <div className={`rounded-xl overflow-hidden ${
          theme === 'light' ? 'bg-white border border-gray-200' : 'bg-dark-800 border border-gray-700'
        }`}>
          <ReactQuill
            theme='snow'
            value={formData.content || ''}
            placeholder='Write something...'
            className='h-72'
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
        </div>
        
        <button
          type='submit'
          className={`w-full py-3 mt-8 font-medium rounded-xl transition-all duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
              : 'bg-gradient-to-r from-[#00ff41] to-[#00d4ff] text-dark-900 hover:shadow-lg hover:shadow-[#00ff41]/25'
          }`}
        >
          Update Post
        </button>
        
        {publishError && (
          <div className='px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm'>
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}