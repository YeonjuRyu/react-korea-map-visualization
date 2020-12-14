import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { ZoomButton } from '../utils';
import { ADMIN_LEVEL, DEFAULT_MAP_OPTIONS } from '../../public/Constants';
import styled from 'styled-components';
import { getTextPosition, KoreaMapPropType } from '../KoreaMap/KoreaMap';
import getProjection from '../utils/utils';

interface ChoroplethMapPropType extends KoreaMapPropType {
  data: Array<ChoroplethMapDataType>;
  colors: Array<ColorDataType>;
  defaultColor?: string;
  borderColor?: string;
  styledOnHover?: object;
}

type ChoroplethMapDataType = {
  regionCode: string;
  level?: number;
  value?: number;
};

type ColorDataType = {
  color: string;
  level?: number;
  range?: { start: number; end: number };
};

const RegionStyle = styled.path`
  fill: ${props => (props.fill ? props.fill : props.defaultColor)};
  stroke: ${props => props.stroke};
  stroke-width: ${props => props.strokeWidth};
  &:hover {
    ${props => props.styledOnHover};
  }
`;

const ChoroplethMap = ({
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
}: ChoroplethMapPropType) => {
  const [geoData, setGeoData] = useState<any>();
  const [adminLv, setAdminLv] = useState(adminLevel);
  const [scale, setScale] = useState(1);
  const [_data, setData] = useState<object>(data);
  // const [_colors, setColors] = useState(colors);

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
  }, [data]);

  const flattenData = useCallback(
    data => {
      let result = new Object();
      data.map(item => {
        if (item?.level) {
          result[item.regionCode] = item.level;
        } else if (item?.value) {
          result[item.regionCode] = item.value;
        }
      });
      setData({ ...result });
    },
    [data],
  );

  const getColor = useCallback((data, colors) => {
    if (colors[0].level) {
      for (let i = 0; i < colors.length; i++) {
        if (colors[i].level === data) {
          return colors[i].color;
        }
      }
    } else {
      for (let i = 0; i < colors.length; i++) {
        if (colors[i].range.start <= data <= colors[i].range.end) {
          return colors[i].color;
        }
      }
    }
    return defaultColor;
  }, []);

  //projection with geoMercator
  let projection = getProjection();
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
                      colors
                        ? getColor(_data[item.properties.CD], colors)
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

export default ChoroplethMap;
