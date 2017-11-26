import * as d3 from '../../d3-bundle';
import { ID3Svg, ID3SvgOpts } from './interface/ID3Svg';
import { IBoxSize } from './interface/dataType';

class D3Svg {

  private svg: ID3Svg;
  private wrapperContainer: HTMLElement | HTMLDivElement;

  constructor(
    options: ID3SvgOpts = {},
  ) {
    const container = options.container || DEFAULT_CONTAINER();
    const width = DEFAULT_CONTAINER_WIDTH;
    const height = DEFAULT_CONTAINER__HEIGHT;
    const { wrapperContainerStyle } = options;

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
      .attr("width", width)
      .attr("height", height)
      // .style({ ...style } as { [key: string]: string});
  }

  create(): ID3Svg {
    this.svg = Object.assign(this.svg, {
      getSize: () => this.getSVGSize(),
    })
    return this.svg;
  }

  private getSVGSize(): IBoxSize {
    if (this.svg) {
      // Notice: it's SVGSVGElement
      const node = this.svg.node() as SVGSVGElement;
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

const DEFAULT_CONTAINER_WIDTH = "100%";
const DEFAULT_CONTAINER__HEIGHT = "100%";
const DEFAULT_CONTAINER = (): HTMLElement => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  return container;
};

export default D3Svg;
