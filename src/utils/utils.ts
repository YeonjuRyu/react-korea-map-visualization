import * as d3 from 'd3';
import { DEFAULT_MAP_OPTIONS } from '../../public/Constants';

const getProjection = () => {
  let projection = d3
    .geoMercator()
    .center([DEFAULT_MAP_OPTIONS.CENTER[0], DEFAULT_MAP_OPTIONS.CENTER[1]])
    .scale(DEFAULT_MAP_OPTIONS.SCALE)
    .translate([
      DEFAULT_MAP_OPTIONS.TRANSLATE[0],
      DEFAULT_MAP_OPTIONS.TRANSLATE[1],
    ]);
  return projection;
};

export default getProjection;
