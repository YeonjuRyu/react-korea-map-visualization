import React, { useState, useCallback } from 'react';
import PieChart from './PieChart';
import PieChartMap from './PieChartMap';

export default {
  title: 'PieChart Map',
  component: PieChart,
};

let dummyData: Array<any> = [
  {
    regionCode: 43,
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
    r: 30,
    innerRadius: 10,
  },
  {
    lon: 126.9784147,
    lat: 37.5666805,
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
  },
  {
    lon: 127.3784147,
    lat: 38.2666805,
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
  },
  {
    lon: 128.3784147,
    lat: 36.466805,
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
  },
  {
    lon: 129.16389,
    lat: 35.16083,
    r: 20,
    innerRadius: 10,
    regionName: 'b',
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
  },
  {
    lon: 127.16389,
    lat: 35.46083,
    data: [
      { label: 'a', value: 10 },
      { label: 'b', value: 10 },
      { label: 'c', value: 10 },
      { label: 'd', value: 10 },
      { label: 'e', value: 10 },
    ],
  },
];

const colors = [
  { label: 'a', color: 'red' },
  { label: 'b', color: 'yellow' },
  { label: 'c', color: 'orange' },
  { label: 'd', color: 'green' },
  { label: 'e', color: 'blue' },
  { label: 'f', color: 'purple' },
];

export const PieChartMapStory = () => {
  const [data, setData] = useState(dummyData);
  const setR = useCallback(x => {
    const newData = [...data];
    newData[x.properties.index] = {
      ...data[x.properties.index],
      r: 20,
      innerRadius: 10,
    };
    setData(newData);
  }, []);

  const onMouseOut = useCallback(() => {
    setData(dummyData);
  }, []);

  return (
    <div>
      <PieChartMap
        isDataSummaryVisible={true}
        valueType={'number'}
        data={data}
        colors={colors}
        r={15}
        innerRadius={5}
        backgroundColor={'rgb(246,246,246)'}
        borderColor={'#82a3ad'}
        containerStyle={{ backgroundColor: '#82a3ad' }}
        // onMouseOver={setR}
        // onMouseOut={onMouseOut}
      />
    </div>
  );
};

PieChartMapStory.storyName = 'donut shape';
