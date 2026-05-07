import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getMatches } from '../services/api';
import { Match } from '../types';

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  
  useEffect(() => {
    getMatches().then(setMatches);
  }, []);
  
  return (
    <View>
      <Text>Matches</Text>
      <FlatList
        data={matches}
        renderItem={({ item }) => (
          <View>
            <Text>{item.homeTeam} vs {item.awayTeam}</Text>
            <Button title="Predict" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
}
