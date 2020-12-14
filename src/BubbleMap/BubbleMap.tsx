import React, { useState, useCallback } from 'react';
import KoreaMap, { KoreaMapPropType } from '../KoreaMap/KoreaMap';
import getProjection from '../utils/utils';
import styled from 'styled-components';

interface BubbleMapPropType extends KoreaMapPropType {
  data: Array<BubbleMapDataType>;
  bubbleStyle;
  bubbleComponent: React.ReactNode;
  onBubbleHovered;
}

type BubbleMapDataType = {
  lon?: number;
  lat?: number;
  regionCode?: number;
  name?: string;
  value?: number;
  component?: React.ReactNode;
};

const CenteringStyle = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
`;

const BubbleStyle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgba(255, 0, 0, 0.6);
  border: 1px solid red;
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
`;

const BubbleMap = (props: BubbleMapPropType) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [regionPosition, setRegionPosition] = useState([]);
  let projection = getProjection();

  const handleOnMouseOver = useCallback(data => {
    if (props.onBubbleHovered) {
      props.onBubbleHovered(data);
    }
  }, []);

  const getTransform = useCallback(
    (bubble, regionPosition) => {
      if (bubble.regionCode && regionPosition.length) {
        let positions = regionPosition?.find(
          item => item.regionCode == bubble.regionCode,
        );
        return `translate(${positions?.position[0]},${positions?.position[1]})`;
      } else if (bubble.lon && bubble.lat) {
        return `translate(${projection([bubble.lon, bubble.lat])})`;
      }
    },
    [regionPosition],
  );

  return (
    <KoreaMap
      {...props}
      onZoomScaleChange={setZoomScale}
      getRegionsPosition={setRegionPosition}>
      {props.data &&
        props.data.map((bubble, index) => {
          return (
            <foreignObject
              onMouseOver={x => handleOnMouseOver({ ...x, properties: bubble })}
              key={`point${index}`}
              overflow={'visible'}
              transform={getTransform(bubble, regionPosition)}
              style={{
                height: 20 / zoomScale,
                width: 20 / zoomScale,
                position: 'relative',
              }}>
              {bubble?.component ? (
                <CenteringStyle>{bubble?.component}</CenteringStyle>
              ) : props?.bubbleComponent ? (
                <CenteringStyle>{props?.bubbleComponent}</CenteringStyle>
              ) : (
                <BubbleStyle style={props?.bubbleStyle} zoomScale={zoomScale} />
              )}
            </foreignObject>
          );
        })}
    </KoreaMap>
  );
};

export default BubbleMap;
