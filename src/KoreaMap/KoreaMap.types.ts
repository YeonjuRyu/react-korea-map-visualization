import { ReactNode } from "react";

export interface ChoroplethData {
  regionName: RegionNameType;
  grade: number;
}

export interface ChoroplethColor {
  grade: number;
  color: string;
}

export interface ChoroplethProps {
  data: Array<ChoroplethData>;
  color: Array<ChoroplethColor>;
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
