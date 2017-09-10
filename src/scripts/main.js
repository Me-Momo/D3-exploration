/**
 * @author xinming.lxj
 * Sept 09 2017
 * 
 * @see https://github.com/d3/d3-shape/blob/master/README.md#pies
 */

const PieChart = d3.pie().value(d => d.Deliciousness);

const WIDTH = 100;
const HEIGHT = 100;

d3.csv('../data/food.csv', (err, foods) => {
  if (err) throw err;

  const svg = d3.select('.svgArea')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .append('g')
  .attr('transform', 'translate(' + (WIDTH / 2) +
    ',' + (HEIGHT / 2) + ')');

    var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(WIDTH, HEIGHT) / 2);


    newFunction(svg, foods, arc);
});
function newFunction(svg, foods, arc) {
    var path = svg.selectAll('path')
    .data(PieChart(foods))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => {
    return d3.scaleOrdinal(d3.scaleBand)(d.data.Deliciousness);
});
}

