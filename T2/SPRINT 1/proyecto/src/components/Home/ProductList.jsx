import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/products.css';
import { fetchProducts } from '../services/content_API';
import ProductFilter from './ProductFilter'; 
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div className="Product-list">
       <ProductFilter onFilterChange={(filters) => console.log(filters)} />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;