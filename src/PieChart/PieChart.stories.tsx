import React, { useState } from 'react';
import PieChart from './PieChart';
import PieChartMap from './PieChartMap';
import { PieChartProps } from './PieChart.types';

export default {
  title: 'PieChart기법',
  component: PieChart,
};

let dummyData: Array<any> = [
  {
    lon: 126.9784147,
    lat: 37.5666805,
    data: { a: 10, b: 6, c: 3, d: 2, e: 7, f: 4 },
  },
  {
    lon: 127.3784147,
    lat: 38.2666805,
    data: { a: 5, b: 2, c: 3, d: 10, e: 1, f: 4 },
  },
  {
    lon: 128.3784147,
    lat: 36.466805,
    data: { a: 1, b: 9, c: 6, d: 6, e: 9, f: 4 },
  },
  {
    lon: 129.16389,
    lat: 35.16083,
    data: { a: 5, b: 2, c: 2, d: 7, e: 6, f: 4 },
  },
  {
    lon: 127.16389,
    lat: 35.46083,
    data: { a: 8, b: 4, c: 8, d: 2, e: 2, f: 4 },
  },
];
const colors = {
  a: 'red',
  b: 'yellow',
  c: 'orange',
  d: 'green',
  e: '#2EA8FF',
  f: '#842EFF',
};

export const PieChartMapStory = () => {
  const [r, setR] = useState(10);
  return <PieChartMap data={dummyData} r={r} onHovered={() => setR(15)} />;
};

export const Pie = () => {
  return (
    <svg width={100} height={100} style={{ backgroundColor: 'lightGrey' }}>
      <PieChart data={dummyData[0]} r={1} width={5} height={5} />
    </svg>
  );
};

Pie.storyName = 'Pie UI';
