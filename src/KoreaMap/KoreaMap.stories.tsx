import React, { useState, useCallback } from 'react';
import KoreaMap from './KoreaMap';

export default {
  title: 'Background KoreaMap',
  component: KoreaMap,
};

export const Provinces = () => {
  return (
    <KoreaMap
      containerStyle={{ width: 500, height: 500 }}
      key={'koreaMap1'}
      adminLevel={'provinces'}
      isRegionNameVisible={true}
    />
  );
};

export const Provinces2 = () => (
  <KoreaMap
    key={'koreaMap2'}
    adminLevel={'provinces'}
    isRegionNameVisible={false}
  />
);

export const Municipalitie = () => {
  const [hoveredRegion, setHoveredRegion] = useState();

  return (
    <div id={'id'}>
      <KoreaMap
        mapStyle={{ width: 500, height: 500 }}
        key={'koreaMap3'}
        adminLevel={'municipalitie'}
        // isRegionNameVisible={true}
        onRegionHover={setHoveredRegion}
      />
      {hoveredRegion && (
        <div
          id={'ke'}
          style={{
            position: 'fixed',
            top: hoveredRegion?.clientY,
            left: hoveredRegion?.clientX,
            width: 50,
            height: 50,
            backgroundColor: 'white',
          }}>
          <p id={'kor_nm'}>{hoveredRegion?.properties.KOR_NM}</p>
          <p id={'cd'}>{hoveredRegion.properties.CD}</p>
        </div>
      )}
    </div>
  );
};

export const Submunicipalities = () => {
  const [hoveredRegion, setHoveredRegion] = useState();

  return (
    <div>
      <KoreaMap
        key={'koreaMa4'}
        adminLevel={'submunicipalities'}
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

Provinces.storyName = '시/도: 지역 이름 표기';
Provinces2.storyName = '시/도: 지역 이름 미표기';
Municipalitie.storyName = '시/군/구';
Submunicipalities.storyName = '읍/면/동';
