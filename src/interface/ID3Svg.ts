import * as d3 from 'd3';

interface IBoxSize {
  width: number;
  height: number;
}

export type ID3Svg = d3.Selection<any> &  {
  getSize?: () => IBoxSize,
}

export interface ID3SvgOpts {
  container?: HTMLElement | HTMLDivElement; // 可接受传入的容器
  width?: number | string; // 可以设置svg容器的宽度
  height?: number | string; // 可以设置svg容器的高度
  style?: {}; // 可以设置svg容器的样式
  wrapperContainerStyle?: {
    // 可以设置包裹svg容器的外层容器样式
    [key: string]: any;
  };
}