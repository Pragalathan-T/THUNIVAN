import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GridMotion from "./GridMotion";
import grid1 from "../../assets/images/grid1.jpg"
import grid2 from "../../assets/images/grid2.jpg"
import grid3 from "../../assets/images/grid3.jpg"
import grid4 from "../../assets/images/grid4.jpg"
import grid5 from "../../assets/images/grid5.jpg"
import grid6 from "../../assets/images/grid6.jpg"


export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("selection");

  const baseImages = [
    grid1,grid2,grid3,grid4,grid5,grid6
  ];

  function shuffleArray(array) {
  return [...array]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
const totalItems=28;
const images=shuffleArray(
  Array(Math.ceil(totalItems/baseImages.length))
  .fill(baseImages)
  .flat()
).slice(0,totalItems);
 


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[950px] h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl z-50"
        >
          ✕
        </button>

        <motion.div
          animate={{
            x: mode === "selection" ? "0%" : "-50%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex w-[200%] h-full"
        >

          {/* SCREEN 1 */}
          <div className="w-1/2 h-full flex">

            <div className="w-1/2 flex items-center justify-center p-10 bg-gray-50">
              <div className="space-y-6 w-full">
                <h2 className="text-3xl font-bold">Welcome</h2>

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

            <div className="w-1/2 h-full">
              <GridMotion items={images} />
            </div>
          </div>

          {/* SCREEN 2 */}
          <div className="w-1/2 h-full flex">

            <div className="w-1/2 h-full">
              <GridMotion items={images} />
            </div>

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