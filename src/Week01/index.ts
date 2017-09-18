import * as d3 from "d3";
import { debug } from "../utils";
import { IAdimission } from "./interface";
import D3Svg from './common/D3Svg';
import BarChart from "./common/BarChart";
// import PieChart from './common/PieChart';

const logger = debug("Week01");
const DEFAULT_BOX_SIZE = {
  width: 0,
  height: 0,
};

/**
 * 数据相关
 */
d3.csv("data/Week01/admissions.csv", (admissions: IAdimission[]) => {
  logger("get dataset of admissions %o", admissions);

  const svgContainer = new D3Svg({
    wrapperContainerStyle: {
      width: "80vw",
      height: "90vh",
      margin: "20px",
      "padding-top": "10px",
      border: "1px solid #666",
      background: 'pink',
    }
  }).create();

  if (!svgContainer) {
    logger('faile to create SvgContainer~~');
  }
  const boxSize = svgContainer.getSize ? svgContainer.getSize() : DEFAULT_BOX_SIZE;
  const BAR_WIDTH = (boxSize.width - 100) / admissions.length - 10;

  const bar = new BarChart({
    container: svgContainer,　
    data: admissions
  });

  bar
    .x((d, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .y(d => {
      return boxSize.height - d.Count;
    })
    .width(BAR_WIDTH)
    .height((d, i: number) => {
      return d.Count;
    })
    .fill(d => {
      return d.Status === "Admit" ? "green" : "red";
    });

  bar
    .text(d => {
      return d.Department;
    })
    .x((d, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .y(d => {
      return boxSize.height - d.Count;
    });

    // const pie = new PieChart({
    //   container: svgContainer,
    //   data: admissions,
    // });

    // pie.x(20).y(22);
});


function test() {
    const scale = d3.scale.linear().domain([0, 360]).range([0, 12]);
    logger(scale(23)); //  23/(360/12)

    // 利用 domain 比例尺创建 颜色
    const color = genScaleColor();
    logger(color('gghvbvbnhb'), color.range());

    function genScaleColor() {
        return d3.scale.category10();
      // NOTE: 返回十种颜色: d3.scale.category10().range(); 
    }
}
test();





