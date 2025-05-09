import api from './api';

export const getDonorProfile = async (userId) => {
  const response = await api.get(`/donors/${userId}`);
  return response.data;
};

export const updateDonorProfile = async (userId, data) => {
  const response = await api.put(`/donors/${userId}`, data);
  return response.data;
};

export const getDonationHistory = async (userId) => {
  const response = await api.get(`/donors/${userId}/history`);
  return response.data;
};

export const getNearbyRequests = async (location) => {
  const response = await api.get('/donors/nearby-requests', {
    params: { lat: location.lat, lng: location.lng },
  });
  return response.data;
};