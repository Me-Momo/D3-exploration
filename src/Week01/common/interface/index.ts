import * as d3 from 'd3';
import D3SvgFactory from '../SvgContainerFactory';

export interface IBoxSize {
  width: number;
  height: number;
}

export interface ISvgContainerOptions {
  container?: HTMLElement | HTMLDivElement; // 可接受传入的容器
  width?: number | string; // 可以设置svg容器的宽度
  height?: number | string; // 可以设置svg容器的高度
  style?: {}; // 可以设置svg容器的样式
  wrapperContainerStyle?: {
    // 可以设置包裹svg容器的外层容器样式
    [key: string]: any;
  };
}

export type SvgContainer = D3SvgFactory;

export interface IBarChart {
  container: SvgContainer;
  data: any[];
}
