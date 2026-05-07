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
      const mockToken = 'mock-jwt-token';
      set({ user: mockUser, token: mockToken, isAuthenticated: true });
      alert('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Error: ' + error.message);
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
