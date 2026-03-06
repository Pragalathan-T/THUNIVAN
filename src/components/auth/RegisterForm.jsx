import { useState } from "react";
import { registerUser } from "../../api/authApi";
import toast from "react-hot-toast";

export default function RegisterForm({ switchToLogin, switchToSelection }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await registerUser(formData);

    toast.success("Account created successfully ✅");

    setTimeout(() => {
      switchToLogin();
    }, 2000);

  } catch (error) {
    toast.error("Registration failed ❌");
  }
};

  return (
    <div className="w-full max-w-md mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={switchToSelection}
        className="mb-4 text-sm text-gray-500 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6">Create Account 🚀</h2>
      <p className="text-gray-500 mb-8">
        Join and start exploring amazing experiences.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Create Account
        </button>

      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Login
        </button>
      </p>

    </div>
  );
}