import React, { useState, useCallback } from 'react';
import KoreaMap, { KoreaMapPropType } from '../KoreaMap/KoreaMap';
import getProjection from '../utils/utils';
import styled from 'styled-components';

interface PointMapPropType extends KoreaMapPropType {
  data: Array<PointMapDataType>;
  pointStyle;
  pointComponent: React.ReactNode;
  onPointHovered;
}

type PointMapDataType = {
  lon: number;
  lat: number;
  name?: string;
  description?: string;
};

const CenteringStyle = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
`;

const PointStyle = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: blue;
`;

const PointMap = (props: PointMapPropType) => {
  const [zoomScale, setZoomScale] = useState(1);
  let projection = getProjection();

  const handleOnMouseOver = useCallback(data => {
    props.onPointHovered(data);
  }, []);

  return (
    <KoreaMap {...props} onZoomScaleChange={setZoomScale}>
      {props.data &&
        props.data.map((point, index) => (
          <foreignObject
            onMouseOver={x => handleOnMouseOver({ ...x, properties: point })}
            key={`point${index}`}
            overflow={'visible'}
            transform={`translate(${projection([point.lon, point.lat])})`}
            style={{ height: 20 / zoomScale, width: 20 / zoomScale }}>
            {props?.pointComponent ? (
              <CenteringStyle>{props?.pointComponent}</CenteringStyle>
            ) : (
              <PointStyle style={props?.pointStyle} zoomScale={zoomScale} />
            )}
          </foreignObject>
        ))}
    </KoreaMap>
  );
};

export default PointMap;
