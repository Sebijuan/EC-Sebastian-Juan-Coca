import React from 'react';
import ContentCard from './ContentCard';

const ContentList = ({ products }) => {
  return (
    <div className="content-list">
      {products.map((product) => (
        <ContentCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ContentList;
