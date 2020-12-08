import { ReactNode } from 'react';

export interface ChoroplethData {
  name: RegionNameType;
  grade: number;
}

export interface ChoroplethColor {
  grade: number;
  color: string;
}

export interface ChoroplethProps {
  data: Array<ChoroplethData>;
  colors: Array<any>;
  scale: 'provinces' | 'municipalitie' | 'submunicipalities';
  isRegionNameVisible: boolean;
}

export interface PointProps {
  data: CoordinatesType;
  point: ReactNode;
}

type CoordinatesType = {
  latitude: number;
  longitude: number;
};

type RegionNameType = string;

export interface PieChartData {
  data: CoordinatesType | RegionNameType;
  pieChart: ReactNode;
}
