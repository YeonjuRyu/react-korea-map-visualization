import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { ZoomButton } from '../utils';
import { ADMIN_LEVEL, DEFAULT_MAP_OPTIONS } from '../Constants';
import styled from 'styled-components';
import { getTextPosition } from '../KoreaMap/KoreaMap';

const RegionStyle = styled.path`
  fill: ${props => (props.fill ? props.fill : props.defaultColor)};
  stroke: ${props => props.stroke};
  stroke-width: ${props => props.strokeWidth};
  &:hover {
    ${props => props.styledOnHover};
  }
`;

const Choropleth = ({
  defaultColor = '#f2f8ff',
  borderColor = '#ffffff',
  containerStyle = { width: 500, height: 500 },
  data,
  colors,
  adminLevel = 'provinces',
  isAdminLevelChanged = true,
  isRegionNameVisible = false,
  zoomable = true,
  styledOnHover = {},
  onRegionHover = ({}): any => {},
}) => {
  const [geoData, setGeoData] = useState<any>();
  const [adminLv, setAdminLv] = useState(adminLevel);
  const [scale, setScale] = useState(1);
  const [_data, setData] = useState(data);
  const [_colors, setColors] = useState(colors);

  useEffect(() => {
    let filename = ADMIN_LEVEL[adminLv].filename;
    let feature = ADMIN_LEVEL[adminLv].feature;
    let data = require(`../../public/${filename}`);
    if (data) {
      setGeoData(topojson.feature(data, data.objects[`${feature}`]));
    }
  }, [ADMIN_LEVEL, adminLv]);

  useEffect(() => {
    flattenData(data);
    flattenColors(colors);
  }, [data, colors]);

  const flattenData = useCallback(data => {
    let result = new Object();
    data.map(item => (result[item.regionCode] = item.grade));
    setData({ ...result });
  }, []);

  const flattenColors = useCallback(colors => {
    let result = new Object();
    colors.map(item => (result[item.scale] = item.color));
    setColors({ ...result });
  }, []);

  //projection with geoMercator
  let projection = d3
    .geoMercator()
    .center([DEFAULT_MAP_OPTIONS.CENTER[0], DEFAULT_MAP_OPTIONS.CENTER[1]])
    .scale(DEFAULT_MAP_OPTIONS.SCALE)
    .translate([
      DEFAULT_MAP_OPTIONS.TRANSLATE[0],
      DEFAULT_MAP_OPTIONS.TRANSLATE[1],
    ]);
  // 패스 작성
  var path = d3.geoPath().projection(projection);
  let svg: any = d3.select('.regionGroup');
  //zoom in/out 기능 추가
  let zoom = d3
    .zoom()
    .scaleExtent([1, 10])
    .on('zoom', () => {
      svg.attr('transform', d3.zoomTransform(svg.node()));
    });

  if (zoomable) {
    svg.call(zoom);
  }

  const onClickZoomInHandler = useCallback(() => {
    let newScale = scale + 0.5;
    if (isAdminLevelChanged) {
      if (newScale >= 3) {
        setAdminLv('submunicipalities');
      } else if (newScale >= 2) {
        setAdminLv('municipalitie');
      }
    }
    zoom.scaleTo(svg.transition().duration(350), newScale);
    setScale(newScale);
  }, [isAdminLevelChanged, scale]);

  const onClickZoomOutHandler = useCallback(() => {
    if (scale <= 1) {
      return;
    }
    let newScale = scale - 0.5;
    if (isAdminLevelChanged) {
      if (newScale < 2) {
        setAdminLv('provinces');
      } else if (newScale < 3) {
        setAdminLv('municipalitie');
      }
    }
    zoom.scaleTo(svg.transition().duration(350), newScale);
    setScale(newScale);
  }, [isAdminLevelChanged, scale]);

  return (
    <div
      style={{
        backgroundColor: 'lightGrey',
        paddingRight: 0,
      }}>
      {zoomable && (
        <ZoomButton
          style={{ padding: 10, position: 'absolute' }}
          onClickZoomIn={onClickZoomInHandler}
          onClickZoomOut={onClickZoomOutHandler}
        />
      )}
      <svg style={containerStyle}>
        <g className={'regionGroup'}>
          {geoData &&
            geoData.features.map(item => {
              return (
                <svg filter={'drop-shadow(20px 20px 20px black)'}>
                  <RegionStyle
                    styledOnHover={styledOnHover}
                    id={item.properties.CD}
                    key={item.properties.CD}
                    onMouseOver={x =>
                      onRegionHover({ ...x, properties: item.properties })
                    }
                    d={path(item)}
                    fill={
                      _colors[_data[item.properties.CD]]
                        ? _colors[_data[item.properties.CD]]
                        : defaultColor
                    }
                    stroke={borderColor ? borderColor : 'white'}
                    strokeWidth={
                      adminLv === 'provinces'
                        ? 0.5
                        : adminLv === 'municipalitie'
                        ? 0.3
                        : 0.2
                    }
                  />
                  {isRegionNameVisible && (
                    <text
                      fontSize={5}
                      transform={getTextPosition(
                        path.centroid(item),
                        item.properties.ENG_NM,
                      )}
                      color={'black'}>
                      {item.properties.KOR_NM}
                    </text>
                  )}
                </svg>
              );
            })}
        </g>
      </svg>
    </div>
  );
};

export default Choropleth;
