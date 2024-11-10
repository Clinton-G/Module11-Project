import React, { useState } from 'react';

const priceRegex = /^\d+(\.\d{1,2})?$/;

function ProductForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Product Name Required');
      return;
    }
    if (!priceRegex.test(price)) {
      setError('Invalid Price Format');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const productData = { name, price: parseFloat(price) };

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Failed to Create Product');

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      setError('Error Crating Product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }

    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>Create Product</button>
    </form>
  );
}

export default ProductForm;
