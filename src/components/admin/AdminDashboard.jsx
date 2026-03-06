import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AdminUsersTable from "./AdminUsersTable";
import UserSearch from "./UserSearch";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllUsers = async () => {
    try {
      await axios.delete("/api/users/delete-all");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-10 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Search */}
      <div className="mb-6">
        <UserSearch setUsers={setUsers} />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <AdminUsersTable
          users={users}
          deleteUser={deleteUser}
        />
      </div>

      {/* Delete All */}
      <button
        onClick={deleteAllUsers}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Delete All Users
      </button>

    </div>
  );
}