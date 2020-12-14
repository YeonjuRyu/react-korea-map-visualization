import React from 'react';
import KoreaMap from '../KoreaMap/KoreaMap';
import * as d3 from 'd3';
import getProjection from '../utils/utils';

var link = [
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.3784147, 38.2666805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.4784147, 37.4666805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.2784147, 36.8666805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [129.16389, 36.466805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [129.16389, 36.466805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [127.3784147, 38.2666805],
      [129.16389, 36.466805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [129.16389, 36.466805],
      [128.3784147, 35.16083],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [128.3784147, 35.16083],
      [127.3784147, 38.2666805],
    ],
  },
  {
    type: 'LineString',
    coordinates: [
      [126.9784147, 37.5666805],
      [127.4, 37.2666805],
    ],
  },
];

const ConnectionMap = () => {
  //projection with geoMercator
  let projection = getProjection();
  // 패스 작성
  var path = d3.geoPath().projection(projection);

  return (
    <KoreaMap>
      {link.map(item => (
        <>
          <path
            stroke={'orange'}
            strokeWidth={0.5}
            d={path(item?.coordinates)}
          />
          <circle
            fill={'red'}
            r={5}
            transform={`translate(${projection(item?.coordinates[0])})`}
          />
          <circle
            fill={'red'}
            r={3}
            transform={`translate(${projection(item?.coordinates[1])})`}
          />
        </>
      ))}
    </KoreaMap>
  );
};

export default ConnectionMap;
