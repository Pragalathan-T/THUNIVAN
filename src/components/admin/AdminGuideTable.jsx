import { useState } from "react";

export default function AdminGuidesTable({ guides, handleVerifyGuide }) {

  const [selectedGuide, setSelectedGuide] = useState(null);

  const getStatusBadgeClass = (status) => {
    if (status === "VERIFIED") {
      return "bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-semibold";
    }

    if (status === "REJECTED") {
      return "bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold";
    }

    return "bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold";
  };

  return (
    <>
      {/* ================= GUIDE TABLE ================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">

        <table className="w-full">

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Details</th>
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

                  <td className="p-4 font-medium text-gray-800">
                    {guide.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {guide.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {guide.phoneNumber}
                  </td>

                  <td className="p-4 text-gray-600">
                    {guide.location}
                  </td>

                  <td className="p-4">
                    <span className={getStatusBadgeClass(status)}>
                      {status}
                    </span>
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => setSelectedGuide(guide)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View Details
                    </button>

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

                      <span className="text-gray-400 text-sm">
                        Verified
                      </span>

                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* ================= GUIDE DETAILS MODAL ================= */}

      {selectedGuide && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-lg w-[650px] max-h-[85vh] overflow-y-auto p-6">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Guide Application
              </h2>

              <button
                onClick={() => setSelectedGuide(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

            </div>

            {/* Guide Photo */}

            {selectedGuide.guiderImage && (

              <div className="mb-6 flex justify-center">

                <img
                  src={selectedGuide.guiderImage}
                  alt="Guide"
                  className="w-32 h-32 object-cover rounded-full border"
                />

              </div>

            )}

            {/* Personal Info */}

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">

              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{selectedGuide.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedGuide.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedGuide.phoneNumber}</p>
              </div>

              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{selectedGuide.location}</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{selectedGuide.address}</p>
              </div>

            </div>

            {/* Guide Description */}

            <div className="mb-6">

              <p className="text-gray-500 mb-1">Guide Description</p>

              <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                {selectedGuide.localGuideDetails}
              </div>

            </div>

            {/* Documents */}

            <div className="mb-6">

              <p className="text-gray-500 mb-2">Uploaded Documents</p>

              <div className="flex flex-wrap gap-3">

                {selectedGuide.documents && selectedGuide.documents.length > 0 ? (

                  selectedGuide.documents.map((doc, index) => (

                    <a
                      key={index}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100"
                    >
                      Document {index + 1}
                    </a>

                  ))

                ) : (

                  <p className="text-gray-400 text-sm">
                    No documents uploaded
                  </p>

                )}

              </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}