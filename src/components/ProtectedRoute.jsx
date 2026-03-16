import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const role = storedUser?.role;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
