export default function AdminUsersTable({ users, deleteUser }) {

  return (

    <table className="w-full">

      <thead className="border-b border-gray-200 bg-gray-50">

        <tr className="text-left text-sm text-gray-600">

          <th className="p-4">User</th>
          <th className="p-4">Email</th>
          <th className="p-4">Role</th>
          <th className="p-4 text-right">Actions</th>

        </tr>

      </thead>

      <tbody>

        {users.map((user) => (

          <tr
            key={user.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >

            {/* USER */}

            <td className="p-4 flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <span className="text-gray-800 font-medium">
                {user.username}
              </span>

            </td>

            {/* EMAIL */}

            <td className="p-4 text-gray-600">
              {user.email}
            </td>

            {/* ROLE */}

            <td className="p-4">

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {user.role}
              </span>

            </td>

            {/* ACTION */}

            <td className="p-4 text-right">

              <button
                onClick={() => deleteUser(user.id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}