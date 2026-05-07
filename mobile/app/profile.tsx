import { View, Text, Button, Image } from 'react-native';
import { useAuthStore } from '../services/authStore';
import { getProfile } from '../services/api';

export default function Profile() {
  const { user, logout } = useAuthStore();
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
      {user?.avatarUrl && (
        <Image source={{ uri: user.avatarUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      )}
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
