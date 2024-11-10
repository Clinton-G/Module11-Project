import React, { useState, useEffect } from 'react';

function CustomerDetails({ customerId, onDelete }) {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${id}`);
        if (!response.ok) throw new Error('Customer Not Found');
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        setError('Error Getting Customer Details: ' + error.message);
      }
    };

    if (customerId) {
      fetchCustomerDetails(customerId);
    }
  }, [customerId]);

  const handleDelete = async () => {
    if (window.confirm('Do You Want to Delete This Customer?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to Delete Custoemr');
        
        onDelete(customerId);
        setCustomer(null);
      } catch (error) {
        setError('Error Deleting Customer: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>Customer Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {customer ? (
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <button onClick={handleDelete}>Delete Customer</button>
        </div>
      ) : (
        <p>No Custoemr Info Found.</p>
      )}
    </div>
  );
}

export default CustomerDetails;
