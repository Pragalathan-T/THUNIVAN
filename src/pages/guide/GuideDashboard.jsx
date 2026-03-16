import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const getStatusBadgeClass = (status) => {
  if (status === "VERIFIED") {
    return "bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-semibold";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold";
  }

  return "bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold";
};

export default function GuideDashboard() {
  const [packages, setPackages] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    packageTitle: "",
    description: "",
    location: "",
    price: "",
    maxPeople: "",
    durationDays: "",
    startLocation: "",
    endLocation: "",
    difficultyLevel: "EASY",
    foodIncluded: false,
    transportIncluded: false,
    itinerary: "",
    includedServices: "",
    excludedServices: "",
    packageImages: [],
  });

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const guideName = storedUser?.username || "Guide";
  const guiderId = storedUser?.id ?? storedUser?.guiderId;

  const userVisiblePackages = useMemo(
    () => packages.filter((pkg) => (pkg?.status || "").toUpperCase() === "VERIFIED"),
    [packages]
  );

  const fetchMyPackages = useCallback(async () => {
    if (!guiderId) {
      toast.error("Guide ID not found. Please login again.");
      return;
    }

    try {
      const res = await axios.get(`/api/packages/guider/${guiderId}`);
      setPackages(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch packages");
    }
  }, [guiderId]);

  useEffect(() => {
    fetchMyPackages();
  }, [fetchMyPackages]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    if (type === "file" && name === "packageImages") {
      setFormData((prev) => ({
        ...prev,
        packageImages: Array.from(files || []),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      packageTitle: "",
      description: "",
      location: "",
      price: "",
      maxPeople: "",
      durationDays: "",
      startLocation: "",
      endLocation: "",
      difficultyLevel: "EASY",
      foodIncluded: false,
      transportIncluded: false,
      itinerary: "",
      includedServices: "",
      excludedServices: "",
      packageImages: [],
    });
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();

    if (!guiderId) {
      toast.error("Guide ID not found. Please login again.");
      return;
    }

    try {
      setIsSubmitting(true);

      const itineraryArray = formData.itinerary
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const includedServicesArray = formData.includedServices
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const excludedServicesArray = formData.excludedServices
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        guiderId,
        packageTitle: formData.packageTitle,
        description: formData.description,
        location: formData.location,
        price: Number(formData.price),
        maxPeople: Number(formData.maxPeople),
        durationDays: Number(formData.durationDays),
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        difficultyLevel: formData.difficultyLevel,
        foodIncluded: formData.foodIncluded,
        transportIncluded: formData.transportIncluded,
        itinerary: itineraryArray,
        includedServices: includedServicesArray,
        excludedServices: excludedServicesArray,
      };

      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      formData.packageImages.forEach((file) => {
        body.append("packageImages", file);
      });

      await axios.post("/api/packages/create", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Package created successfully");
      setShowCreateModal(false);
      resetForm();
      fetchMyPackages();
    } catch {
      toast.error("Failed to create package");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <section className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Welcome, {guideName}</h2>
      </section>

      <section className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">My Packages</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 font-semibold"
          >
            Create Package
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Only VERIFIED packages are visible to users.
        </p>

        {packages.length === 0 ? (
          <p className="text-gray-600">No packages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg) => {
              const packageId = pkg.packageId ?? pkg.id;
              const packageName = pkg.name ?? pkg.title ?? "Untitled Package";
              const status = (pkg.status || "PENDING").toUpperCase();

              return (
                <div key={packageId} className="border border-gray-200 rounded-xl p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">{packageName}</h3>
                  <span className={getStatusBadgeClass(status)}>{status}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">User Visibility Summary</h2>
        <p className="text-gray-600">
          Verified packages visible to users: {userVisiblePackages.length}
        </p>
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create Package</h2>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePackage}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Package Title</label>
                  <input
                    type="text"
                    name="packageTitle"
                    required
                    value={formData.packageTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Description</label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 resize-none h-24"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Price</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Max People</label>
                  <input
                    type="number"
                    name="maxPeople"
                    required
                    value={formData.maxPeople}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Duration Days</label>
                  <input
                    type="number"
                    name="durationDays"
                    required
                    value={formData.durationDays}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Difficulty Level</label>
                  <select
                    name="difficultyLevel"
                    required
                    value={formData.difficultyLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Start Location</label>
                  <input
                    type="text"
                    name="startLocation"
                    required
                    value={formData.startLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">End Location</label>
                  <input
                    type="text"
                    name="endLocation"
                    required
                    value={formData.endLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    id="foodIncluded"
                    type="checkbox"
                    name="foodIncluded"
                    checked={formData.foodIncluded}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="foodIncluded" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Food Included</label>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    id="transportIncluded"
                    type="checkbox"
                    name="transportIncluded"
                    checked={formData.transportIncluded}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="transportIncluded" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Transport Included</label>
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Itinerary</label>
                  <textarea
                    name="itinerary"
                    required
                    value={formData.itinerary}
                    onChange={handleInputChange}
                    placeholder="Day 1: ..., Day 2: ..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 resize-none h-24"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Included Services</label>
                  <textarea
                    name="includedServices"
                    required
                    value={formData.includedServices}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 resize-none h-24"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Excluded Services</label>
                  <textarea
                    name="excludedServices"
                    required
                    value={formData.excludedServices}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 resize-none h-24"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Package Images</label>
                  <input
                    type="file"
                    name="packageImages"
                    required
                    multiple
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
                >
                  {isSubmitting ? "Creating..." : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
