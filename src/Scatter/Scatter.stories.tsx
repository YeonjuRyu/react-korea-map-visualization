import React from 'react';
import Scatter from './Scatter';
import { ScatterType } from './Scatter.types';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Scatter(Point) 기법',
  component: Scatter,
  decorators: [withKnobs],
};

let dummyData: Array<ScatterType> = [
  { lon: 126.9784147, lat: 37.5666805, r: 10, color: 'green' },
  { lon: 127.3784147, lat: 38.2666805, r: 5, color: 'red' },
  { lon: 128.3784147, lat: 36.466805, r: 20, color: 'skyblue' },
  { lon: 129.16389, lat: 35.16083, color: 'orange' },
  { lon: 127.16389, lat: 35.46083 },
];

let dummyData1: Array<ScatterType> = [
  { lon: 126.9784147, lat: 37.5666805 },
  { lon: 127.3784147, lat: 38.2666805 },
  { lon: 128.3784147, lat: 36.466805 },
  { lon: 129.16389, lat: 35.16083 },
  { lon: 126.5389, lat: 37.16083 },
  { lon: 127.17389, lat: 36.62083 },
  { lon: 127.16389, lat: 35.46083 },
];

export const Scatter1 = () => {
  return <Scatter data={dummyData} scale={'provinces'} />;
};

export const Scatter2 = () => {
  return <Scatter data={dummyData1} scale={'municipalitie'} />;
};

Scatter1.storyName = 'Scatter 기법(스타일 수정)';
Scatter2.storyName = 'Scatter 기법';
