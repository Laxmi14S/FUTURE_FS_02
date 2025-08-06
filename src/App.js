import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confetti from 'react-confetti';
import { CartProvider } from './context/CartContext';
import ProductCard from './component/ProductCard';
import Cart from './component/Cart';
import CheckoutForm from './component/CheckoutForm';
import ProductDetail from './component/ProductDetail';
import './App.css';

// Define 10 products with real images & four have description
const products = [
  {
    id: 1,
    name: "iPhone 13",
    image: "https://m.media-amazon.com/images/I/61l9ppRIiqL._SX679_.jpg",
    price: 69900,
    description: "Apple iPhone 13 with 128GB storage and A15 Bionic chip."
  },
  {
    id: 2,
    name: "Apple MacBook Air M2",
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
    price: 109900,
    description: "Lightweight MacBook Air with M2 chip, 8GB RAM and 256GB SSD."
  },
  {
    id: 3,
    name: "Canon EOS 1500D DSLR",
    image: "https://m.media-amazon.com/images/I/914hFeTU2-L._SX679_.jpg",
    price: 40999,
    description: "DSLR camera with 24.1MP and Wi-Fi/NFC connectivity."
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    image: "https://m.media-amazon.com/images/I/61Id6WJDWqL._SX679_.jpg",
    price: 29990,
    description: "Industry-leading noise cancellation and premium sound."
  },
  {
    id: 5,
    name: "boAt Airdopes 141",
    image: "https://m.media-amazon.com/images/I/51HBom8xz7L._SX679_.jpg",
    price: 1299,
    description: "True wireless earbuds with 42H playback and ASAP charging."
  }
  // remaining products without descriptions:
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [now, setNow] = useState(new Date());

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderPlaced = (name, email, address) => {
    const orderId = `#ORD${Math.floor(Math.random() * 90000 + 10000)}`;
    const deliveryTime = new Date(Date.now() + 3 * 60 * 1000);
    setOrderDetails({ name, email, address, orderId, deliveryTime });
    setOrderPlaced(true);
  };

  const resetOrder = () => {
    setOrderPlaced(false);
    setOrderDetails(null);
  };

  useEffect(() => {
    if (orderPlaced) {
      const timer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [orderPlaced]);

  let timeLeft = '';
  if (orderDetails) {
    const diff = Math.max(0, Math.floor((orderDetails.deliveryTime - now) / 1000));
    const m = Math.floor(diff / 60), s = diff % 60;
    timeLeft = `${m}:${s < 10 ? '0'+s : s}`;
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <h1>🛒 Future Interns E‑Commerce Store</h1>

          {!orderPlaced ? (
            <Routes>
              <Route path="/" element={
                <>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <div className="product-list">
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                  <Cart />
                  <CheckoutForm onOrderPlaced={handleOrderPlaced} />
                </>
              } />
              <Route path="/product/:id" element={<ProductDetail products={products} />} />
            </Routes>
          ) : (
            <div className="order-confirmation">
              <Confetti />
              <h2>🎉 Order Confirmed!</h2>
              <p>Thank you, <strong>{orderDetails.name}</strong>!</p>
              <p>📧 {orderDetails.email}</p>
              <p>📍 {orderDetails.address}</p>
              <p>📦 Order ID: <strong>{orderDetails.orderId}</strong></p>
              <p>🕑 ETA: <strong>{timeLeft} mins</strong></p>
              <button className="go-home-button" onClick={resetOrder}>🏠 Continue Shopping</button>
            </div>
          )}

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
