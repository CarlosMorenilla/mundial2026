import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../services/authStore';

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Esperar a que el layout se monte completamente
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      // Esperar un frame más para asegurar que el router está listo
      const navTimer = setTimeout(() => {
        try {
          router.replace('/login');
        } catch (e) {
          console.log('Navigation not ready yet');
        }
      }, 100);
      return () => clearTimeout(navTimer);
    }
  }, [isReady, isAuthenticated]);
  
  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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
