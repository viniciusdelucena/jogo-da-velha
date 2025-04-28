import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBoardProps {
  score: {
    you: number;
    cpu: number;
  };
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>YOU: {score.you}</Text>
      <Text style={styles.text}>CPU: {score.cpu}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000039', // tileHighlight
  },
});
