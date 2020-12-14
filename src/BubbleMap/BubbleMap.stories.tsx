import React, { useState } from 'react';
import BubbleMap from './BubbleMap';

export default {
  title: 'Bubble Map',
  component: BubbleMap,
};

let dummyData = [
  {
    regionCode: 11,
    component: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          border: '1px solid rgb(180,0,180)',
          backgroundColor: 'rgba(180,0,180,0.5)',
        }}
      />
    ),
  },
  { lon: 126.978415, lat: 37.5666807 },
  { lon: 127.9784147, lat: 37.5666808 },
  { lon: 127.3784145, lat: 38.266681 },
  { lon: 128.3784144, lat: 36.466805 },
  { lon: 127.17389, lat: 36.62083 },
  { lon: 127.16389, lat: 35.46083 },
];

export const BubbleMap1 = () => {
  const [hovered, setHovered] = useState();
  return (
    <>
      <BubbleMap
        data={dummyData}
        onBubbleHovered={setHovered}
        isAdminLevelChanged={true}
        backgroundColor={'#fff6e3'}
        containerStyle={{ backgroundColor: '#e6f8ff' }}
        borderColor={'#dedede'}
        bubbleComponent={
          <img
            src={
              'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55f41c31-2d07-4491-a106-d1a51a4aef94/d5vjqzc-4453f23c-a8b9-4d33-a711-8c3db1259530.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTVmNDFjMzEtMmQwNy00NDkxLWExMDYtZDFhNTFhNGFlZjk0XC9kNXZqcXpjLTQ0NTNmMjNjLWE4YjktNGQzMy1hNzExLThjM2RiMTI1OTUzMC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.PqIfE5E0kaMN41U0s5BK9QhK1z1ngmMyqShbSkPSZQM'
            }
            style={{ width: '100%', height: '100%' }}
          />
        }
        bubbleStyle={{
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
            backgroundColor: 'rgb(240,240,240)',
            width: 200,
            height: 20,
          }}>
          {`${hovered?.properties?.lon}, ${hovered?.properties?.lat}`}
        </div>
      )}
    </>
  );
};

export const BubbleMap2 = () => {
  return (
    <BubbleMap
      data={dummyData}
      bubbleStyle={{
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 0,0, 0.4)',
        border: '1px solid red',
        borderRadius: 20,
      }}
    />
  );
};

BubbleMap1.storyName = 'custom Bubble';
BubbleMap2.storyName = 'default Bubble';
