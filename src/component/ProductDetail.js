import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prod = products.find(p => p.id === parseInt(id));
  if (!prod) return <h2>Product not found</h2>;

  return (
    <div className="product-detail">
      <img src={prod.image} alt={prod.name} />
      <div className="details">
        <h2>{prod.name}</h2>
        <p className="price">₹{prod.price}</p>
        {prod.description && <p className="description">{prod.description}</p>}
        <button onClick={() => navigate(-1)}>⬅ Back to Shop</button>
      </div>
    </div>
  );
};

export default ProductDetail;
