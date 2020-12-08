import React, { useState } from 'react';
import KoreaMap from './KoreaMap';
import { ChoroplethData, ChoroplethColor } from './KoreaMap.types';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: '기본 지도',
  component: KoreaMap,
  decorators: [withKnobs],
};

let dummyData: ChoroplethData = [
  { name: 'Ulsan', grade: 1 },
  { name: 'Seoul', grade: 4 },
  { name: 'Gwangju', grade: 3 },
  { name: 'Incheon', grade: 2 },
  { name: 'Jeollabuk-do', grade: 1 },
  { name: 'Jeollanam-do', grade: 4 },
  { name: 'Gangwon-do', grade: 2 },
  { name: 'Daegu', grade: 1 },
  { name: 'Chungcheongbuk-do', grade: 3 },
  { name: 'Chungcheongnam-do', grade: 2 },
  { name: 'Busan', grade: 3 },
  { name: 'Sejong', grade: 4 },
  { name: 'Gyeongsangbuk-do', grade: 4 },
  { name: 'Gyeongsangnam-do', grade: 2 },
  { name: 'Jeju', grade: 2 },
  { name: 'Gyeonggi-do', grade: 3 },
  { name: 'Daejeon', grade: 1 },
];

let dummyColors = {
  4: 'red',
  3: 'orange',
  2: 'yellow',
  1: 'beige',
  0: 'white',
};

export const Provinces = () => {
  const isRegionNameVisible = boolean('isRegionNameVisible', true);
  return (
    <KoreaMap
      key={'koreaMap1'}
      data={dummyData}
      colors={dummyColors}
      adminLevel={'provinces'}
      isRegionNameVisible={isRegionNameVisible}
    />
  );
};

export const Provinces2 = () => (
  <KoreaMap
    key={'koreaMap2'}
    data={dummyData}
    colors={dummyColors}
    adminLevel={'provinces'}
    isRegionNameVisible={false}
  />
);

export const Municipalitie = () => {
  const [hoveredRegion, setHoveredRegion] = useState();

  return (
    <div id={'id'}>
      <KoreaMap
        key={'koreaMap3'}
        adminLevel={'municipalitie'}
        data={dummyData}
        colors={dummyColors}
        // isRegionNameVisible={true}
        onRegionHover={setHoveredRegion}
      />
      {hoveredRegion && (
        <div
          id={'ke'}
          style={{
            position: 'fixed',
            top: hoveredRegion.clientY,
            left: hoveredRegion.clientX,
            width: 50,
            height: 50,
            backgroundColor: 'white',
          }}>
          <p id={'kor_nm'}>{hoveredRegion.properties.KOR_NM}</p>
          <p id={'cd'}>{hoveredRegion.properties.CD}</p>
        </div>
      )}
    </div>
  );
};

export const Submunicipalities = () => {
  const [hoveredRegion, setHoveredRegion] = useState();

return (<div><KoreaMap
    key={'koreaMa4'}
    adminLevel={'submunicipalities'}
    data={dummyData}
    colors={dummyColors}
    onRegionHover={setHoveredRegion}
  />      {hoveredRegion && (
    <div
      id={'ke'}
      style={{
        position: 'fixed',
        top: hoveredRegion.clientY,
        left: hoveredRegion.clientX,
        width: 50,
        height: 50,
        backgroundColor: 'white',
      }}>
      <p id={'kor_nm'}>{hoveredRegion.properties.KOR_NM}</p>
      <p id={'cd'}>{hoveredRegion.properties.CD}</p>
    </div>
  )}
</div>)
};

Provinces.storyName = '시/도: 지역 이름 표기';
Provinces2.storyName = '시/도: 지역 이름 미표기';
Municipalitie.storyName = '시/군/구';
Submunicipalities.storyName = '읍/면/동';
