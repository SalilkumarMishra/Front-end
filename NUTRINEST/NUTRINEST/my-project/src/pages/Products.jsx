import React, { useEffect, useState } from 'react';
import { initialProducts } from '../data/products';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../components/Button';

const Products = () => {
  const [products, setProducts] = useState(() => getFromLocalStorage('products', initialProducts));
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open:false, product:null });
  const [query, setQuery] = useState('');

  useEffect(() => {
    saveToLocalStorage('products', products);
  }, [products]);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setModalOpen(true); };
  const handleDelete = (p) => { setConfirm({ open:true, product:p }); };

  const confirmDelete = () => {
    setProducts(products.filter(x => x.id !== confirm.product.id));
    setConfirm({ open:false, product:null });
  };

  const saveProduct = (payload) => {
    if (editing) {
      setProducts(products.map(p => p.id === editing.id ? { ...editing, ...payload } : p));
    } else {
      const newid = Date.now();
      setProducts([{ ...payload, id: newid }, ...products]);
    }
    setModalOpen(false);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3>Products</h3>
          <p className="text-muted small">Manage inventory</p>
        </div>
        <div className="d-flex gap-2">
          <input placeholder="Search by name or category" className="form-control" style={{width:300}} value={query} onChange={e=>setQuery(e.target.value)} />
          <Button onClick={openAdd}>Add Product</Button>
        </div>
      </div>

      <div className="row g-3">
        {filtered.map(product => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard product={product} onEdit={openEdit} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      <Modal title={editing ? 'Edit Product' : 'Add Product'} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ProductForm initial={editing} onCancel={() => setModalOpen(false)} onSave={saveProduct} />
      </Modal>

      <ConfirmModal isOpen={confirm.open} title="Delete product" message={`Delete ${confirm.product?.name}?`} onCancel={() => setConfirm({open:false, product:null})} onConfirm={confirmDelete} />
    </div>
  );
};

export default Products;
