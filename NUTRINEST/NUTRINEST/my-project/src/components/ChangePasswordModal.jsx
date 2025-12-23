// src/components/ChangePasswordModal.jsx
import React, { useState } from "react";

export default function ChangePasswordModal({ open, onClose, onSave }) {
  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (newP !== confirm) {
      setMsg("Passwords do not match");
      return;
    }
    setMsg("");
    if (onSave) {
      await onSave({ oldPassword: oldP, newPassword: newP });
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog-custom">
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="mb-0">Change Password</h5>
            <button className="btn btn-sm btn-light" onClick={onClose}>Close</button>
          </div>

          <form onSubmit={submit} className="row g-3">
            <div className="col-12">
              <label className="form-label">Current password</label>
              <input type="password" className="form-control" value={oldP} onChange={(e) => setOldP(e.target.value)} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">New password</label>
              <input type="password" className="form-control" value={newP} onChange={(e) => setNewP(e.target.value)} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Confirm password</label>
              <input type="password" className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </div>

            {msg && <div className="col-12 text-danger">{msg}</div>}

            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Update password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
