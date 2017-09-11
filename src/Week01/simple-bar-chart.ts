import * as d3 from "d3";
import IAdimission from "./interface";
import { debug } from "../utils";

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 200;

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
    .attr("x", (d: IAdimission, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .attr("y", 0)
    .attr("width", BAR_WIDTH)
    .attr("height", (d: IAdimission, i: number) => {
      return d.Count;
    })
    .attr("fill", (d: IAdimission) => {
      return d.Status === "Admit" ? "green" : "red";
    });
});
