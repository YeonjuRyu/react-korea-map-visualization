import React from 'react';
import styled from 'styled-components';

type ColorBarPropType = {
  data: Array<ColorBarDataType>;
  align?: 'to top' | 'to right';
  theme?: 'gradient' | 'discrete';
  width?: number | string;
  height?: number | string;
  gradient?: boolean;
  gridGap?: number | string;
  colorBarContainerStyle?;
  colorBarContentsStyle?;
  colorBarTextContainerStyle?;
  textStyle?;
};

type ColorBarDataType = {
  scale: number | ColorBarRangeType;
  color: string;
};

type ColorBarRangeType = {
  start: number | string;
  end: number | string;
};

const LinearContainerStyle = styled.div`
  display: flex;
  height: ${props => (props.isAlignHorizontal ? '40px' : '300px')};
  width: ${props => (props.isAlignHorizontal ? '300px' : '40px')};
  flex-direction: ${props => (props.isAlignHorizontal ? 'column' : 'row')};
`;

const LinearGradientBarStyle = styled.div`
  height: ${props => (props.isAlignHorizontal ? '20px' : '300px')};
  width: ${props => (props.isAlignHorizontal ? '300px' : '20px')};
  background: ${props => props.background};
`;

const LinearGradientTextContainerStyle = styled.div`
  display: flex;
  padding: ${props =>
    props.isAlignHorizontal ? '3px 0px 0px 0px' : '0px 0px 0px 3px'};
  flex-direction: ${props =>
    props.isAlignHorizontal ? 'row' : 'column-reverse'};
  justify-content: space-between;
`;

const DiscreteBarContainerStyle = styled.div`
  display: grid;
  height: ${props => (props.isAlignHorizontal ? '40px' : '300px')};
  width: ${props => (props.isAlignHorizontal ? '300px' : '40px')};
  grid-template-columns: ${props =>
    props.isAlignHorizontal ? `repeat(${props.colorNum}, 1fr)` : null};
  grid-template-rows: ${props =>
    props.isScaleShown
      ? props.isAlignHorizontal
        ? null
        : `repeat(${props.colorNum}, 1fr)`
      : null};
  grid-column-gap: ${props =>
    props.gridGap && props.isAlignHorizontal ? props.gridGap : '0px'};
  grid-row-gap: ${props =>
    props.gridGap && !props.isAlignHorizontal ? props.gridGap : '0px'};
`;

const DiscreteBarColorChipStyle = styled.div`
  grid-column: ${props => (props.isAlignHorizontal ? props.index : 1)};
  grid-row: ${props => (!props.isAlignHorizontal ? props.index : 1)};
  background: ${props => props.backgroundColor};
`;

const DiscreteBarTextBoxStyle = styled.div`
  grid-column: ${props => (props.isAlignHorizontal ? props.index : 2)};
  grid-row: ${props => (!props.isAlignHorizontal ? props.index : 2)};
  text-align: center;
  justify-content: center;
`;

const ColorBar = ({
  data,
  align = 'to right',
  theme = 'gradient',
  gridGap = '10px',
  colorBarContainerStyle,
  colorBarContentsStyle,
  colorBarTextContainerStyle,
  textStyle,
}: ColorBarPropType) => {
  let isAlignHorizontal = align === 'to right' ? true : false;

  if (theme === 'gradient') {
    let colors = '';
    for (let i = 0; i < data.length; i++) {
      if (i == data.length - 1) {
        colors = colors + data[i].color;
      } else {
        colors = colors + data[i].color + ',';
      }
    }
    let gradientBackground = `linear-gradient(${align}, ${colors})`;
    return (
      <LinearContainerStyle
        style={colorBarContainerStyle}
        isAlignHorizontal={isAlignHorizontal}>
        <LinearGradientBarStyle
          style={colorBarContentsStyle}
          isAlignHorizontal={isAlignHorizontal}
          background={gradientBackground}
        />
        <LinearGradientTextContainerStyle
          style={colorBarTextContainerStyle}
          isAlignHorizontal={isAlignHorizontal}>
          {console.log(typeof data[0].scale)}
          {typeof data[0].scale === 'number' ? (
            <>
              <text style={textStyle}>{data[0].scale}</text>
              <text style={textStyle}>{data[data.length - 1].scale}</text>
            </>
          ) : (
            <>
              <text style={textStyle}>{data[0].scale['start']}</text>
              <text style={textStyle}>
                {data[data.length - 1].scale['end']}
              </text>
            </>
          )}
        </LinearGradientTextContainerStyle>
      </LinearContainerStyle>
    );
  } else {
    return (
      <>
        <DiscreteBarContainerStyle
          style={colorBarContainerStyle}
          isAlignHorizontal={isAlignHorizontal}
          gridGap={gridGap}
          colorNum={data.length}
          isScaleShown>
          {data.map((item, index) => (
            <>
              <DiscreteBarColorChipStyle
                style={colorBarContentsStyle}
                isAlignHorizontal={isAlignHorizontal}
                index={index + 1}
                backgroundColor={item.color}
              />
              <DiscreteBarTextBoxStyle
                style={colorBarTextContainerStyle}
                isAlignHorizontal={isAlignHorizontal}>
                <text style={textStyle}>
                  {typeof item.scale === 'number'
                    ? item.scale
                    : `${item.scale['start']}~${item.scale['end']}`}
                </text>
              </DiscreteBarTextBoxStyle>
            </>
          ))}
        </DiscreteBarContainerStyle>
      </>
    );
  }
};

export default ColorBar;
