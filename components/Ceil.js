import React from 'react';
import Matter from 'matter-js';
import {View, StyleSheet} from 'react-native';

const Ceil = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  const color = props.color;

  return (
    <View
      style={styles.container(color, xBody, yBody, widthBody, heightBody)}
    />
  );
};

const styles = StyleSheet.create({
  container: (color, x, y, w, h) => {
    return {
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      backgroundColor: color,
    };
  },
});

export default (world, color, pos, size) => {
  const ceil = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Ceil',
    isStatic: true,
  });

  Matter.World.add(world, ceil);

  return {
    body: ceil,
    color,
    pos,
    renderer: <Ceil />,
  };
};
