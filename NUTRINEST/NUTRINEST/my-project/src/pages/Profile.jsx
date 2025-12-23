import React, { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
  // Load saved admin profile from localStorage
  const savedData = JSON.parse(localStorage.getItem("adminData"));

  const [adminData, setAdminData] = useState(
    savedData || {
      name: "Badal Prasad",
      email: "admin@gmail.com",
      phone: "+91 99999 99999",
      role: "Admin",
      avatar: "", 
      dob: "2004-01-10",
      address: "Kanpur, Uttar Pradesh",
      about: "Head admin at NUTRINEST",
      activityLogs: [
        { id: 1, text: "Signed in", time: "2025-12-12 09:30" },
        { id: 2, text: "Updated product", time: "2025-12-11 16:10" },
        { id: 3, text: "Edited user permissions", time: "2025-12-10 12:04" },
      ],
    }
  );

  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);

  // Save profile changes
  const handleSaveProfile = async (payload) => {
    const updated = {
      ...adminData,
      ...payload,
      avatar: payload.avatar || "", 
    };
    setAdminData(updated);

    localStorage.setItem("adminData", JSON.stringify(updated));

    if (payload.password) {
      localStorage.setItem("adminPassword", payload.password);
    }

    setEditOpen(false);
    return true;
  };

  // Change password
  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    const savedPassword = localStorage.getItem("adminPassword") || "admin123";
    if (oldPassword !== savedPassword) {
      alert("Old password incorrect");
      return false;
    }
    localStorage.setItem("adminPassword", newPassword);
    setPwdOpen(false);
    return true;
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Admin Profile</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setPwdOpen(true)}>
              Change Password
            </button>
            <button className="btn btn-success edit-btn" onClick={() => setEditOpen(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="card shadow-sm p-4 mb-4 profile-card">
          <div className="d-flex flex-column flex-md-row gap-4">
            <div className="text-center text-md-start">
              <div className="avatar-large mb-3 mx-auto mx-md-0">
                {adminData.avatar ? (
                  <img
                    src={adminData.avatar}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: 160, height: 160, objectFit: "cover" }}
                  />
                ) : (
                  <CgProfile size={160} style={{ color: "rgb(130, 209,115)" }} />
                )}
              </div>
              <div className="d-none d-md-block mt-2">
                <h3 className="mb-1 fw-bold">{adminData.name}</h3>
                <p className="text-muted mb-0">{adminData.role}</p>
              </div>
            </div>

            <div className="flex-fill">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3 className="d-md-none mb-1 fw-bold">{adminData.name}</h3>
                  <p className="text-muted d-md-none">{adminData.role}</p>
                </div>
              </div>

              {/* Basic stats */}
              <div className="row mt-3">
                <div className="col-sm-6 mb-3">
                  <label className="text-muted small">Email</label>
                  <div className="fw-semibold">{adminData.email}</div>
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="text-muted small">Phone</label>
                  <div className="fw-semibold">{adminData.phone}</div>
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="text-muted small">Role</label>
                  <div className="fw-semibold">{adminData.role}</div>
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="text-muted small">Date of Birth</label>
                  <div className="fw-semibold">
                    {adminData.dob ? new Date(adminData.dob).toLocaleDateString() : "-"}
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label className="text-muted small">Address</label>
                  <div className="fw-semibold">{adminData.address}</div>
                </div>
                <div className="col-12">
                  <label className="text-muted small">About</label>
                  <div className="fw-semibold">{adminData.about || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="card shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Activity Logs</h5>
            <small className="text-muted">Recent activity</small>
          </div>

          <ul className="list-group list-group-flush">
            {adminData.activityLogs.map((a) => (
              <li
                key={a.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>{a.text}</div>
                <small className="text-muted">{a.time}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        open={editOpen}
        initialData={adminData}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveProfile}
      />
      <ChangePasswordModal
        open={pwdOpen}
        onClose={() => setPwdOpen(false)}
        onSave={handleChangePassword}
      />
    </div>
  );
}
