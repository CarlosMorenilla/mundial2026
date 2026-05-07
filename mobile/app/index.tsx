import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../services/authStore';

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated]);
  
  return (
    <View>
      <Text>Welcome {user?.username}</Text>
      <Button title="Matches" onPress={() => router.push('/matches')} />
      <Button title="Leaderboard" onPress={() => router.push('/leaderboard')} />
    </View>
  );
}
