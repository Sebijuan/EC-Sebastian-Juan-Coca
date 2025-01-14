import React from 'react';
import ProductCard from './ProductCard';
import '../styles/home.css';



const ContentList = ({ products }) => {
  return (
    <div className="content-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ContentList;