import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScoreBoard from './ScoreBoard';

type Player = '' | 'X' | 'O';

interface ScoreType {
  you: number;
  cpu: number;
}

const colors = {
  backgroundLight: '#f8f69f',
  backgroundDark: '#bab986',
  tileDefault: '#7c7b6c',
  tileSelected: '#3e3e53',
  tileHighlight: '#000039',
};

export default function Board() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [score, setScore] = useState<ScoreType>({ you: 0, cpu: 0 });

  function handlePress(index: number) {
    if (board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);
  }

  function renderTile(index: number) {
    const value = board[index];
    const tileColor = value ? colors.tileSelected : colors.tileDefault;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.tile, { backgroundColor: colors.backgroundDark }]}
        onPress={() => handlePress(index)}
      >
        <Text style={[styles.tileText, { color: tileColor }]}>{value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScoreBoard score={score} />
      <View style={styles.board}>
        {board.map((_, index) => renderTile(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#bab986', // backgroundDark
    borderRadius: 8,
    overflow: 'hidden',
  },
  tile: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#f8f69f', // backgroundLight
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
