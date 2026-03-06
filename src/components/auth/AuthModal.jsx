import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GridMotion from "./GridMotion";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("selection");

  const images = [
    "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600766165518-2b6a49d3c3b4?w=1600&q=80",
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[950px] h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl z-50"
        >
          ✕
        </button>

        {/* SLIDING WRAPPER */}
        <motion.div
          animate={{
            x:
              mode === "selection"
                ? "0%"
                : "-50%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex w-[200%] h-full"
        >

          {/* ===== SCREEN 1 (Selection + Grid) ===== */}
          <div className="w-1/2 h-full flex">

            {/* LEFT SIDE */}
            <div className="w-1/2 flex items-center justify-center p-10 bg-gray-50">
              <div className="space-y-6 w-full">
                <h2 className="text-3xl font-bold">Welcome 👋</h2>

                <button
                  onClick={() => setMode("login")}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => setMode("register")}
                  className="w-full py-3 border border-emerald-600 text-emerald-600 rounded-xl font-semibold"
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* RIGHT SIDE GRID */}
            <div className="w-1/2 h-full">
              <GridMotion images={images} />
            </div>
          </div>

          {/* ===== SCREEN 2 (Form + Grid shifted left) ===== */}
          <div className="w-1/2 h-full flex">

            {/* LEFT SIDE GRID */}
            <div className="w-1/2 h-full">
              <GridMotion images={images} />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="w-1/2 flex items-center justify-center p-10 bg-gray-50">
            {mode === "login" && (
  <LoginForm
    switchToRegister={() => setMode("register")}
    switchToSelection={() => setMode("selection")}
    onClose={onClose}
  />
)}

              {mode === "register" && (
                <RegisterForm
                  switchToLogin={() => setMode("login")}
                  switchToSelection={() => setMode("selection")}
                />
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}