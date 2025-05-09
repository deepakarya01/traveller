// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { UserContext } from '../store/AuthContext';

const Login = () => {
   const navigate = useNavigate();
   const {user, setUser} = useContext(UserContext)
   const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      setUser(response.data.user)
      //console.log("response", response);
      //console.log("response user:", user)
      toast.success("Logged in successfully");
      navigate('/')
    } catch (error) {
      console.error("Error in Login", error)
      toast.error(error.message|| "Something went wrong");
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded hover:ring-2 outline-none hover:ring-pink-400 focus:ring-pink-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded hover:ring-2 outline-none hover:ring-pink-400 focus:ring-pink-400"
        />
        <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2 rounded hover:bg-pink-500 hover:shadow-md">Login</button>
      </form>
      <p className='mt-2 text-gray-500'>Don't have an accont?{' '}
         <Link to='/register' className='underline text-blue-500 items-center'>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
