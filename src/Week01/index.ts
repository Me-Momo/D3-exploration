import * as d3 from '../d3-bundle';
import { debug } from "../utils";
// import { IAdimission } from './interface';
import D3Svg from './common/D3Svg';
import BarChart from "./common/BarChart";
import PieChart from './common/PieChart';

const logger = debug("Week01");
const DEFAULT_BOX_SIZE = {
  width: 0,
  height: 0,
};

/**
 * 数据相关
 */
d3.csv('data/Week01/admissions.csv', (err, data) => {

    const svgContainer = new D3Svg({
      wrapperContainerStyle: {
        width: "calc(100vw - 40px)",
        height: "60vh",
        margin: "20px",
        "padding-top": "10px",
        border: "1px solid #666",
        background: 'pink',
      },
      width: '100%',
    }).create();
  
    if (!svgContainer) {
      logger('faile to create SvgContainer~~');
    }
    const boxSize = svgContainer.getSize ? svgContainer.getSize() : DEFAULT_BOX_SIZE;
    const BAR_PADDING = 2;
    const BAR_WIDTH = (boxSize.width - 100) / data.length - BAR_PADDING;
  
    const bar = new BarChart({
      data,
      container: svgContainer,　
    });
  
    const counts = data.map(admission => {
      return admission.Count;
    });
    const linearScale = d3.scaleLinear().domain([0, Number(d3.max(counts)) * 2]).range([0, boxSize.height]);
    bar
      .x((d, i: number) => {
        return (i + 1) * 40 + 10;
      })
      .y(d => {
        return boxSize.height - (linearScale(d.Count) as number);
      })
      .width(BAR_WIDTH)
      .height((d, i: number) => {
        return linearScale(d.Count);
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
        return boxSize.height - (linearScale(d.Count) as number);
      });
  
      const PieSvgContainer = new D3Svg({
        width: '100vw',
        height: '20vh',
        wrapperContainerStyle: {
          margin: '20px',
          border: '1px solid yellowgreen',
          padding: '6px 10px',
        },
      }).create();
      const pie = new PieChart({
        data,
        container: PieSvgContainer,
      });
  
      pie.x(20).y(22);
})


function test() {

}
test();





