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
    <div>
      <ProductFilter onFilterChange={(filters) => console.log(filters)} />
      <div className="Product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;