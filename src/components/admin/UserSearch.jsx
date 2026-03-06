import { useState } from "react";
import axios from "../../api/axios";

export default function UserSearch({ setUsers }) {

  const [id, setId] = useState("");

  const searchUser = async () => {

    if (!id) return;

    try {

      const res = await axios.get(`/api/users/${id}`);

      setUsers([res.data]);

    } catch (err) {
      alert("User not found");
    }
  };

  return (

    <div className="flex gap-4 mb-6">

      <input
        type="number"
        placeholder="Search user by ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-700"
      />

      <button
        onClick={searchUser}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Search
      </button>

    </div>

  );
}