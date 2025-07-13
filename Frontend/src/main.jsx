import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/Usercontext.jsx';
import SellerContext from './Context/Sellercontext';
createRoot(document.getElementById('root')).render(
      <UserContext>
        <SellerContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SellerContext>
      </UserContext>
)