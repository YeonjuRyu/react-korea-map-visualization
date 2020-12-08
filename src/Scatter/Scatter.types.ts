import { ReactNode } from 'react';

export interface ScatterMapProps {
  data: Array<ScatterType>;
  point?: ReactNode;
}

export interface ScatterType {
  lon: number; //경도
  lat: number; //위도
  r?: number; //반지름
  color?: string; //색깔
}

// type RegionNameType = string;

// export interface PieChartData {
//     data: CoordinatesType | RegionNameType;
//     pieChart: ReactNode;
// }
