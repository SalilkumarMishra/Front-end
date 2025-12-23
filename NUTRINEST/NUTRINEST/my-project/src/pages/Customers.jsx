import React, { useState } from 'react';
import { initialCustomers } from '../data/customers';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const Customers = () => {
  const [customers, setCustomers] = useState(() => getFromLocalStorage('customers', initialCustomers));
  const [query, setQuery] = useState('');

  // If you want to persist edits later, call saveToLocalStorage

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Customers</h3>
        <input className="form-control" style={{maxWidth:320}} placeholder="Search name or email" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><b>{c.name}</b></td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.orders}</td>
                  <td><b>₹{c.totalSpent}</b></td>
                  <td>{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
