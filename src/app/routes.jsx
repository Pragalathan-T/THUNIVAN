import { Routes, Route } from "react-router-dom";

import AppLayout from "./AppLayout";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AppRoutes() {

  return (

    <Routes>

      {/* USER LANDING */}
      <Route path="/" element={<AppLayout />} />

      {/* ADMIN DASHBOARD WITH NAVBAR */}
      <Route
        path="/admin"
        element={
          <AppLayout>
            <AdminDashboard />
          </AppLayout>
        }
      />

    </Routes>

  );
}