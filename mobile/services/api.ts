import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const getMatches = () => axios.get(`${API_URL}/api/matches`).then(r => r.data);
export const getLeaderboard = () => axios.get(`${API_URL}/api/leaderboard`).then(r => r.data);
export const createPrediction = (data: any) => axios.post(`${API_URL}/api/predictions`, data).then(r => r.data);
