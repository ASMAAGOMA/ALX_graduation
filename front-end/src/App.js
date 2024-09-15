import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Public';
import AboutPage from './components/About';
import ContactPage from './components/Contact';
import MenuPage from './components/MenuPage';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProductsPage from './features/products/ProductPage';
import RequireAuth from './components/RequireAuth';
import FavoriteProducts from './components/FavoriteProducts';
import AdminDashboard from './components/AdminDashboard';
import PersistLogin from './features/auth/PersistLogin';
import { selectCurrentToken } from './features/auth/authSlice';
import { useRefreshMutation } from './features/auth/authApiSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log('verifying refresh token');
      try {
        await refresh().unwrap();
        console.log('refresh token still valid');
      } catch (err) {
        console.error('refresh token expired');
        // handle error - redirect to login or show message
      }
    }

    if (!token) {
      verifyRefreshToken();
    }
  }, []);
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:category" element={<ProductsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<FavoriteProducts />} />
        <Route element={<RequireAuth />}>
        </Route>
        <Route 
            path="/admin" 
            element={
                <AdminDashboard />
            } 
          />
      </Route>
    </Routes>
  );
}

export default App;