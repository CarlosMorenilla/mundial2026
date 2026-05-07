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
      alert('Google login - use web OAuth flow');
      // For now, create a mock login for testing
      // In production, use expo-auth-session with proper crypto support
      const mockUser = {
        id: 'test-user-id',
        email: 'test@mundial2026.com',
        username: 'testuser',
        avatarUrl: null
      };
      const mockToken = 'mock-jwt-token';
      set({ user: mockUser, token: mockToken, isAuthenticated: true });
      alert('Mock login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Error: ' + error.message);
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
