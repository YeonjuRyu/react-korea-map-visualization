import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';
import PieChart from './PieChart';
import KoreaMap, { KoreaMapPropType } from '../KoreaMap/KoreaMap';
import { PieChartDataType } from './PieChart';
import getProjection from '../utils/utils';

const defaultColors = [
  '#FFE9F9',
  '#FFBDED',
  '#FF98E3',
  '#FC6AD5',
  '#FF2EC7',
  '#FF00FF',
];

interface PieCharMapPropType extends KoreaMapPropType {
  data: Array<PieChartMapDataType>;
  colors: Array<PieChartColorType>;
  pieChartStyle?: object;
  r?: number;
  innerRadius?: number;
  onMouseOver?;
  onMouseOut?;
  isDataSummaryVisible?: boolean;
  valueType: 'number' | 'percentage';
}

type PieChartMapDataType = {
  lon?: number;
  lat?: number;
  regionCode?: number;
  regionName?: number;
  r?: number;
  data: Array<PieChartDataType>;
  innerRadius?: number;
};

type PieChartColorType = {
  label: string;
  color: string;
};

const PieChartMap = (props: PieCharMapPropType) => {
  const { isDataSummaryVisible = false, valueType = 'number' } = props;
  const [regionPosition, setRegionPosition] = useState([]);

  const [zoomScale, setZoomScale] = useState(1);
  const [hoverBoxPosition, setHoverBoxPosition] = useState<{
    x: number;
    y: number;
  }>();
  const [hoveredData, setHoveredData] = useState<any>();
  let projection = getProjection();

  const handleOnMouseOver = useCallback(x => {
    setHoverBoxPosition({ x: x.clientX, y: x.clientY });
    setHoveredData(x?.properties?.item);
    props.onMouseOver(x);
  }, []);

  const handleOnMouseOut = useCallback(() => {
    setHoveredData(null);
    props.onMouseOut();
  }, []);

  const getSumAllValues = useCallback(data => {
    let sum = 0;
    data?.map(item => {
      sum = sum + item.value;
    });
    return sum;
  }, []);

  const getColor = useCallback((colors, label) => {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i]?.label == label) {
        return colors[i].color;
      }
    }
  }, []);

  const getTransform = useCallback(
    (pie, regionPosition) => {
      if (pie.regionCode && regionPosition.length) {
        let positions = regionPosition?.find(
          item => pie.regionCode == item.regionCode,
        );
        return `translate(${positions?.position[0]},${positions?.position[1]})`;
      } else if (pie.lon && pie.lat) {
        return `translate(${projection([pie.lon, pie.lat])})`;
      }
    },
    [regionPosition],
  );

  return (
    <KoreaMap
      zoomable={true}
      onZoomScaleChange={setZoomScale}
      getRegionsPosition={setRegionPosition}>
      {isDataSummaryVisible && (
        <foreignObject x={'80%'} y={0} overflow={'visible'}>
          <div
            style={{
              height: 130,
              width: 100,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}>
            <ul style={{ listStyle: 'none', padding: 10, margin: 0 }}>
              {props.colors.map((item, index) => (
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
                        ? item.color
                        : defaultColors[index],
                    }}
                  />
                  <div> {`: ${item.label}`} </div>
                </li>
              ))}
            </ul>
          </div>
        </foreignObject>
      )}
      {props.data.map((item, index) => {
        return (
          <PieChart
            key={`pieChartMap${index}`}
            innerRadius={
              item?.innerRadius >= 0
                ? item?.innerRadius / zoomScale
                : props.innerRadius / zoomScale
            }
            colors={props.colors}
            r={item.r ? item.r / zoomScale : props.r / zoomScale}
            data={item.data}
            transform={getTransform(item, regionPosition)}
            onMouseOver={x =>
              handleOnMouseOver({
                ...x,
                properties: { index: index, item: item },
              })
            }
            onMouseOut={handleOnMouseOut}
          />
        );
      })}
      {isDataSummaryVisible && hoveredData && (
        <foreignObject
          x={hoverBoxPosition?.x}
          y={hoverBoxPosition?.y}
          width={0}
          height={0}
          overflow={'visible'}>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255, 0.7)',
              display: 'flex',
              width: 200,
              flexDirection: 'column',
            }}>
            <ul style={{ listStyle: 'none', padding: 10, margin: '0px 10px' }}>
              {hoveredData &&
                hoveredData?.data?.map((item, index) => (
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
                          ? getColor(props.colors, item.label)
                          : defaultColors[index],
                      }}
                    />
                    <div>
                      <text>
                        {`${item.label}: ${item.value} `}
                        {valueType === 'number'
                          ? `(${(
                              (item.value /
                                getSumAllValues(hoveredData?.data)) *
                              100
                            ).toFixed(1)}%)`
                          : `%`}
                      </text>
                    </div>
                  </li>
                ))}
              <li
                style={{
                  padding: '5px 0px 0px 0px',
                }}>
                {`Total: ${getSumAllValues(hoveredData?.data)} `}
                {valueType === 'number' ? '(100%)' : '%'}
              </li>
            </ul>
          </div>
        </foreignObject>
      )}
    </KoreaMap>
  );
};

export default PieChartMap;
