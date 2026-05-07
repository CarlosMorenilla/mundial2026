import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://mundial2026-pxdz.onrender.com';

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async () => {
    try {
      // Mock login for testing (replace with real Google OAuth later)
      const mockUser = {
        id: 'test-user-id',
        email: 'test@mundial2026.com',
        username: 'testuser',
        avatarUrl: null
      };
      // Get a real JWT from backend
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        idToken: 'mock-id-token'
      });
      const { user, token } = response.data;
      set({ user: user || mockUser, token, isAuthenticated: true });
      alert('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      // Fallback to mock if backend fails
      const mockUser = {
        id: 'test-user-id',
        email: 'test@mundial2026.com',
        username: 'testuser',
        avatarUrl: null
      };
      set({ user: mockUser, token: 'mock-token', isAuthenticated: true });
      alert('Login successful (offline mode)!');
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
