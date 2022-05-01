import {Dimensions} from 'react-native';
import Matter from 'matter-js';
import decomp from 'poly-decomp';

import Submarine from '../components/Submarine';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import Ceil from '../components/Ceil';

import svg from '../utils/xml';
import {getStoneSizePos} from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default (() => {
  Matter.Common.setDecomp(decomp);
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;

  engine.gravity.y = 0.6;

  const stoneA = getStoneSizePos();
  const stoneB = getStoneSizePos(windowWidth * 0.7);
  const stoneC = getStoneSizePos(windowWidth * 1.4);

  return {
    physics: {engine, world},
    Submarine: Submarine(
      world,
      'green',
      {x: 50, y: 300},
      {height: 60, width: 60},
    ),
    Obstacle1: Obstacle(
      world,
      'Obstacle1',
      'red',
      stoneA.pos,
      stoneA.size,
      svg,
    ),
    Obstacle2: Obstacle(
      world,
      'Obstacle2',
      'green',
      stoneB.pos,
      stoneB.size,
      svg,
    ),
    Obstacle3: Obstacle(
      world,
      'Obstacle3',
      'purple',
      stoneC.pos,
      stoneC.size,
      svg,
    ),
    Ceil: Ceil(
      world,
      'orange',
      {x: windowWidth / 2, y: 0},
      {height: 100, width: windowWidth},
    ),
    Floor: Floor(
      world,
      'brown',
      {x: windowWidth / 2, y: windowHeight},
      {height: 300, width: windowWidth},
    ),
  };
})();
