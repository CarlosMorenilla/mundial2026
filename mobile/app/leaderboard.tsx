import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getLeaderboard } from '../services/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  
  useEffect(() => {
    getLeaderboard().then(setLeaderboard);
  }, []);
  
  return (
    <View>
      <Text>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        renderItem={({ item, index }) => (
          <Text>{index + 1}. {item.username} - {item.totalPoints} pts</Text>
        )}
      />
    </View>
  );
}
