import * as d3 from 'd3';
import IAdimission from './interface';
import { debug } from '../utils';

const logger = debug('Week01');
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;

d3.csv("data/Week01/admissions.csv", (admissions: IAdimission[]) => {
  debug("Week01")("get dataset of admissions %o", admissions);

  const BAR_WIDTH = DEFAULT_WIDTH / admissions.length;
  const svg = d3
    .select(".svgArea")
    .append("svg")
    .attr("width", DEFAULT_WIDTH)
    .attr("height", DEFAULT_HEIGHT);

  const rects = svg
    .selectAll("rect")
    .data(admissions)
    .enter()
    .append("rect");

  rects
    .attr("x", (d, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .attr("y", 0)
    .attr("width", BAR_WIDTH)
    .attr("height", (d, i: number) => {
      return d.Count;
    })
    .attr("fill", d => {
      return d.Status === "Admit" ? "green" : "red";
    });
});
