import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import HeroSection from './Home/HeroSection';
import ProductList from './Home/ProductList';
import Footer from './Layout/Footer';
import CartPreview from './Home/CartPreview';
import RegisterForm from './Auth/RegisterForm'; 
import '../App.css';
import LoginForm from './Auth/LoginForm';
import ForgotPasswordForm from './Auth/ForgotPasswordForm';
import Productos from './Home/Productos';
import Contacto from './Home/Contacto';
import SobreNosotros from './Home/Sobrenosotros';
import Aemetpage from './Aemet/Aemetpage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Ruta principal con HeroSection y ContentList */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductList />
            </>
          }
        />
        {/* Ruta para la vista de CartPreview */}
        <Route path="/cart-preview" element={<CartPreview />} />
        {/* Ruta para la vista de RegisterPage */}
        <Route path="/register-page" element={<RegisterForm />} />

        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        <Route path="/login-page" element={<LoginForm />} />

        <Route path="/products-page" element={<Productos />} />

        <Route path="/contacts-page" element={<Contacto />} />

        <Route path="/sobrenosotros-page" element={<SobreNosotros />} />

        <Route path="/aemet" element={<Aemetpage />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
