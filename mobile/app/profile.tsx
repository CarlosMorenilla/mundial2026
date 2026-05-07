import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useAuthStore } from '../services/authStore';

export default function Profile() {
  const { user, logout } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user?.avatarUrl && (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      )}
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 }
});
