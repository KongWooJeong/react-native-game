import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

const App = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  const [test, setTest] = useState(1);

  useEffect(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTest(pre => pre + 1);
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 0,
            padding: 40,
          }}>
          {currentPoints}
        </Text>
        <GameEngine
          ref={ref => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={entities(test)}
          running={running}
          onEvent={e => {
            switch (e.type) {
              case 'game_over':
                setRunning(false);
                gameEngine.stop();
                setCurrentPoints(0);
                break;
              case 'new_point':
                setCurrentPoints(currentPoints + 1);
                break;
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <StatusBar style="auto" hidden={true} />
        </GameEngine>
      </View>
    </SafeAreaView>
  );
};

export default App;
