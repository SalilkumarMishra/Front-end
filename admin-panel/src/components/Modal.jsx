import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{title}</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}><X /></button>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
