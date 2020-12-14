import React, { useState } from 'react';
import Choropleth from './ChoroplethMap';
import { ColorBar } from '../utils';

export default {
  title: 'Choropleth Map',
  component: Choropleth,
};

let dummyData = [
  { regionCode: '11', level: 1 },
  { regionCode: '26', level: 2 },
  { regionCode: '27', level: 3 },
  { regionCode: '28', level: 2 },
  { regionCode: '29', level: 1 },
  { regionCode: '30', level: 4 },
  { regionCode: '31', level: 3 },
  { regionCode: '36', level: 1 },
  { regionCode: '41', level: 2 },
  { regionCode: '42', level: 1 },
  { regionCode: '43', level: 1 },
  { regionCode: '44', level: 2 },
  { regionCode: '45', level: 1 },
  { regionCode: '46', level: 3 },
  { regionCode: '47', level: 1 },
  { regionCode: '48', level: 2 },
  { regionCode: '50', level: 1 },
  { regionCode: '11110', level: 2 },
  { regionCode: '11140', level: 1 },
  { regionCode: '11500', level: 3 },
  { regionCode: '48740', level: 2 },
];

let dummyColors = [
  { color: 'skyblue', level: 1 },
  { color: 'blue', level: 2 },
  { color: '#000066', level: 3 },
];

export const Provinces = () => {
  return (
    <Choropleth
      data={dummyData}
      colors={dummyColors}
      isRegionNameVisible={true}
    />
  );
};

export const Provinces2 = () => {
  const [hoveredRegion, setHoveredRegion] = useState();
  return (
    <div>
      <ColorBar theme={'discrete'} align={'to right'} data={dummyColors} />
      <Choropleth
        styledOnHover={{
          stroke: 'black',
          stokeWidth: 1,
        }}
        data={dummyData}
        colors={dummyColors}
        defaultColor={'#faf5eb'}
        isRegionNameVisible={false}
        onRegionHover={setHoveredRegion}
      />
      {hoveredRegion && (
        <div
          id={'ke'}
          style={{
            position: 'fixed',
            top: hoveredRegion?.clientY,
            left: hoveredRegion?.clientX,
            width: 70,
            height: 30,
            backgroundColor: 'white',
          }}>
          <text
            id={'kor_nm'}
            style={{ fontSize: 12, margin: '0px 10px 0px 0px' }}>
            {hoveredRegion?.properties.KOR_NM}
          </text>
          <text id={'cd'} style={{ fontSize: 12 }}>
            {hoveredRegion.properties.CD}
          </text>
        </div>
      )}
    </div>
  );
};

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
