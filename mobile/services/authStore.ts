import { create } from 'zustand';
import * as AuthSession from 'expo-auth-session';

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
    // Implement Google Auth flow
    console.log('Google login');
  },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
