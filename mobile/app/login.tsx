import { View, Text, Button } from 'react-native';
import { useAuthStore } from '../services/authStore';

export default function Login() {
  const { login } = useAuthStore();
  
  return (
    <View>
      <Text>Mundial2026 Login</Text>
      <Button title="Sign in with Google" onPress={login} />
    </View>
  );
}
