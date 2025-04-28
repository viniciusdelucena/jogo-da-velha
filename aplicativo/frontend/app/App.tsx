import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Board from './components/Board';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Board />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f69f',
  },
});
