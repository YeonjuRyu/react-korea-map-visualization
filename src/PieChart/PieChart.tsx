import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';

type PieChartProps = {
  data;
  r: number;
  transform;
  colors?: Array<any>;
  onMouseOver?;
  onMouseOut?;
};

const PieChart = ({
  r = 10,
  data,
  colors,
  transform,
  onMouseOver,
  onMouseOut,
}: PieChartProps) => {
  var pie = d3.pie<any>().value(d => d[1]);
  var data_ready = pie(Object.entries(data));
  var path = d3
    .arc<d3.PieArcDatum<any>>()
    .innerRadius(0)
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

  return (
    <g
      className={'pieChart'}
      transform={transform}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      {data_ready.map(({ data, startAngle, endAngle }, index) => {
        return (
          <path
            fill={colors ? colors[data[0]] : defaultColors[index]}
            strokeWidth={3}
            d={`${path.startAngle(startAngle).endAngle(endAngle)}`}
          />
        );
      })}
    </g>
  );
};

export default PieChart;
