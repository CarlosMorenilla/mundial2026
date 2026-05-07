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
  setUser: (user: any, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async () => {
    try {
      alert('Login pressed');
      console.log('Login initiated');
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      console.log('Redirect URI:', redirectUri);
      
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
      });
      
      console.log('Prompting Google Auth...');
      const result = await request.promptAsync({ useProxy: true });
      console.log('Auth result:', result.type);
      
      if (result.type === 'success') {
        const { id_token } = result.params;
        console.log('Got id_token, sending to backend...');
        
        const response = await axios.post(`${API_URL}/api/auth/google`, {
          idToken: id_token
        });
        
        const { user, token } = response.data;
        set({ user, token, isAuthenticated: true });
        alert('Login successful!');
      } else {
        alert('Auth cancelled or failed: ' + result.type);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Error en login: ' + error.message);
    }
  },
  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setUser: (user, token) => set({ user, token, isAuthenticated: true }),
}));
