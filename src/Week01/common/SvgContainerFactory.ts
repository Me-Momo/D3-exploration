import * as d3 from "d3";
import { debug } from "../../utils";
import { IBoxSize, ISvgContainerOptions } from "./interface";

/**
 * @class D3SvgFactory
 * @desc 初始化 d3-svg Container
 */
class D3SvgFactory {

  private svg: d3.Selection<any>;
  private wrapperContainer: HTMLElement | HTMLDivElement;

  constructor(
    options: ISvgContainerOptions = {},
  ) {
    const container = options.container || DEFAULT_CONTAINER();
    const width = DEFAULT_CONTAINER_WIDTH;
    const height = DEFAULT_CONTAINER__HEIGHT;
    const { style, wrapperContainerStyle } = options;

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
      .style({ ...style })
      .attr("width", width)
      .attr("height", height);
  }

  getSvgContainer(): d3.Selection<any> {
    return this.svg;
  }

  getSvgContainerSize(): IBoxSize {
    if (this.svg) {
      // Notice: it's SVGSVGElement
      const node = this.svg.node() as SVGSVGElement;
      logger(node.getBoundingClientRect());
      const box = node.getBoundingClientRect();
      return box;
    }
    return {
      width: 0,
      height: 0,
    };
  }
  public addWrapperStyle(styles: { [key: string]: string }) {
    Object.keys(styles).map(key => {
      this.wrapperContainer.style.setProperty(key, styles[key]);
    });
  }
}

const logger = debug("Week01");
const DEFAULT_CONTAINER_WIDTH = "100%";
const DEFAULT_CONTAINER__HEIGHT = "100%";
const DEFAULT_CONTAINER = (): HTMLElement => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  return container;
};

export default D3SvgFactory;
