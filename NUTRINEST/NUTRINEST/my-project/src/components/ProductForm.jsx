import React, { useState, useEffect } from 'react';
import Button from './Button';

const ProductForm = ({ initial = null, onCancel, onSave }) => {
  const [form, setForm] = useState({
    name: '', category: '', price: '', stock: '', image: '', status: 'Active'
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    onSave(payload);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handle} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input className="form-control" name="category" value={form.category} onChange={handle} required />
      </div>

      <div className="row">
        <div className="col">
          <label className="form-label">Price (₹)</label>
          <input className="form-control" name="price" type="number" value={form.price} onChange={handle} required />
        </div>
        <div className="col">
          <label className="form-label">Stock</label>
          <input className="form-control" name="stock" type="number" value={form.stock} onChange={handle} required />
        </div>
      </div>

      <div className="mb-3 mt-3">
        <label className="form-label">Image URL</label>
        <input className="form-control" name="image" value={form.image} onChange={handle} />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-select" name="status" value={form.status} onChange={handle}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ProductForm;
