import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes.jsx';
import { CartProvider } from './context/cartContext.jsx';
import Carrito from './components/carrito/carrito.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={routes}/>
      <Carrito/>
      </CartProvider>
  </StrictMode>
)