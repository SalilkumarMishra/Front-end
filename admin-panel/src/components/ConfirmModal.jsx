import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({ isOpen, title='Confirm', message, onCancel, onConfirm }) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <p>{message}</p>
      <div className="d-flex gap-2 justify-content-end mt-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
