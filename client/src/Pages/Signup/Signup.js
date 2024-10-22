import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../Assets/logo.png"; // Importing logo
import backgroundImage from "../../Assets/loginbg.jpg"; // Importing your background image
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return emailRegex.test(email) && email.length >= 6;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 5) {
      toast.error('Name must be at least 5 characters long');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email! Must be at least 6 characters, lowercase, and contain @');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters, include 1 uppercase, 1 lowercase, 1 special character, and 1 number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup', { name, email, password });
      toast.success('User Created Successfully');
      navigate('/');
      console.log('User Data', response.data);
    } catch (error) {
      console.log('Error in Signup', error);
      toast.error('Failed Creating User');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <img src={logo} alt="Your Company" className="mx-auto h-28 w-auto" />
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
            Create a new account
          </h2>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="w-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onClick={() => navigate('/')}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
