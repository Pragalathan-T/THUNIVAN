import React, { useState } from "react";
import { MapPin, User, Menu, X } from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import toast from "react-hot-toast";
import AuthModal from "../auth/AuthModal";
import { getCurrentUser, logoutUser } from "../../api/authApi";
import { createGuider } from "../../api/guiderService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [showAuth, setShowAuth] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isSubmittingGuide, setIsSubmittingGuide] = useState(false);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [guiderPhotoFile, setGuiderPhotoFile] = useState(null);
  const [guideForm, setGuideForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    location: "",
    localGuideDetails: "",
  });

  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {

    logoutUser();

    navigate("/");

    window.location.reload();

  };

  const handleBecomeGuideClick = () => {
    if (!user) {
      toast("Please register / login first", { icon: "⚠️" });
      setShowAuth(true);
      return;
    }

    setShowGuideModal(true);
  };

  const handleGuideInputChange = (e) => {
    const { name, value } = e.target;

    setGuideForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetGuideForm = () => {
    setGuideForm({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      location: "",
      localGuideDetails: "",
    });
    setDocumentFiles([]);
    setGuiderPhotoFile(null);
  };

  const handleGuideSubmit = async (e) => {
    e.preventDefault();

    if (documentFiles.length < 2) {
      toast.error("Please upload at least 2 documents");
      return;
    }

    try {
      setIsSubmittingGuide(true);

      await createGuider({
        ...guideForm,
        documents: documentFiles,
        guiderPhoto: guiderPhotoFile,
      });

      toast.success("Guide request submitted successfully");
      setShowGuideModal(false);
      resetGuideForm();
    } catch (error) {
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
      toast.error("Failed to submit guide request");
    } finally {
      setIsSubmittingGuide(false);
    }
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
              <span>Coimbatore</span>
            </div>

            <button
              onClick={handleBecomeGuideClick}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium"
            >
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

      <AnimatePresence>
        {showGuideModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Become a Guide
                </h2>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleGuideSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={guideForm.name}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={guideForm.email}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Password</label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={guideForm.password}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      required
                      value={guideForm.phoneNumber}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={guideForm.address}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Location</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={guideForm.location}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Local Guide Details</label>
                    <textarea
                      name="localGuideDetails"
                      required
                      value={guideForm.localGuideDetails}
                      onChange={handleGuideInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 resize-none h-24"
                    />
                  </div>

                  {/* GUIDER PHOTO */}
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                      Guider Photo
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                      {guiderPhotoFile ? (
                        <img
                          src={URL.createObjectURL(guiderPhotoFile)}
                          alt="preview"
                          className="h-full w-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-400">
                          <span className="text-2xl">🖼️</span>
                          <span className="text-xs">Click to upload photo</span>
                          <span className="text-xs text-gray-300">JPG, PNG supported</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setGuiderPhotoFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>

                  {/* DOCUMENTS */}
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                      Documents <span className="text-gray-400 normal-case font-normal">(min. 2 required)</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                      <div className="flex flex-col items-center gap-1 text-gray-400">
                        <span className="text-xl">📎</span>
                        <span className="text-xs">Click to add documents</span>
                        <span className="text-xs text-gray-300">PDF, DOC, DOCX supported</span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        className="hidden"
                        onChange={(e) => setDocumentFiles((prev) => [...prev, ...Array.from(e.target.files || [])])}
                      />
                    </label>

                    {documentFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {documentFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg px-3 py-1.5">
                            <span>📄</span>
                            <span className="max-w-[140px] truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => setDocumentFiles((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-emerald-400 hover:text-red-500 font-bold ml-1"
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className={`text-xs mt-2 ${documentFiles.length < 2 ? "text-red-400" : "text-emerald-500"}`}>
                      {documentFiles.length} file(s) selected — minimum 2 required
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setShowGuideModal(false)}
                    className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingGuide}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
                  >
                    {isSubmittingGuide ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;