import React, { useState } from 'react';
import { initialCustomers } from '../data/customers';
import { getFromLocalStorage } from '../utils/localStorage';

const Customers = () => {
  const [customers] = useState(() => getFromLocalStorage('customers', initialCustomers));
  const [query, setQuery] = useState('');

  const filtered = customers.filter((customer) =>
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Customers</h3>
        <input className="form-control" style={{ maxWidth: 320 }} placeholder="Search name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id}>
                  <td><b>{customer.name}</b></td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.orders}</td>
                  <td><b>Rs. {customer.totalSpent}</b></td>
                  <td>{customer.joined}</td>
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
