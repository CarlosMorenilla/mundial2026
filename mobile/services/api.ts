import axios from 'axios';
import { useAuthStore } from './authStore';

const API_URL = 'https://mundial2026-pxdz.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMatches = (matchday?: number) => 
  api.get(`/api/matches/${matchday || ''}`).then(r => r.data);
export const getLeaderboard = () => api.get('/api/leaderboard').then(r => r.data);
export const createPrediction = (data: any) => api.post('/api/predictions', data).then(r => r.data);
export const getUserPredictions = (userId: string) => 
  api.get(`/api/predictions/user/${userId}`).then(r => r.data);
export const getProfile = () => api.get('/api/auth/profile').then(r => r.data);
