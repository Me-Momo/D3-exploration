// @ts-check
import * as d3 from "d3";
import IAdimission from "./interface";
import { debug } from "../utils";

const logger = debug("Week01");
const DEFAULT_CONTAINER_WIDTH = 800;
const DEFAULT_CONTAINER__HEIGHT = 500;

const DEFAULT_CONTAINER = `<div>
<h2>Bar Chart</h2>
<div id="barChart"></div>
</div>`;

function getSVGContainer(options?: {
  container?: HTMLDivElement,
  width?: number,
  height?: number,
}) {
  let { container, width, height } = options;
  if (!container) {
    container =document.createElement('div');
    container.innerHTML = DEFAULT_CONTAINER;
  }
  width = width || DEFAULT_CONTAINER_WIDTH;
  height = height || DEFAULT_CONTAINER__HEIGHT;
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  return svg;
}

d3.csv("data/Week01/admissions.csv", (admissions: IAdimission[]) => {
  debug("Week01")("get dataset of admissions %o", admissions);

  const BAR_WIDTH = DEFAULT_CONTAINER_WIDTH / admissions.length;
  const svg = getSVGContainer();

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
