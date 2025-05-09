import api from './api';

export const getRecipientProfile = async (userId) => {
  const response = await api.get(`/recipients/${userId}`);
  return response.data;
};

export const updateRecipientProfile = async (userId, data) => {
  const response = await api.put(`/recipients/${userId}`, data);
  return response.data;
};

export const createBloodRequest = async (data) => {
  const response = await api.post('/requests', data);
  return response.data;
};

export const getMatches = async (userId) => {
  const response = await api.get(`/recipients/${userId}/matches`);
  return response.data;
};