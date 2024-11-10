import React, { useState } from 'react';

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?1?\d{9,15}$/;

function CustomerForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError('All Info Required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid Email');
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError('Invalid Phone Number');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const customerData = { name, email, phone };

    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) throw new Error('Failed to Create Customer');

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      setError('Error Creating Customer: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Customer</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>Create Customer</button>
    </form>
  );
}

export default CustomerForm;
