import React, { useState } from 'react';
import '../App.css';

const CheckoutForm = ({ onOrderPlaced }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const submit = () => {
    if (!name || !email || !address) {
      alert('Please fill all fields');
      return;
    }
    onOrderPlaced(name, email, address);
    setName(''); setEmail(''); setAddress('');
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
      <textarea placeholder="Shipping Address" value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={submit}>Place Order</button>
    </div>
  );
};

export default CheckoutForm;
