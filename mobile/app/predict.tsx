import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createPrediction } from '../services/api';
import { useAuthStore } from '../services/authStore';

export default function Predict() {
  const { matchId, homeTeam, awayTeam } = useLocalSearchParams();
  const { user } = useAuthStore();
  const [predictedWinner, setPredictedWinner] = useState('home');
  const [homeScore, setHomeScore] = useState('0');
  const [awayScore, setAwayScore] = useState('0');
  const [saving, setSaving] = useState(false);
  
  const handlePredict = async () => {
    if (!user?.id || !matchId) {
      alert('Error: User or match not found');
      return;
    }
    
    setSaving(true);
    try {
      await createPrediction({
        userId: user.id,
        matchId,
        predictedWinner,
        predictedHomeScore: parseInt(homeScore),
        predictedAwayScore: parseInt(awayScore)
      });
      alert('Prediction saved!');
    } catch (error: any) {
      console.error('Error saving prediction:', error);
      alert('Error saving prediction');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{homeTeam} vs {awayTeam}</Text>
      
      <Text style={styles.label}>Predicted Winner:</Text>
      <View style={styles.buttonGroup}>
        <Button 
          title={homeTeam as string} 
          onPress={() => setPredictedWinner('home')}
          color={predictedWinner === 'home' ? '#007AFF' : '#666'}
        />
        <Button 
          title="Draw" 
          onPress={() => setPredictedWinner('draw')}
          color={predictedWinner === 'draw' ? '#007AFF' : '#666'}
        />
        <Button 
          title={awayTeam as string} 
          onPress={() => setPredictedWinner('away')}
          color={predictedWinner === 'away' ? '#007AFF' : '#666'}
        />
      </View>
      
      <Text style={styles.label}>Score:</Text>
      <View style={styles.scoreContainer}>
        <Button title="-" onPress={() => setHomeScore(Math.max(0, parseInt(homeScore) - 1).toString())} />
        <Text style={styles.score}>{homeScore}</Text>
        <Button title="+" onPress={() => setHomeScore((parseInt(homeScore) + 1).toString())} />
        <Text style={styles.score}>vs</Text>
        <Button title="-" onPress={() => setAwayScore(Math.max(0, parseInt(awayScore) - 1).toString())} />
        <Text style={styles.score}>{awayScore}</Text>
        <Button title="+" onPress={() => setAwayScore((parseInt(awayScore) + 1).toString())} />
      </View>
      
      <Button 
        title={saving ? "Saving..." : "Save Prediction"} 
        onPress={handlePredict} 
        disabled={saving} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 20, marginBottom: 10 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  scoreContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 },
  score: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 10 },
});
