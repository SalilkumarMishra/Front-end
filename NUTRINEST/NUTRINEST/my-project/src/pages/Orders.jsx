import React, { useEffect, useState } from 'react';
import { initialOrders } from '../data/orders';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const Orders = () => {
  const [orders, setOrders] = useState(() => getFromLocalStorage('orders', initialOrders));
  const [query, setQuery] = useState('');

  useEffect(() => saveToLocalStorage('orders', orders), [orders]);

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(query.toLowerCase()) ||
    o.customer.toLowerCase().includes(query.toLowerCase())
  );

  const changeStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? {...o, status} : o));
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Orders</h3>
        <input placeholder="Search order or customer" className="form-control" style={{maxWidth:320}} value={query} onChange={e=>setQuery(e.target.value)} />
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><b>{o.id}</b></td>
                  <td>{o.customer}<div className="small text-muted">{o.email}</div></td>
                  <td>{o.date}</td>
                  <td>{o.items}</td>
                  <td><b>₹{o.total}</b></td>
                  <td>
                    <select className="form-select form-select-sm" value={o.status} onChange={e=>changeStatus(o.id, e.target.value)}>
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
