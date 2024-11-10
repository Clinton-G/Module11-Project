import React, { useState, useEffect } from 'react';

const simulatedProducts = [
  { id: 1, name: 'Product 1', price: 29.99 },
  { id: 2, name: 'Product 2', price: 39.99 },
  { id: 3, name: 'Product 3', price: 49.99 },
];

function ProductDetails({ productId, onDelete }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = simulatedProducts.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = () => {
    if (window.confirm('D You Want to Delete This Product?')) {
      onDelete(productId);
      setProduct(null);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {product ? (
        <>
          <h2>Product Details</h2>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <button onClick={handleDelete}>Delete Product</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
