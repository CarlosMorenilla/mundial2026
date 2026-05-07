import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../services/authStore';

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {user?.username}!</Text>
      <Button title="Matches" onPress={() => router.push('/matches')} />
      <Button title="Leaderboard" onPress={() => router.push('/leaderboard')} />
      <Button title="Profile" onPress={() => router.push('/profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
