import React, { useEffect, useState } from 'react';
import { initialCategories } from '../data/categories';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import Modal from '../components/Modal';
import Button from '../components/Button';

const Categories = () => {
  const [cats, setCats] = useState(() => getFromLocalStorage('categories', initialCategories));
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', icon:'', description:'' });

  useEffect(() => saveToLocalStorage('categories', cats), [cats]);

  const openAdd = () => { setForm({name:'', icon:'', description:''}); setEditing(null); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({name:c.name, icon:c.icon, description:c.description}); setModalOpen(true); };

  const save = () => {
    if (editing) setCats(cats.map(c => c.id === editing.id ? {...c, ...form} : c));
    else setCats([{...form, id: Date.now(), products:0}, ...cats]);
    setModalOpen(false);
  };

  const remove = (id) => {
    if (confirm('Delete category?')) setCats(cats.filter(c => c.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Categories</h3>
        <Button onClick={openAdd}>Add Category</Button>
      </div>

      <div className="row g-3">
        {cats.map(c => (
          <div key={c.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="text-center" style={{fontSize:40}}>{c.icon}</div>
                <h5>{c.name}</h5>
                <p className="text-muted">{c.description}</p>
                <div className="d-flex gap-2">
                  <Button variant="secondary" onClick={() => openEdit(c)}>Edit</Button>
                  <Button variant="danger" onClick={() => remove(c.id)}>Delete</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} title={editing ? 'Edit Category' : 'Add Category'} onClose={() => setModalOpen(false)}>
        <div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
          </div>
          <div className="mb-3">
            <label className="form-label">Icon (emoji)</label>
            <input className="form-control" value={form.icon} onChange={e=>setForm(f=>({...f, icon:e.target.value}))} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))}/>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
