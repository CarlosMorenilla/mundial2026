import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../services/authStore';

export default function Login() {
  const { login } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mundial2026 Login</Text>
      <Button title="Sign in with Google" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
