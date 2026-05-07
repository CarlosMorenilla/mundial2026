import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getMatches } from '../services/api';
import { Match } from '../types';

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchday, setMatchday] = useState(1);
  const router = useRouter();
  
  useEffect(() => {
    getMatches(matchday).then(setMatches);
  }, [matchday]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches - Matchday {matchday}</Text>
      <Button title="Previous" onPress={() => setMatchday(Math.max(1, matchday - 1))} />
      <Button title="Next" onPress={() => setMatchday(matchday + 1)} />
      
      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text>{item.homeTeam} vs {item.awayTeam}</Text>
            <Text>Status: {item.status}</Text>
            {item.status === 'pending' && (
              <Button 
                title="Predict" 
                onPress={() => router.push({
                  pathname: '/predict',
                  params: { matchId: item.id, homeTeam: item.homeTeam, awayTeam: item.awayTeam }
                })} 
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  matchItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }
});
