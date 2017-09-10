// / <reference path="../../typings/modules/d3/index.d.ts" />
import dataset, { IDataset } from '../constants/dataset';
// import * as d3 from 'd3';


const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;



// const svg = d3.select(".svgArea").append("svg").attr("width",DEFAULT_WIDTH + "px").attr("height",DEFAULT_HEIGHT + "px");
// const circles = svg.selectAll("circle").data(dataset).enter().append("circle");

// circles.attr("cx", (d: IDataset, i: number) => {
//     return (i + 1) * 40 + 10;
// }).attr("cy", () => {
//   return DEFAULT_HEIGHT / 2;
// })
// .attr("r", (d: IDataset) => {
//     return d.count;
// }).attr("stroke","green").attr("fill","none");