import React from 'react';
import KoreaMap from '../KoreaMap/KoreaMap';
import * as d3 from 'd3';
import getProjection from '../utils/utils';

var link = [
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.3784147, 38.2666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.4784147, 37.4666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.2784147, 36.8666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [129.16389, 36.466805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [129.36389, 36.766805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.1596389, 38.2466805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [129.36389, 36.766805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [127.3784147, 38.2666805],
      [129.16389, 36.466805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [129.16389, 36.466805],
      [128.3784147, 35.16083]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [128.3784147, 35.16083],
      [127.3784147, 38.2666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [127.3784147, 38.2666805],
      [126.9784147, 37.5666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.4, 37.2666805]
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [127.4, 37.2666805],
      [126.2714147, 37.2666805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.2714147, 37.2666805],
      [127.8784147, 37.402139],
    ],
  },
{
  type: 'LineString',
  coordinates: [
    [127.8784147, 37.402139],
    [127.3784147, 37.422139],
  ],
},
{
  type: 'LineString',
  coordinates: [
    [126.9784147, 37.5666805],
    [127.3784147, 37.422139],
  ],
},
];

const ConnectionMap = () => {
  //projection with geoMercator
  let projection = getProjection();
  // 패스 작성
  var path = d3.geoPath().projection(projection);

  return (
    <KoreaMap backgroundColor={'#d2d5d9'} adminLevel={'municipalitie'}>
      {link.map((item, index) => (
        <>
        
          <path
            stroke={'red'}
            strokeWidth={index % 3 + 2}
            d={path(item)}
          />
          <circle
            fill={'orange'}
            r={2}
            transform={`translate(${projection(item?.coordinates[0])})`}
          />
          <circle
            fill={'orange'}
            r={2}
            transform={`translate(${projection(item?.coordinates[1])})`}
          />
        </>
      ))}
    </KoreaMap>
  );
};

export default ConnectionMap;
