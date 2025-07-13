import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Start from './Pages/Startpage';
import UserLogin from './Pages/LoginUser';
import UserSignup from './Pages/SignupUser';
import HomePage from './Pages/Homepage';
import SellerLogin from './Pages/Sellerlogin';
import SellerSignup from './Pages/SellerSignup';
import Sellerpage from './Pages/Sellerpage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/Signup' element={<UserSignup />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/sellerlogin' element={<SellerLogin />} />
        <Route path='/sellersignup' element={<SellerSignup />} />
        <Route path='/sellerpage' element={<Sellerpage />} />
      </Routes>
    </div>
  );
};
export default App;