import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const toDetail = () => navigate(`/product/${product.id}`);
  const tc = e => { e.stopPropagation(); addToCart(product); };

  return (
    <div className="product-card" onClick={toDetail}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={tc}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
