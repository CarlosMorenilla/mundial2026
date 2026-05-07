import { View, Text, StyleSheet } from 'react-native';

export default function Predict() {
  return (
    <View style={styles.container}>
      <Text>Predict Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
