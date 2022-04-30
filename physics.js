import Matter from 'matter-js';
import {getStoneSizePos} from './utils/random';

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const exceptionLabels = ['Floor', 'Ceil'];

const physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i < 4; i++) {
    if (entities[`ObstacleBottom${i}`].body.bounds.max.x <= 0) {
      const stone = getStoneSizePos(windowWidth * 1.05);

      Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, stone.pos);
      dispatch({type: 'new_point'});
    }

    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, {x: -3, y: 0});
  }

  Matter.Events.on(engine, 'collisionStart', event => {
    if (!exceptionLabels.includes(event.pairs[0].bodyB.label)) {
      dispatch({type: 'game_over'});
    }
  });

  return entities;
};

export default physics;
