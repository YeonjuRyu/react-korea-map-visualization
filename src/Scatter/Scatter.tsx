import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import KoreaMap from '../KoreaMap/KoreaMap';
import { DEFAULT_MAP_OPTIONS } from '../Constants';

const Scatter = ({ data, scale = 'provinces' }) => {
  const [zoomScale, setZoomScale] = useState(1);
  let projection = d3
    .geoMercator()
    .center([DEFAULT_MAP_OPTIONS.CENTER[0], DEFAULT_MAP_OPTIONS.CENTER[1]])
    .scale(DEFAULT_MAP_OPTIONS.SCALE)
    .translate([
      DEFAULT_MAP_OPTIONS.TRANSLATE[0],
      DEFAULT_MAP_OPTIONS.TRANSLATE[1],
    ]);

  return (
    <KoreaMap onZoomScaleChange={setZoomScale}>
      {data.map((marker, index) => (
        <circle
          transform={`translate(${projection([marker.lon, marker.lat])})`}
          fill={marker.color ? marker.color : 'rgba(180,120,90,0.7)'}
          r={marker.r ? marker.r : (1 / zoomScale) * 7}
        />
      ))}
    </KoreaMap>
  );
};

export default Scatter;
