function fn() {
  // set the dimensions of the canvas
  let margin = {
      top: 48,
      right: 20,
      bottom: 100,
      left: 120,
    },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    // set the ranges
  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  const y = d3.scaleLinear()
    .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`,
    );

    // get the data
  d3.json('barg.json', (error, data) => {
    if (error) throw error;

    // format the data


    data.forEach((d) => {
      d.countries = d.countries;
      d.salt_sug = +d.salt_sug;
    });


    // scale the range of the data
    x.domain(data.map(d => d.countries));
    y.domain([0, d3.max(data, d => d.salt_sug)]);

    svg.append('text')
      .attr('x', (width / 2))
      .attr('y', 0 - (margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .style('font-family', 'sans')
      .style('text-decoration', 'none')
      .text('SALT+SUGAR CONSUMPTION');


    // append the rectangles for the bar chart
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.countries))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.salt_sug))
      .attr('height', d => height - y(d.salt_sug));

    // add the x Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .call(d3.axisLeft(y));
  });
}
