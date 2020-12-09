import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';
import PieChart from '../PieChart/PieChart';
import KoreaMap from '../KoreaMap/KoreaMap';
import { DEFAULT_MAP_OPTIONS } from '../Constants';

const defaultColors = [
  '#FFE9F9',
  '#FFBDED',
  '#FF98E3',
  '#FC6AD5',
  '#FF2EC7',
  '#FF00FF',
];

const PieChartMap = ({ data, scale = 'provinces', ...props }) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [isHoverBoxVisible, setHoverBoxVisibility] = useState(false);
  const [hoverBoxPosition, setHoverBoxPosition] = useState<{
    x: number;
    y: number;
  }>();
  const [hoveredData, setHoveredData] = useState({});
  let projection = d3
    .geoMercator()
    .center([DEFAULT_MAP_OPTIONS.CENTER[0], DEFAULT_MAP_OPTIONS.CENTER[1]])
    .scale(DEFAULT_MAP_OPTIONS.SCALE)
    .translate([
      DEFAULT_MAP_OPTIONS.TRANSLATE[0],
      DEFAULT_MAP_OPTIONS.TRANSLATE[1],
    ]);

  const handleOnMouseOver = useCallback(
    ({ onMouseOver, clientX, clientY, data }) => {
      onMouseOver();
      setHoverBoxVisibility(true);
      setHoverBoxPosition({ x: clientX, y: clientY - 10 });
      setHoveredData(data);
    },
    [],
  );

  const handleOnMouseOut = useCallback(() => {
    setHoverBoxVisibility(false);
  }, []);

  const getSumAllValues: ({}) => number = useCallback(obj => {
    return Object.values(obj).reduce((a, b) => a + b, 0);
  }, []);

  return (
    <KoreaMap zoomable={true} onZoomScaleChange={setZoomScale}>
      <foreignObject x={'80%'} y={0} overflow={'visible'}>
        <div
          style={{
            height: 130,
            width: 100,
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}>
          <ul style={{ listStyle: 'none', padding: 10, margin: 0 }}>
            {Object.keys(props.colors ? props.colors : data[0].data).map(
              (key, index) => (
                <li
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      marginRight: 10,
                      backgroundColor: props.colors
                        ? props.colors[key]
                        : defaultColors[index],
                    }}
                  />
                  <div> {`: ${key}`} </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </foreignObject>
      {data.map((marker, index) => (
        <PieChart
          // {...props}
          r={props.r / zoomScale}
          data={marker.data}
          transform={`translate(${projection([marker.lon, marker.lat])})`}
          onMouseOver={x =>
            handleOnMouseOver({
              ...x,
              onMouseOver: props.onHovered,
              data: marker.data,
            })
          }
          onMouseOut={handleOnMouseOut}
        />
      ))}
      {isHoverBoxVisible && (
        <foreignObject
          x={hoverBoxPosition?.x}
          y={hoverBoxPosition?.y}
          width={0}
          height={0}
          overflow={'visible'}>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255, 0.7)',
              height: 150,
              width: 150,
              display: 'flex',
              alignItems: 'center',
            }}>
            <ul style={{ listStyle: 'none', padding: 10, margin: '0px 10px' }}>
              {Object.keys(hoveredData).map((key, index) => (
                <li
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      marginRight: 10,
                      backgroundColor: props.colors
                        ? props.colors[key]
                        : defaultColors[index],
                    }}
                  />
                  <div>
                    {`${key}: ${hoveredData[key]} (${(
                      (hoveredData[key] / getSumAllValues(hoveredData)) *
                      100
                    ).toFixed(2)}%)`}{' '}
                  </div>
                </li>
              ))}
              <li
                style={{
                  padding: '5px 0px 0px 0px',
                }}>{`total: ${getSumAllValues(hoveredData)} (100%)`}</li>
            </ul>
          </div>
        </foreignObject>
      )}
    </KoreaMap>
  );
};

export default PieChartMap;
