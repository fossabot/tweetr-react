import * as d3 from "d3";
import * as React from "react";

interface Coord {
  x: number;
  y: number;
}

interface GraphNode extends Coord {
  id: string;
}

interface GraphLink {
  source: string & Coord;
  target: string & Coord;
}

export interface SocialGraphDescription {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface SocialGraphProperties {
  graph: SocialGraphDescription;
}

export class SocialGraph extends React.Component<SocialGraphProperties, any> {
  private container: HTMLDivElement;
  private svg: SVGSVGElement;

  private width: number;
  private height: number;

  constructor(props: SocialGraphProperties) {
    super(props);

    this.width = 0;
    this.height = 0;
  }

  public componentDidMount() {
    // adapted from https://bl.ocks.org/mbostock/4062045
    const circleRadius = 5,
          width = this.container.clientWidth,
          height = this.container.clientHeight,
          forceLinkName = "link",
          svg = d3.select("svg")
                  .attr("width", "100%")
                  .attr("height", "100%")
                  .attr("preserveAspectRatio", "xMinYMin")
                  .attr("viewBox", "0 0 " + Math.min(width, height) + " " + Math.min(width, height)),
          simulation = d3.forceSimulation<GraphNode, GraphLink>()
                         .force(forceLinkName, d3.forceLink<GraphNode, GraphLink>()
                                                 .id((d) => d.id))
                         .force("charge", d3.forceManyBody())
                         .force("center", d3.forceCenter(width / 2, height / 2)),
          link = svg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(this.props.graph.links)
                    .enter()
                    .append("line")
                    .attr("stroke-width", 1)
                    .attr("stroke", "#999"),
          node = svg.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(this.props.graph.nodes)
                    .enter()
                    .append("circle")
                    .attr("r", circleRadius)
                    .attr("fill", "#000"),
          label = svg.append("g")
                    .attr("class", "labels")
                    .selectAll("text")
                    .data(this.props.graph.nodes)
                    .enter()
                    .append("text")
                    .text((d) => d.id);

    const force = simulation.nodes(this.props.graph.nodes)
                            .on("tick", () => {
                              link.attr("x1", (d) => d.source.x)
                                  .attr("y1", (d) => d.source.y)
                                  .attr("x2", (d) => d.target.x)
                                  .attr("y2", (d) => d.target.y);

                              node.attr("cx", (d) => d.x)
                                  .attr("cy", (d) => d.y);

                              label.attr("x", (d) => d.x - d.id.length * 0.5 * 6)
                                  .attr("y", (d) => d.y - circleRadius * 2);
                            })
                            .force(forceLinkName) as any;

    force.links(this.props.graph.links);

    const circles = this.svg.querySelectorAll(".nodes circle"),
          texts = this.svg.querySelectorAll(".labels text");

    function resetTextClasses() {
      for (const text of texts) {
        text.classList.remove("active");
      }
    }

    for (let i = 0; i < circles.length; i++) {
      const circle = circles.item(i) as SVGCircleElement,
            text = texts.item(i) as SVGTextElement;

      circle.onmouseover = () => {
        resetTextClasses();
        text.classList.add("active");
      };

      circle.onmouseout = () => {
        resetTextClasses();
      };
    }
  }

  public render() {
    if (this.container) {
      const width = this.container.clientWidth,
            height = this.container.clientHeight;

      if (width && width !== this.width) {
        this.width = this.container.clientWidth;
      }

      if (height && height !== this.height) {
        this.height = this.container.clientHeight;
      }
    }

    return (
      <div className="social graph" ref={(ref: HTMLDivElement) => this.container = ref}>
        <svg width={this.width} height={this.height} ref={(ref: SVGSVGElement) => this.svg = ref}></svg>
      </div>
    );
  }
}
