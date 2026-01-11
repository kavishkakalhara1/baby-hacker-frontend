import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle, HiX, HiCheckCircle, HiExclamation } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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

  // Custom Alert Component
  const Alert = ({ type, message }) => {
    const colors = {
      success: theme === 'light' 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
        : 'bg-[#00ff41]/10 border-[#00ff41]/30 text-[#00ff41]',
      error: theme === 'light'
        ? 'bg-red-50 border-red-200 text-red-700'
        : 'bg-red-500/10 border-red-500/30 text-red-400',
    };
    const icons = {
      success: <HiCheckCircle className="w-5 h-5" />,
      error: <HiExclamation className="w-5 h-5" />,
    };
    
    return (
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors[type]}`}>
        {icons[type]}
        <span className="text-sm">{message}</span>
      </div>
    );
  };

  return (
    <div className='w-full max-w-lg p-6 mx-auto'>
      <h1 className={`text-3xl font-bold text-center mb-8 ${
        theme === 'light' ? 'text-gray-900' : 'text-white'
      }`}>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        
        {/* Profile Image */}
        <div
          className='relative self-center w-32 h-32 overflow-hidden rounded-full cursor-pointer group'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: theme === 'light' ? '#059669' : '#00ff41',
                },
                text: {
                  fill: theme === 'light' ? '#059669' : '#00ff41',
                  fontSize: '24px',
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover ring-4 transition-all ${
              imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
            } ${
              theme === 'light' 
                ? 'ring-gray-200 group-hover:ring-emerald-500/50' 
                : 'ring-gray-700 group-hover:ring-[#00ff41]/50'
            }`}
          />
          <div className={`absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
            theme === 'light' ? 'bg-black/30' : 'bg-black/50'
          }`}>
            <span className="text-white text-sm font-medium">Change</span>
          </div>
        </div>
        
        {imageFileUploadError && (
          <Alert type="error" message={imageFileUploadError} />
        )}
        
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>Username</label>
            <input
              type='text'
              id='username'
              placeholder='username'
              defaultValue={currentUser.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all focus:outline-none ${
                theme === 'light'
                  ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                  : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>Email</label>
            <input
              type='email'
              id='email'
              placeholder='email'
              defaultValue={currentUser.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all focus:outline-none ${
                theme === 'light'
                  ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                  : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>Password</label>
            <input
              type='password'
              id='password'
              placeholder='••••••••'
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all focus:outline-none ${
                theme === 'light'
                  ? 'bg-gray-50 border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                  : 'bg-dark-800 border border-gray-700 text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20'
              }`}
            />
          </div>
        </div>
        
        {/* Update Button */}
        <button
          type='submit'
          disabled={loading || imageFileUploading}
          className={`w-full py-3 font-medium rounded-xl transition-all duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50'
              : 'border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41]/10 disabled:opacity-50'
          }`}
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </button>
        
        {/* Create Post Button for Admin */}
        {currentUser.isAdmin && (
          <Link to='/create-post'>
            <button
              type='button'
              className={`w-full py-3 font-medium rounded-xl transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
                  : 'bg-gradient-to-r from-[#00ff41] to-[#00d4ff] text-dark-900 hover:shadow-lg hover:shadow-[#00ff41]/25'
              }`}
            >
              Create a Post
            </button>
          </Link>
        )}
      </form>
      
      {/* Action Links */}
      <div className='flex justify-between mt-6 text-sm'>
        <button
          onClick={() => setShowModal(true)}
          className='text-red-500 hover:text-red-600 font-medium transition-colors'
        >
          Delete Account
        </button>
        <button
          onClick={handleSignout}
          className={`font-medium transition-colors ${
            theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
          }`}
        >
          Sign Out
        </button>
      </div>
      
      {/* Alerts */}
      <div className="mt-5 space-y-3">
        {updateUserSuccess && (
          <Alert type="success" message={updateUserSuccess} />
        )}
        {updateUserError && (
          <Alert type="error" message={updateUserError} />
        )}
        {error && (
          <Alert type="error" message={error} />
        )}
      </div>
      
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
                Are you sure you want to delete your account?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeleteUser}
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