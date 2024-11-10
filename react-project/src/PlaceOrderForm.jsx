import React, { useState } from 'react';

function PlaceOrderForm() {
  const [productId, setProductId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productId || !customerId || !orderDate) {
      alert('All Fields Required');
      return;
    }

    const orderData = {
      productId,
      customerId,
      orderDate,
    };

    console.log('Order Submitted:', orderData);

    setSuccessMessage('Order Placed Succesfully');
    setProductId('');
    setCustomerId('');
    setOrderDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Order</h2>
      {successMessage && <p>{successMessage}</p>}
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div>
        <label>Order Date:</label>
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default PlaceOrderForm;
