import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const getStoneSizePos = (addToPosX = 0) => {
  const yPosTop = -Math.floor(Math.random() * 500 + 200);

  const stone = {
    pos: {
      x: windowWidth + addToPosX,
      y: windowHeight + yPosTop,
    },
    size: {
      width: 120,
      height: 120,
    },
  };

  return stone;
};
