import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';

type PieChartProps = {
  data;
  r?: number;
  transform;
  colors?: Array<any>;
  onMouseOver?;
  onMouseOut?;
  innerRadius?: number;
};

export interface PieChartDataType {
  label: string;
  value: number;
}

const PieChart = ({
  r = 10,
  data,
  colors,
  transform,
  onMouseOver,
  onMouseOut,
  innerRadius = 0,
}: PieChartProps) => {
  var pie = d3.pie<any>().value(d => d[1].value);
  var data_ready = pie(Object.entries(data));
  var path = d3
    .arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(r);
  const defaultColors = [
    '#FFE9F9',
    '#FFBDED',
    '#FF98E3',
    '#FC6AD5',
    '#FF2EC7',
    '#FF00FF',
  ];

  d3.select('.pieChart')
    .transition()
    .delay(function(d, i) {
      return i * 500;
    })
    .duration(10000);

  const getColor = useCallback((colors, label) => {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i]?.label == label) {
        return colors[i].color;
      }
    }
  }, []);

  return (
    <svg
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ padding: '10px' }}>
      <g className={'pieChart'} transform={transform}>
        {data_ready.map(({ data, startAngle, endAngle }, index) => {
          let color = defaultColors[index];
          if (colors) {
            color = getColor(colors, data[1].label);
          }
          return (
            <path
              key={`pieChart${index}`}
              fill={color}
              strokeWidth={3}
              d={path({ startAngle: startAngle, endAngle: endAngle })}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
