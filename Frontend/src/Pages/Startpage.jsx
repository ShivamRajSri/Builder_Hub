import React from 'react'
import { Link } from 'react-router-dom'
import BuildingImage from '../assets/Buildingmaterial.webp';
const Start = () => {
  return (
    <div className='bg-cover bg-center flex items-center justify-center min-h-screen bg-gray-100' style={{ backgroundImage: `url(${BuildingImage})` }}>
      <div className='w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center bg-white/10 p-4 rounded-lg shadow-xl'> 
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 w-full rounded-lg mb-4"> 
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Get Your Building Material at the lowest cost</h1>
            <p className="mb-6">Buy or Sell Building Materials at Your Desire Cost</p>
          </div>
        </section>
        <div className='bg-black/70 shadow-lg rounded-xl pb-8 py-4 px-4 w-full flex flex-col items-center'> 
          <h2 className='text-[30px] font-semibold text-yellow-400 text-center'>Builder Hub</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-white text-black font-semibold py-3 rounded-lg mt-5 hover:bg-yellow-300 transition'>Continue</Link>
        </div>
      </div>
    </div>
  )
}
export default Start