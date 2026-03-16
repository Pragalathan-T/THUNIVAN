import React, { useState } from "react";
import { Search, MapPin, User, Menu } from "lucide-react";
import AuthModal from "../auth/AuthModal";
import { getCurrentUser, logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {

    logoutUser();

    navigate("/");

    window.location.reload();

  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT - Logo */}

          <div className="flex items-center gap-3 cursor-pointer">

            <div className="bg-emerald-600 p-2 rounded-xl">
              <MapPin className="text-white w-5 h-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-800">
                THUNAIVAN
              </h1>

              <p className="text-xs text-gray-500">
                Smart Tourism
              </p>
            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center gap-1 text-gray-600 text-sm">
              <MapPin size={16} />
              <span>Kanyakumari</span>
            </div>

            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium">
              Become a Guide
            </button>

            {user ? (

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
              >
                Logout
              </button>

            ) : (

              <div
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 cursor-pointer hover:shadow-md transition"
              >
                <Menu size={18} className="text-gray-600" />
                <User size={18} className="text-gray-600" />
              </div>

            )}

          </div>

        </div>

      </nav>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}

    </>
  );
};

export default Navbar;