import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import HeroSection from './Home/HeroSection';
import ProductFilter from './Home/ProductFilter'; 
import ContentList from './Home/ContentList';
import Footer from './Layout/Footer';
import CartPreview from './Home/CartPreview'; // Corrected import path
import ProductCard from './Home/ProductCard'; // Ensure ProductCard is imported

const App = () => {
  const products = [
    { id: 1, name: 'BMW M3', price: 50000, image: '/assets/images/icons/products/bmwM3.jpg' }, // Corrected image path
    { id: 2, name: 'Audi R8', price: 80000, image: '/assets/images/audi.jpg' }, // Corrected image path
  ];

  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ProductFilter onFilterChange={(filters) => console.log(filters)} />
      <Routes>
        <Route path="/" element={<ContentList products={products} />} />
        <Route path="/cart-preview" element={<CartPreview />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
