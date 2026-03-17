import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axios";

import AdminUsersTable from "./AdminUsersTable";
import AdminGuidesTable from "./AdminGuideTable";
import UserSearch from "./UserSearch";

import { getAllGuiders, updateGuiderStatus } from "../../api/guiderService";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  // ================= USERS =================

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const deleteAllUsers = async () => {
    try {
      await axios.delete("/api/users/delete-all");
      toast.success("All users deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete users");
    }
  };

  // ================= GUIDES =================

  const fetchGuides = async () => {
    try {
      const res = await getAllGuiders();
      setGuides(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch guides");
    }
  };

  const handleVerifyGuide = async (guiderId) => {
    try {
      await updateGuiderStatus(guiderId, "VERIFIED");
      toast.success("Guide verified successfully");
      fetchGuides();
    } catch (err) {
      toast.error("Failed to verify guide");
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchUsers();
    fetchGuides();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-10 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-3">

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "users"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "guides"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
        >
          Guides
        </button>

      </div>

      {/* ================= USERS TAB ================= */}

      {activeTab === "users" && (
        <>
          <div className="mb-6">
            <UserSearch setUsers={setUsers} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <AdminUsersTable
              users={users}
              deleteUser={deleteUser}
            />
          </div>

          <button
            onClick={deleteAllUsers}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Delete All Users
          </button>
        </>
      )}

      {/* ================= GUIDES TAB ================= */}

      {activeTab === "guides" && (
        <AdminGuidesTable
          guides={guides}
          handleVerifyGuide={handleVerifyGuide}
        />
      )}

    </div>
  );
}