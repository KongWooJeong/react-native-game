import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View, StatusBar, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import RNSoundLevel from 'react-native-sound-level';
import entities from './entities';
import Physics from './physics';

const App = () => {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const gameEngine = useRef();
  const [decibel, setDecibel] = useState(-160);

  useEffect(() => {
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = data => {
      setDecibel(data.value);
    };
    setRunning(true);

    return () => {
      RNSoundLevel.stop();
      setRunning(false);
    };
  }, []);

  useEffect(() => {
    if (gameEngine.current) {
      gameEngine.current.dispatch({
        type: 'decibel',
        payload: {volume: decibel},
      });
    }
  }, [decibel]);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const handleGameEvent = event => {
    switch (event.type) {
      case 'gameOver':
        setRunning(false);
        gameEngine.current.stop();
        break;
      case 'newPoint':
        setScore(prev => prev + 1);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.score}>{score}</Text>

        <GameEngine
          ref={gameEngine}
          systems={[Physics]}
          entities={entities}
          running={running}
          onEvent={handleGameEvent}
          style={styles.gameEngine}>
          <StatusBar style="auto" hidden={false} />
        </GameEngine>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  score: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 0,
    padding: 0,
    zIndex: 1,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'skyblue',
  },
});

export default App;
