import Matter from 'matter-js';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import Ceil from '../components/Ceil';

import {Dimensions} from 'react-native';
import {getStoneSizePos} from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default () => {
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;

  engine.gravity.y = 0.6;

  const stoneA = getStoneSizePos();
  const stoneB = getStoneSizePos(windowWidth * 0.7);
  const stoneC = getStoneSizePos(windowWidth * 1.4);

  return {
    physics: {engine, world},
    Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 70, width: 70}),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'blue',
      stoneA.pos,
      stoneA.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'blue',
      stoneB.pos,
      stoneB.size,
    ),
    ObstacleBottom3: Obstacle(
      world,
      'ObstacleBottom3',
      'blue',
      stoneC.pos,
      stoneC.size,
    ),
    Ceil: Ceil(
      world,
      'yellow',
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
};
