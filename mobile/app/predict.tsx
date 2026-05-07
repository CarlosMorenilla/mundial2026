import { useState } from 'react';
import { View, Text, Button, Picker, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createPrediction } from '../services/api';
import { useAuthStore } from '../services/authStore';

export default function Predict() {
  const { matchId, homeTeam, awayTeam } = useLocalSearchParams();
  const { user } = useAuthStore();
  const [predictedWinner, setPredictedWinner] = useState('home');
  const [homeScore, setHomeScore] = useState('0');
  const [awayScore, setAwayScore] = useState('0');
  
  const handlePredict = async () => {
    try {
      await createPrediction({
        userId: user?.id,
        matchId,
        predictedWinner,
        predictedHomeScore: parseInt(homeScore),
        predictedAwayScore: parseInt(awayScore)
      });
      alert('Prediction saved!');
    } catch (error) {
      alert('Error saving prediction');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{homeTeam} vs {awayTeam}</Text>
      
      <Text>Predicted Winner:</Text>
      <Picker selectedValue={predictedWinner} onValueChange={setPredictedWinner}>
        <Picker.Item label={homeTeam as string} value="home" />
        <Picker.Item label={awayTeam as string} value="away" />
        <Picker.Item label="Draw" value="draw" />
      </Picker>
      
      <Text>Score:</Text>
      <View style={styles.scoreContainer}>
        <Picker selectedValue={homeScore} onValueChange={setHomeScore}>
          {[0,1,2,3,4,5].map(n => <Picker.Item key={n} label={n.toString()} value={n.toString()} />)}
        </Picker>
        <Text>-</Text>
        <Picker selectedValue={awayScore} onValueChange={setAwayScore}>
          {[0,1,2,3,4,5].map(n => <Picker.Item key={n} label={n.toString()} value={n.toString()} />)}
        </Picker>
      </View>
      
      <Button title="Save Prediction" onPress={handlePredict} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  scoreContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 }
});
