import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../store/AuthContext';
import {toast} from 'react-hot-toast';

const Register = () => {
   const navigate = useNavigate();
   const {user, setUser} = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange =  (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      const response = await axios.post('/api/auth/signup', formData)
      toast.success("Registered successfully");
      navigate('/login')
   } catch (error) {
      console.error("Error in resgister", error)
      toast.error(error.message || "Something went wrong")
   }
   
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded outline-none hover:ring-pink-400 focus:ring-pink-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded outline-none hover:ring-pink-400 focus:ring-pink-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded outline-none hover:ring-pink-400 focus:ring-pink-400"
        />
        <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2 rounded hover:bg-pink-500 hover:shadow-md">Register</button>
      </form>
      <p className='mt-2 text-gray-500'>already have an accont?{' '}
         <Link to='/login' className='underline text-blue-500 items-center'>Login here</Link>
      </p>
    </div>
  );
};

export default Register;
