import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ avatarUrl }) {
  const hasCustomAvatar = avatarUrl && avatarUrl !== "" && avatarUrl !== "/profile.jpg";

  return (
    <Link to="/profile" className="d-inline-block">
      {hasCustomAvatar ? (
        <img
          src={avatarUrl}
          className="rounded-circle"
          style={{
            width: 44,
            height: 44,
            objectFit: "cover",
            cursor: "pointer",
            border: "2px solid rgb(130, 209,115)",
            padding: "1px",
          }}
        />
      ) : (
        <CgProfile
          size={44}
          style={{
            color: "rgb(130, 209,115)",
            cursor: "pointer",
            padding: "1px",
          }}
        />
      )}
    </Link>
  );
}
