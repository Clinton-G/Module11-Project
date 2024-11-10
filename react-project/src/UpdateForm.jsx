import React, { useState, useEffect } from 'react';

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?1?\d{9,15}$/;

function UpdateForm({ customerData, onUpdate }) {
  const [name, setName] = useState(customerData.name);
  const [email, setEmail] = useState(customerData.email);
  const [phone, setPhone] = useState(customerData.phone);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(customerData.name);
    setEmail(customerData.email);
    setPhone(customerData.phone);
  }, [customerData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError('Invalid phone number format');
      return;
    }
    setError('');
    const updatedData = { name, email, phone };
    onUpdate(updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Customer</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <button type="submit">Update Customer</button>
    </form>
  );
}

export default UpdateForm;
