import React, { useState } from 'react';
import PointMap from './PointMap';

export default {
  title: 'Point Map',
  component: PointMap,
};

let dummyData = [
  { lon: 126.4784149, lat: 37.5666806 },
  { lon: 126.978415, lat: 37.5666807 },
  { lon: 127.9784147, lat: 37.5666808 },
  { lon: 127.3784145, lat: 38.266681 },
  { lon: 128.3784144, lat: 36.466805 },
  { lon: 126.7389, lat: 37.16083 },
  { lon: 127.17389, lat: 36.62083 },
  { lon: 127.16389, lat: 35.46083 },
];

export const Scatter1 = () => {
  const [hovered, setHovered] = useState();
  return (
    <>
      <PointMap
        data={dummyData}
        onPointHovered={setHovered}
        isAdminLevelChanged={true}
        backgroundColor={'#fff6e3'}
        containerStyle={{ backgroundColor: '#e6f8ff' }}
        borderColor={'#dedede'}
        pointComponent={
          <img
            src={
              'https://w7.pngwing.com/pngs/986/74/png-transparent-red-flag-red-flag-red-flag-miscellaneous-angle-flag.png'
            }
            style={{ width: '100%', height: '100%' }}
          />
        }
        pointStyle={{
          borderRadius: 2,
          backgroundColor: 'red',
        }}
      />
      {hovered && (
        <div
          style={{
            position: 'fixed',
            top: hovered?.clientY,
            left: hovered?.clientX,
            backgroundColor: 'white',
            width: 200,
            height: 20,
          }}>
          {`${hovered?.properties?.lon}, ${hovered?.properties?.lat}`}
        </div>
      )}
    </>
  );
};

export const Scatter2 = () => {
  return <PointMap data={dummyData} />;
};

Scatter1.storyName = 'custom Point';
Scatter2.storyName = 'default Point';
