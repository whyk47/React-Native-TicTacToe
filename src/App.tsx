import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { X, O, EMPTY, DRAW, lines, XColor, OColor, DrawColor, SelectedColor, UnselectedColor } from './constants'
import Icons from './Icons'
import Minimax from './Minimax'
import Button from './Button'

export default function App() {
  const [cells, setCells] = React.useState(Array(9).fill(EMPTY))
  const [player, setPlayer] = React.useState(X)
  const [winner, setWinner] = React.useState(EMPTY)
  const [singlePlayer, setSinglePlayer] = React.useState(true)
  const [playAsX, setPlayAsX] = React.useState(true)
  const [isHard, setIsHard] = React.useState(false)

  useEffect(() => {
    check_winner()
  }, [cells])

  useEffect(() => {
    reset()
  }, [singlePlayer, playAsX, isHard])

  const reset = () => {
    let c = Array(9).fill(EMPTY)
    if (!playAsX && singlePlayer) {
      const move = Minimax(c, isHard)
      c[move] = X
      setPlayer(O)
    } else {
      setPlayer(X)
    }
    setCells(c)
    setWinner(EMPTY)
  }

  const setPlayingAsX = (isPlayAsX: boolean) => {
    setPlayAsX(isPlayAsX)
  }

  const check_winner = () => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a])
        return
      }
    }
    if (!cells.includes(EMPTY)) {
      setWinner(DRAW)
    }
  }


  const markCell = (i: number) => {
    if (winner in [X, O, DRAW] || cells[i] !== EMPTY) return
    let c = [...cells]
    c[i] = player
    setCells(c)
    let opponent = player === X ? O : X
    if (winner === EMPTY && singlePlayer) {
      const move = Minimax(c, isHard)
      c[move] = opponent
      setCells(c)
    } else {
      setPlayer(opponent)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TicTacToe!</Text>
      {winner === EMPTY ?
        <View style={[styles.card, { backgroundColor: player === X ? XColor : OColor }]}>
          <Text style={styles.cardText}>Player {player}'s turn</Text>
        </View> :
        <View style={[styles.card, { backgroundColor: winner === DRAW ? DrawColor : winner === X ? XColor : OColor }]}>
          <Text style={styles.cardText}>{winner === DRAW ? 'It\'s a draw!' : `Player ${winner} wins!`}</Text>
        </View>}
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={3}
        data={cells}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.icon}
            disabled={winner !== EMPTY || item !== EMPTY}
            onPress={() => markCell(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
      />
      <View style={styles.row}>
        <Button
          onPress={() => setSinglePlayer(true)}
          color={singlePlayer ? SelectedColor : UnselectedColor}
          child={<Text style={styles.cardText}>Single Player</Text>}
          disabled={singlePlayer}
        />
        <Button
          onPress={() => setSinglePlayer(false)}
          color={!singlePlayer ? SelectedColor : UnselectedColor}
          child={<Text style={styles.cardText}>Multi Player</Text>}
          disabled={!singlePlayer}
        />

      </View>
      {
        singlePlayer &&
        <View>
          <View style={styles.row}>
            <Text style={styles.cardText}>Play As:  </Text>
            <Button
              onPress={() => setPlayingAsX(true)}
              color={playAsX ? SelectedColor : UnselectedColor}
              child={<Icons name={X} />}
              disabled={playAsX}
            />
            <Button
              onPress={() => setPlayingAsX(false)}
              color={!playAsX ? SelectedColor : UnselectedColor}
              child={<Icons name={O} />}
              disabled={!playAsX}
            />
          </View>
          <View style={styles.row}>
          <Text style={styles.cardText}>Difficulty:  </Text>
            <Button
              onPress={() => setIsHard(false)}
              color={!isHard ? SelectedColor : UnselectedColor}
              child={<Text style={styles.cardText}>Easy</Text>}
              disabled={!isHard}
            />
            <Button
              onPress={() => setIsHard(true)}
              color={isHard ? SelectedColor : UnselectedColor}
              child={<Text style={styles.cardText}>Hard</Text>}
              disabled={isHard}
            />
          </View>
        </View>

      }
      <Button
        onPress={() => reset()}
        color={'red'}
        child={<Text style={styles.cardText}>Reset</Text>}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  icon: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})