import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getMatches } from '../services/api';
import { Match } from '../types';

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchday, setMatchday] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    setLoading(true);
    getMatches(matchday)
      .then(data => {
        setMatches(data);
        set Loading(false);
      })
      .catch(err => {
        console.error('Error loading matches:', err);
        setError('Error loading matches');
        setLoading(false);
      });
  }, [matchday]);
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches - Matchday {matchday}</Text>
      <View style={styles.buttonRow}>
        <Button title="Previous" onPress={() => setMatchday(Math.max(1, matchday - 1))} />
        <Button title="Next" onPress={() => setMatchday(matchday + 1)} />
      </View>
      
      {matches.length === 0 ? (
        <Text style={styles.empty}>No matches for this matchday</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.matchItem}>
              <Text style={styles.teams}>{item.homeTeam} vs {item.awayTeam}</Text>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  matchItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  teams: { fontSize: 16, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' }
});
