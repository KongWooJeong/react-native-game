/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View, StatusBar} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

const App = () => {
  const [running, setRunning] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const gameEngine = useRef();

  useEffect(() => {
    setRunning(true);
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
            padding: 0,
            zIndex: 1,
          }}>
          {currentPoints}
        </Text>
        <GameEngine
          ref={gameEngine}
          systems={[Physics]} //
          entities={entities()}
          running={running} // 시작
          onEvent={e => {
            switch (e.type) {
              case 'game_over':
                setRunning(false);
                gameEngine.current.stop();
                setCurrentPoints(0);
                break;
              case 'new_point':
                setCurrentPoints(prev => prev + 1);
                break;
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'skyblue',
          }}>
          <StatusBar style="auto" hidden={false} />
        </GameEngine>
      </View>
    </SafeAreaView>
  );
};

export default App;
