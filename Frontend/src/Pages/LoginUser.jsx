import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../Context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BuildingImage from '../assets/Buildingmaterial.webp';
const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`http://localhost:3000/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div>
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Get Your Building Material at the lowest cost</h1>
      <p className="mb-6">Buy or Sell Buiding Materials at Your Dezire Cost</p>
      </div>
      </section>
      <div className='bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100' style={{ backgroundImage: `url(${BuildingImage})` }}>
      <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-sm'>

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2 text-black'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2 text-black'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className=' outline-2 outline-offset-4 bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='flex items-center justify-center w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg mt-5 hover:bg-yellow-300 transition'>Create new Account</Link></p>
        <div className='pt-6'>
        <Link
          to='/sellerSignup'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Seller</Link>
      </div>
      </div>
    </div>
    </div>
  )
}

export default UserLogin