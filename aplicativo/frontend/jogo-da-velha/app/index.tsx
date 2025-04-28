import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const emptyBoard = Array(9).fill(null);

export default function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [playerTurn, setPlayerTurn] = useState<'X' | 'O'>('X');
  const [score, setScore] = useState({ you: 0, cpu: 0 });

  function checkWinner(newBoard: (string | null)[]) {
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], // linhas
      [0,3,6], [1,4,7], [2,5,8], // colunas
      [0,4,8], [2,4,6]           // diagonais
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handlePress(index: number) {
    if (board[index] || checkWinner(board)) return; // Se já tiver algo ou já acabou

    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner === 'X') setScore(prev => ({ ...prev, you: prev.you + 1 }));
      else setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));

      setTimeout(() => {
        alert(`${winner} venceu!`);
        setBoard(emptyBoard);
      }, 100);
      return;
    }

    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>YOU: {score.you}</Text>
        <Text style={styles.scoreText}>CPU: {score.cpu}</Text>
      </View>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6dd9d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1b78c',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#263238',
  },
});
