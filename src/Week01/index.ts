// @ts-check
import * as d3 from "d3";
import IAdimission from "./interface";
import { debug } from "../utils";

const logger = debug("Week01");
const DEFAULT_CONTAINER_WIDTH = 800;
const DEFAULT_CONTAINER__HEIGHT = 500;
const DEFAULT_CONTAINER_STYLE = {
  margin: "20px",
  border: "1px solid #666",
  "border-radius": "4px"
};

const DEFAULT_CONTAINER = `<div>
<div id="barChart"></div>
</div>`;

class SVGContainer {
  private svg: d3.Selection<any>;
  private wrapperContainer: HTMLElement | HTMLDivElement;
  constructor(
    options: {
      container?: HTMLElement | HTMLDivElement;
      width?: number;
      height?: number;
      style?: {};
      wrapperContainerStyle?: {};
    } = {}
  ) {
    let { container, width, height, style, wrapperContainerStyle } = options;
    width = width || DEFAULT_CONTAINER_WIDTH;
    height = height || DEFAULT_CONTAINER__HEIGHT;
    if (!container) {
      container = document.createElement("div");
      container.innerHTML = DEFAULT_CONTAINER;
      document.body.appendChild(container);
    }

    /**
     * initialize wrapperContainer
     */
    this.wrapperContainer = container;
    if (wrapperContainerStyle) {
      this.addWrapperStyle(wrapperContainerStyle);
    }
    this.svg = d3
      .select(this.wrapperContainer)
      .append("svg")
      .style({ ...DEFAULT_CONTAINER_STYLE, ...style })
      .attr("width", width)
      .attr("height", height);
  }

  getContainer() {
    return this.svg;
  }

  addWrapperStyle(styles: { [key: string]: string }) {
    Object.keys(styles).map(key => {
      this.wrapperContainer.style.setProperty(key, styles[key]);
    });
  }
}

d3.csv("data/Week01/admissions.csv", (admissions: IAdimission[]) => {
  debug("Week01")("get dataset of admissions %o", admissions);

  const BAR_WIDTH = DEFAULT_CONTAINER_WIDTH / admissions.length;
  const svg = new SVGContainer({
    wrapperContainerStyle: {
      background: '#e9e9e9',
    }
  }).getContainer();

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
