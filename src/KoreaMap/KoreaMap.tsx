import React, { useEffect, useState, useCallback, Dispatch } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { ZoomButton } from '../utils';
import { ADMIN_LEVEL, DEFAULT_MAP_OPTIONS } from '../Constants';

type KoreaMapPropType = {
  backgroundColor?: string;
  borderColor?: string;
  adminLevel?: 'provinces' | 'municipalitie' | 'submunicipalities';
  isAdminLevelChanged?: boolean;
  isRegionNameVisible?: boolean;
  children?: React.ReactNode;
  zoomable?: boolean;
  onZoomScaleChange?;
  onRegionHover?;
  containerStyle?;
  mapStyle?;
};

export const getTextPosition = (center, name) => {
  let x = center[0] - 15;
  let y = center[1] + 5;
  if (name === 'Incheon') {
    x = x - 20;
  } else if (name === 'Chungcheongnam-do' || name === 'Daejeon') {
    x = x - 10;
  } else if (name === 'Chungcheongbuk-do') {
    x = x - 7;
    y = y - 10;
  } else if (name === 'Gyeonggi-do') {
    y = y + 15;
  } else if (name === 'Busan') {
    x = x + 10;
  }
  let position: string = `translate(${x},${y})`;
  // setPosition(position);
  return position;
};

const KoreaMap = ({
  backgroundColor = '',
  borderColor = 'white',
  adminLevel = 'provinces',
  containerStyle,
  mapStyle,
  isAdminLevelChanged = false,
  isRegionNameVisible = false,
  children,
  zoomable = true,
  onZoomScaleChange,
  onRegionHover,
}: KoreaMapPropType) => {
  const [geoData, setGeoData] = useState<any>();
  // const [isTextVisible, setIsTextVisible] = useState(false);
  const [position, setPosition] = useState();
  const [adminLv, setAdminLv] = useState(adminLevel);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let filename = ADMIN_LEVEL[adminLv].filename;
    let feature = ADMIN_LEVEL[adminLv].feature;
    let data = require(`../../public/${filename}`);
    setGeoData(topojson.feature(data, data.objects[`${feature}`]));
  }, [ADMIN_LEVEL, adminLv]);

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
    onZoomScaleChange(newScale);
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
    onZoomScaleChange(newScale);
  }, [scale]);

  const handleOnMouseOver = useCallback(data => {
    onRegionHover(data);
  }, []);

  return (
    <div style={containerStyle}>
      {zoomable && (
        <ZoomButton
          style={{ padding: 10, position: 'absolute' }}
          onClickZoomIn={onClickZoomInHandler}
          onClickZoomOut={onClickZoomOutHandler}
        />
      )}
      <svg style={mapStyle}>
        <g className={'regionGroup'}>
          {geoData &&
            geoData.features.map(item => {
              return (
                <>
                  <path
                    id={item.properties.CD}
                    key={item.properties.CD}
                    onMouseOver={x =>
                      handleOnMouseOver({ ...x, properties: item.properties })
                    }
                    d={path(item)}
                    fill={backgroundColor ? backgroundColor : '#E3F0FF'}
                    stroke={borderColor ? borderColor : 'white'}
                    strokeWidth={
                      adminLv === 'provinces'
                        ? 0.5
                        : adminLv === 'municipalitie'
                        ? 0.3
                        : 0.2
                    }
                  />
                  {/* {isRegionNameVisible && (
                    <text
                      fontSize={5}
                      transform={getTextPosition(
                        path.centroid(item),
                        item.properties.ENG_NM,
                      )}
                      color={'black'}>
                      {item.properties.KOR_NM}
                    </text>
                  )} */}
                </>
              );
            })}
          {children}
        </g>
      </svg>
    </div>
  );
};

export default KoreaMap;
