import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";

export default function LoginForm({ switchToRegister, switchToSelection, onClose }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const res = await loginUser(formData);

      const user = res.data;

      toast.success("Login successful 🎉");

      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {

        onClose();

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      }, 800);

    } catch (error) {

      toast.error("Invalid email or password ❌");

    }
  };

  return (
    <div className="w-full max-w-md mx-auto">

      <button
        onClick={switchToSelection}
        className="mb-4 text-sm text-gray-500 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6">Welcome Back 👋</h2>

      <p className="text-gray-500 mb-8">
        Login to continue exploring experiences.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

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

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Login
        </button>

      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Create Account
        </button>
      </p>

    </div>
  );
}