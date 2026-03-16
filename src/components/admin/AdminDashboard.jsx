import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import AdminUsersTable from "./AdminUsersTable";
import UserSearch from "./UserSearch";
import { getAllGuiders, updateGuiderStatus } from "../../api/guiderService";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

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
      await updateGuiderStatus(guiderId);
      toast.success("Guide verified successfully");
      fetchGuides();
    } catch (err) {
      toast.error("Failed to verify guide");
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === "VERIFIED") {
      return "bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-semibold";
    }

    if (status === "REJECTED") {
      return "bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold";
    }

    return "bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold";
  };

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

      {activeTab === "users" && (
        <>
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
        </>
      )}

      {activeTab === "guides" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {guides.map((guide) => {
                const guiderId = guide.guiderId ?? guide.id;
                const status = guide.status || "PENDING";

                return (
                  <tr
                    key={guiderId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      {guide.name}
                    </td>
                    <td className="p-4 text-gray-600">{guide.email}</td>
                    <td className="p-4 text-gray-600">{guide.phoneNumber}</td>
                    <td className="p-4 text-gray-600">{guide.location}</td>
                    <td className="p-4">
                      <span className={getStatusBadgeClass(status)}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {status !== "VERIFIED" ? (
                        <button
                          onClick={() => handleVerifyGuide(guiderId)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}