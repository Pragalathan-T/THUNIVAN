import axios from "axios";

const guiderApi = axios.create({
  baseURL: "https://sakthiveltouristbackend.onrender.com",
});

export const createGuider = async ({ name, email, password, phoneNumber, address, location, localGuideDetails, documents, guiderPhoto }) => {
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("email", email);
  params.append("password", password);
  params.append("phoneNumber", phoneNumber);
  params.append("address", address);
  params.append("location", location);
  params.append("localGuideDetails", localGuideDetails);
  if (documents && documents.length > 0) {
    documents.forEach((file) => {
      params.append("documents", file.name);
    });
  }

  const formData = new FormData();
  if (documents && documents.length > 0) {
    documents.forEach((file) => formData.append("documents", file));
  }
  if (guiderPhoto) {
    formData.append("guiderPhoto", guiderPhoto);
  }

  return guiderApi.post(
    `/api/guiders/create?${params.toString()}`,
    formData
  );
};

export const getAllGuiders = async () => {
  return guiderApi.get("/api/guiders");
};

export const getGuiderById = async (guiderId) => {
  return guiderApi.get(`/api/guiders/${guiderId}`);
};

export const updateGuiderStatus = async (guiderId, status = "VERIFIED") => {
  return guiderApi.put(`/api/guiders/${guiderId}/status`, {
    status,
  });
};