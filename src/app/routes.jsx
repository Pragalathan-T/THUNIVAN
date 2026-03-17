import { Routes, Route } from "react-router-dom";

import AppLayout from "./AppLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import GuideDashboard from "../pages/guide/GuideDashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {

  return (

    <Routes>

      {/* USER LANDING */}
      <Route path="/" element={<AppLayout />} />

      {/* ADMIN DASHBOARD WITH NAVBAR */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/guide/dashboard"
        element={
          <ProtectedRoute allowedRoles={["GUIDE"]}>
            <AppLayout>
              <GuideDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}