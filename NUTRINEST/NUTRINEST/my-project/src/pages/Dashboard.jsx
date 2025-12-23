import React from 'react';
import StatCard from '../components/StatCard';
import { getFromLocalStorage } from '../utils/localStorage';
import { initialProducts } from '../data/products';
import { initialOrders } from '../data/orders';
import { initialCustomers } from '../data/customers';

const Dashboard = () => {
  const products = getFromLocalStorage('products', initialProducts);
  const orders = getFromLocalStorage('orders', initialOrders);
  const customers = getFromLocalStorage('customers', initialCustomers);

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className="container-fluid">
      <div className="row g-3 mb-3">
        <div className="col-md-3"><StatCard title="Products" value={products.length} /></div>
        <div className="col-md-3"><StatCard title="Orders" value={orders.length} /></div>
        <div className="col-md-3"><StatCard title="Customers" value={customers.length} /></div>
        <div className="col-md-3"><StatCard title="Revenue" value={`₹${totalRevenue}`} /></div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Recent Orders</h5>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0,6).map(o => (
                  <tr key={o.id}>
                    <td><b>{o.id}</b></td>
                    <td>{o.customer}</td>
                    <td>{o.date}</td>
                    <td><b>₹{o.total}</b></td>
                    <td><span className="badge text-dark" >{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
