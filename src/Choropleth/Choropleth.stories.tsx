import React from 'react';
import Choropleth from './Choropleth';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import ColorBar from './ColorBar';

export default {
  title: 'Choropleth 기법',
  component: Choropleth,
  decorators: [withKnobs],
};

let dummyData = [
  { regionCode: '11', grade: 1 },
  { regionCode: '26', grade: 2 },
  { regionCode: '27', grade: 3 },
  { regionCode: '28', grade: 2 },
  { regionCode: '11110', grade: 2 },
  { regionCode: '11140', grade: 1 },
  { regionCode: '11500', grade: 3 },
  { regionCode: '48740', grade: 2 },
];

let dummyColors = [
  { color: 'skyblue', scale: 1 },
  { color: 'blue', scale: 2 },
  { color: '#000066', scale: 3 },
];

export const Provinces = () => {
  const isRegionNameVisible = boolean('isRegionNameVisible', true);
  return (
    <Choropleth
      data={dummyData}
      colors={dummyColors}
      isRegionNameVisible={isRegionNameVisible}
    />
  );
};

export const Provinces2 = () => (
  <div>
    <ColorBar theme={'discrete'} align={'to right'} data={dummyColors} />
    <Choropleth
      styledOnHover={{
        fill: 'red',
        filter: 'drop-shadow( 20px 20px 20px black)',
      }}
      data={dummyData}
      colors={dummyColors}
      defaultColor={'#faf5eb'}
      isRegionNameVisible={false}
    />
  </div>
);

export const Municipalitie = () => (
  <Choropleth
    adminLevel={'municipalitie'}
    data={dummyData}
    colors={dummyColors}
  />
);

export const Submunicipalities = () => (
  <Choropleth
    adminLevel={'submunicipalities'}
    data={dummyData}
    colors={dummyColors}
  />
);

Provinces.storyName = '시/도: 지역 이름 표기';
Provinces2.storyName = '시/도: 지역 이름 미표기';
Municipalitie.storyName = '시/군/구';
Submunicipalities.storyName = '읍/면/동';
