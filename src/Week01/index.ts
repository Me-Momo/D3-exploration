import * as d3 from 'd3';
import { debug } from '../utils';
import { IAdimission, IBoxSize } from './interface';
import D3SvgFactory from './common/SvgContainerFactory';
// @ts-check

const logger = debug("Week01");
const DEFAULT_CONTAINER_WIDTH = '80%';
const DEFAULT_CONTAINER__HEIGHT = '80%';
const DEFAULT_CONTAINER_STYLE = {
  "margin": "20px",
  "border": "1px solid #666",
  "border-radius": "4px",
};

/**
 * 数据相关
 */
d3.csv("data/Week01/admissions.csv", (admissions: IAdimission[]) => {
  logger("get dataset of admissions %o", admissions);

  const containerFactory = new D3SvgFactory({
    wrapperContainerStyle: {
      width: '80vw',
      height: '90vh',
    },
  });
  const svg = containerFactory.getSvgContainer();
  const boxSize = containerFactory.getSvgContainerSize();
  const BAR_WIDTH = (boxSize.width - 100) / admissions.length - 10;
  logger('盒子大小: %o, 每一条bar宽度: %s', boxSize, BAR_WIDTH);
  const rects = svg
    .selectAll("rect")
    .data(admissions)
    .enter()
    .append("rect");

  rects
    .attr("x", (d, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .attr("y", d => {
      return boxSize.height - d.Count;
    })
    .attr("width", BAR_WIDTH)
    .attr("height", (d, i: number) => {
      return d.Count;
    })
    .attr("fill", d => {
      return d.Status === "Admit" ? "green" : "red";
    });
});
