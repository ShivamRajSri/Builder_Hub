import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SellerDataContext } from '../Context/Sellercontext';
import axios from 'axios';
import BuildingImage from '../assets/Buildingmaterial.webp';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(SellerDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/seller/login-seller`, {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/sellerpage');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or server error.');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get Your Building Material at the Lowest Cost</h1>
          <p className="mb-6">Buy or Sell Building Materials at Your Desired Cost</p>
        </div>
      </section>

      <div
        className="bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: `url(${BuildingImage})` }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2 text-black">What's your email</h3>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            />

            <h3 className="text-lg font-medium mb-2 text-black">Enter Password</h3>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            />

            <button
              type="submit"
              className="outline-2 outline-offset-4 bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center">
            New here?{' '}
            <Link
              to="/sellersignup"
              className="flex items-center justify-center w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg mt-5 hover:bg-yellow-300 transition"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;