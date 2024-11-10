import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Error Getting Products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Error Fetchig List: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to Delete Product');

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError('Error Deleting Product: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
