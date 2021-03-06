import * as d3 from "./d3-bundle";
import dataset, { IDataset } from "./constants/dataset";

const WIDTH = 100;
const HEIGHT = 100;

const svg = d3
  .select(".svgArea")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .append("g")
  .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");

drawPie(svg, dataset);

function drawPie(svg, foods: IDataset[], arc?: any) {
  svg
    .selectAll("path")
    .data(dataset)
    .enter()
    .append("path")
    .attr("fill", d => {
      return "red";
    });
}
