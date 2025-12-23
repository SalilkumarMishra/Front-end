import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

export default function EditProfileModal({ open, initialData = {}, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    dob: "",
    address: "",
    about: "",
    avatar: "", // url
    avatarFile: null, // new file
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "Admin",
        dob: initialData.dob || "",
        address: initialData.address || "",
        about: initialData.about || "",
        avatar: initialData.avatar || "",
        avatarFile: null,
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setForm((s) => ({ ...s, avatarFile: f, avatar: URL.createObjectURL(f) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (payload.avatarFile) delete payload.avatarFile;
    if (onSave) await onSave(payload);
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog-custom">
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="mb-0">Edit Profile</h5>
            <button className="btn btn-sm btn-light" onClick={onClose}>Close</button>
          </div>

          {/* Remove profile button */}
          {form.avatar && form.avatar !== "" && (
            <div className="col-12 text-center mt-2">
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => setForm({ ...form, avatar: "", avatarFile: null })}
              >
                Remove Profile Picture
              </button>
            </div>
          )}

          {/* Avatar Preview & Upload */}
          <form onSubmit={submit} className="row g-3">
            <div className="col-12 d-flex gap-3 align-items-center">
              <div style={{ width: 96, height: 96, overflow: "hidden", borderRadius: "50%" }}>
                {form.avatar ? (
                  <img
                    src={form.avatar}
                    alt="avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <CgProfile size={96} style={{ color: "rgb(130, 209,115)" }} />
                )}
              </div>
              <div>
                <label className="form-label mb-1">Upload photo</label>
                <input type="file" className="form-control form-control-sm" accept="image/*" onChange={handleFile} />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Full name</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input className="form-control" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </div>

            <div className="col-12">
              <label className="form-label">Address</label>
              <input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="col-12">
              <label className="form-label">About</label>
              <textarea className="form-control" rows={3} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
            </div>

            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success edit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
