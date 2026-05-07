import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../services/authStore';

export default function Login() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);
  
  const handleLogin = async () => {
    await login();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mundial2026 Login</Text>
      <Button title="Sign in with Google" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
