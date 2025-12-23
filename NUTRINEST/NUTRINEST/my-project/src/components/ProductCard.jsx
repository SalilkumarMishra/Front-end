import React from 'react';
import Button from './Button';
import { Edit, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top" alt={product.name} style={{height:180, objectFit:'cover'}}/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="mb-1 text-muted small">{product.category}</p>
        <p className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{product.price}</strong>
          <span className="badge bg-info text-dark">{product.stock} pcs</span>
        </p>
        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary" onClick={() => onEdit(product)}><Edit/> Edit</Button>
          <Button variant="danger" onClick={() => onDelete(product)}><Trash2/> Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
