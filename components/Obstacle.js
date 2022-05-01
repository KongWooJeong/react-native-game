/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Matter from 'matter-js';
import {StyleSheet} from 'react-native';
import {SvgCss} from 'react-native-svg';

const Obstacle = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  const color = props.color;

  return (
    <SvgCss
      xml={props.svg}
      width={props.size.width}
      height={props.size.height}
      style={styles.container(xBody, yBody)}
      fill={color}
    />
  );
};

const styles = StyleSheet.create({
  container: (x, y) => {
    return {
      position: 'absolute',
      left: x,
      top: y,
    };
  },
});

export default (world, label, color, pos, size, svg) => {
  const path =
    '127.62,50.14 117.8,45.64 107.97,50.14 97.48,47.89 97.48,37.93 87.66,15.43 87.66,32.79 84.38,50.14 73.24,54.64 64.72,42.43 58.83,23.14 52.93,0 49.65,24.43 49.65,47.57 43.1,54.64 34.58,38.57 29.34,27.32 22.14,54.64 3.79,62.36 0,67.96 3.99,80.36 31.95,80.36 62.1,80.36 78.48,80.36 106.66,80.36 116.57,80.36 127.06,80.36 144.26,80.36 154.18,80.36 156.83,67.67 149.9,56.57 137.45,55.93';
  const vertices = Matter.Vertices.fromPath(path);
  const obstacle = Matter.Bodies.fromVertices(pos.x, pos.y, vertices, {
    label,
    isStatic: true,
  });

  Matter.World.add(world, obstacle);

  return {
    body: obstacle,
    color,
    pos,
    svg,
    size,
    renderer: <Obstacle />,
  };
};
