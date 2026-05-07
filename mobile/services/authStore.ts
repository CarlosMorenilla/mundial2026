import { create } from 'zustand';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = '87667049725-vd2dr4ei6d1qvg2f99fr476352bsp48s.apps.googleusercontent.com';
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
      alert('Login pressed');
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
      });
      
      const result = await request.promptAsync({ useProxy: true });
      
      if (result.type === 'success') {
        const { id_token } = result.params;
        
        const response = await axios.post(`${API_URL}/api/auth/google`, {
          idToken: id_token
        });
        
        const { user, token } = response.data;
        set({ user, token, isAuthenticated: true });
        alert('Login successful!');
      } else {
        alert('Auth cancelled: ' + result.type);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Error: ' + error.message);
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
