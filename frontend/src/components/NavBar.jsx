import React, { useContext, useState, useRef, useEffect } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../store/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  const {user, logout} = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-6 py-2 border-b">
    <Link to="/" className='text-2xl text-pink-600 font-bold'>Traveller</Link>

    <div className='relative' ref={menuRef}>
      {user ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border p-2 rounded-full hover:shadow"
          >
            <FaUserCircle size={24} className="text-gray-700" />
            <span className="font-medium hidden sm:block">{user.name}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <Link
                to="/my-bookings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                to="/mylistings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                My listing
              </Link>
              <Link 
                to='/listproperty' 
                className='block px-4 py-2 hover:bg-gray-100'
                onClick={() => setIsOpen(false)}  
              >
                List property
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <IoMdLogOut />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          className='border px-4 py-2 font-bold rounded-md bg-pink-600 text-white hover:bg-pink-700 shadow-sm'
          to='/login'
        >
          Login
        </Link>
      )}
    </div>
  </div>
   <div className="h-20"></div>
   </>
  )
}

export default NavBar