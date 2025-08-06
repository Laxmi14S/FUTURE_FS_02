import React, { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = ({ onOrderPlaced }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !address) {
      alert('Please fill in all fields');
      return;
    }

    // 🎉 Trigger modal with order info
    onOrderPlaced({ name, email, address });

    // Clear form
    setName('');
    setEmail('');
    setAddress('');
  };

  return (
    <div className="checkout-form">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
