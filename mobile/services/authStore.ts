import { create } from 'zustand';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

const API_URL = 'https://mundial2026-pxdz.onrender.com';
const GOOGLE_CLIENT_ID = '87667049725-vd2dr4ei6d1qvg2f99fr476352bsp48s.apps.googleusercontent.com';

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
      // Use WebBrowser for OAuth (no crypto needed)
      const redirectUrl = 'https://auth.expo.io/@your-username/mundial2026';
      
      const result = await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUrl)}&` +
        `response_type=id_token&` +
        `scope=profile%20email`,
        redirectUrl
      );
      
      if (result.type === 'success') {
        const url = result.url;
        const params = new URL(url).hashparams;
        const idToken = params.get('id_token');
        
        if (idToken) {
          const response = await axios.post(`${API_URL}/api/auth/google`, {
            idToken: idToken
          });
          
          const { user, token } = response.data;
          set({ user, token, isAuthenticated: true });
          alert('Login successful!');
        }
      } else {
        alert('Login cancelled');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Error: ' + error.message);
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
