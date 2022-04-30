/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Matter from 'matter-js';

import {View} from 'react-native';
import {decomp} from 'poly-decomp';
import {SvgCss} from 'react-native-svg';

const Obstacle = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  const ice1Xml = `
  <svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156.83 80.36" style="enable-background:new 0 0 156.83 80.36;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:#CFE6F7;}
      .st1{fill:#E9F5F7;}
      .st2{fill:#F7FCFE;}
    </style>
    <polygon class="st0" points="127.62,50.14 117.8,45.64 107.97,50.14 97.48,47.89 97.48,37.93 87.66,15.43 87.66,32.79 84.38,50.14 
      73.24,54.64 64.72,42.43 58.83,23.14 52.93,0 49.65,24.43 49.65,47.57 43.1,54.64 34.58,38.57 29.34,27.32 22.14,54.64 3.79,62.36 
      0,67.96 3.99,80.36 31.95,80.36 62.1,80.36 78.48,80.36 106.66,80.36 116.57,80.36 127.06,80.36 144.26,80.36 154.18,80.36 
      156.83,67.67 149.9,56.57 137.45,55.93 "/>
    <polygon class="st1" points="117.48,52.25 108.52,48.15 99.56,52.25 90.01,50.2 90.01,41.13 87.81,20.68 81.05,36.45 78.06,52.25 
      67.91,56.34 60.14,45.23 54.77,27.68 52.13,6.62 46.41,28.85 46.41,49.91 40.44,56.34 32.67,41.72 29.39,27.32 22.17,54.64 
      3.8,62.36 0,67.96 4,80.36 30.27,79.74 57.76,79.74 72.69,79.74 98.37,79.74 107.41,79.74 116.96,79.74 132.64,79.74 141.69,79.74 
      144.1,68.19 137.79,58.1 126.44,57.51 "/>
    <polygon class="st2" points="107.07,56.71 99.31,53.34 91.55,56.71 83.27,55.02 83.27,47.56 81.37,30.72 75.51,43.71 72.93,56.71 
      64.13,60.08 57.41,50.93 52.75,36.49 50.47,19.15 45.51,37.45 45.51,54.78 40.34,60.08 33.61,48.04 30.77,36.19 24.52,58.68 
      8.6,65.03 5.32,69.64 8.78,79.85 31.53,79.34 55.34,79.34 68.27,79.34 90.52,79.34 98.34,79.34 106.62,79.34 120.2,79.34 
      128.04,79.34 130.12,69.83 124.66,61.52 114.83,61.04 "/>
  </svg>
  `;

  const ice2Xml = `
  <svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.41 57.48" style="enable-background:new 0 0 55.41 57.48;" xml:space="preserve">
    <style type="text/css">
	    .st0{fill:#C8E8F7;}
	    .st1{fill:#E8F3F9;}
	    .st2{fill:#F7FCFE;}
    </style>
    <polygon class="st0" points="50.71,42.98 44.85,37.61 38.62,37.61 35.26,37.61 35.26,30.22 35.26,26.86 31.9,22.5 31.9,13.77 
	    29.21,9.07 26.86,0 24.85,11.42 24.85,21.49 26.53,29.55 27.54,34.56 24.85,40.3 17.13,41.64 17.13,36.6 12.42,30.22 8.39,37.27 
	    4.03,46.68 0,48.69 3.36,56.41 8.06,56.41 47.35,56.41 50.71,51.71 55.41,52.38 55.41,47.68 "/>
    <polygon class="st1" points="46.92,46.21 41.51,41.7 35.74,41.7 32.63,41.7 32.63,35.5 32.63,32.68 29.52,29.02 29.52,21.69 
	    27.04,17.74 24.86,10.13 23,19.72 23,28.17 24.55,34.94 25.48,39.14 23,43.95 15.85,45.08 15.85,40.85 11.5,35.5 7.77,41.42 
	    3.73,49.31 0,51 3.11,57.48 7.46,57.48 43.82,57.48 46.92,53.54 51.27,54.1 51.27,50.15 "/>
    <polygon class="st2" points="40.71,48.55 36.42,44.97 31.85,44.97 29.39,44.97 29.39,40.06 29.39,37.83 26.92,34.92 26.92,29.12 
	    24.95,25.99 23.23,19.96 21.75,27.55 21.75,34.25 22.98,39.61 23.72,42.94 21.75,46.76 16.09,47.65 16.09,44.3 12.64,40.06 
	    9.68,44.75 6.48,51 3.53,52.34 5.99,57.48 9.44,57.48 38.25,57.48 40.71,54.35 44.16,54.8 44.16,51.67 "/>
  </svg>
  `;

  const ice3Xml = `
  <svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72.43 49.25" style="enable-background:new 0 0 72.43 49.25;" xml:space="preserve">
    <style type="text/css">
	    .st0{fill:#C8E8F7;}
	    .st1{fill:#E8F3F9;}
	    .st2{fill:#F7FCFE;}
    </style>
  <polygon class="st0" points="65.81,37.25 64.15,25.66 57.94,25.66 55.87,16.14 49.25,6.21 49.25,15.31 51.73,24 46.03,30.21 
	  44.29,34.77 39.32,34.77 36.42,28.56 28.56,28.56 28.56,21.73 21.52,18.21 21.52,10.35 13.94,0 13.94,25.25 9.11,28.14 4.14,28.14 
    0,37.25 5.79,41.39 0,49.25 72.43,49.25 72.43,41.8 "/>
  <polygon class="st1" points="65.9,40.36 64.27,31.77 58.15,31.77 56.11,24.71 49.58,17.35 49.58,24.1 52.02,30.54 46.4,35.14 
	  44.68,38.52 39.78,38.52 36.93,33.91 29.17,33.91 29.17,28.85 22.24,26.25 22.24,20.42 14.76,12.75 14.76,31.46 9.99,33.61 
	  5.1,33.61 1.02,40.36 6.73,43.42 1.02,49.25 72.43,49.25 72.43,43.73 "/>
  <polygon class="st2" points="62.76,42.15 61.29,35.29 55.77,35.29 53.93,29.65 48.04,23.77 48.04,29.16 50.25,34.31 45.17,37.98 
	  43.62,40.68 39.21,40.68 36.63,37 29.64,37 29.64,32.96 23.39,30.88 23.39,26.22 16.65,20.09 16.65,35.04 12.35,36.76 7.93,36.76 
	  4.26,42.15 9.41,44.6 4.26,49.25 68.64,49.25 68.64,44.84 "/>
  </svg>
  `;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: 120,
        height: 120,
      }}>
      <SvgCss
        xml={ice2Xml}
        width={120}
        height={120}
        style={{backgroundColor: 'blue'}}
      />
    </View>
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label, isStatic: true},
  );

  // Matter.Common.setDecomp(decomp);
  // Matter.SVG.pathToVertices();
  // Matter.Bodies.fromVertices();
  // const initialObstacle = Matter.Vertices.fromPath();

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
