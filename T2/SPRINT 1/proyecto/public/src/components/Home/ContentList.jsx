import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/home.css';
import { fetchProducts } from '../services/content_API'; // Import fetchProducts

const ContentList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div className="content-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ContentList;