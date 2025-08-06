import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ name, email, address, orderId, timeLeft, onContinue }) => (
  <div className="order-success">
    🎉 Order Confirmed!
    <p>Thank you, <strong>{name}</strong></p>
    <p>Email: {email}</p>
    <p>Address: {address}</p>
    <p>Order ID: <strong>{orderId}</strong></p>
    <p>ETA: {timeLeft}</p>
    <button onClick={onContinue}>Continue Shopping</button>
  </div>
);

export default OrderSuccess;
