import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import RNSoundLevel from 'react-native-sound-level';

const Decibel = () => {
  const [text, setText] = useState('대기중.....');

  const onStart = () => {
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = data => {
      console.log('Sound level info', data);
    };
  };

  const onStop = () => {
    RNSoundLevel.stop();
  };

  useEffect(() => {
    // RNSoundLevel.start();
    return () => {
      RNSoundLevel.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button onPress={onStart} title="start" />
      <Button onPress={onStop} title="end" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Decibel;
