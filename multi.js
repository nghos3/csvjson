function multi() {
  // set the dimensions and margins of the graph
  let margin = {
      top: 100,
      right: 20,
      bottom: 60,
      left: 200,
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // parse the date / time
    // var parseTime = d3.timeParse("%Y");

    // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const valueline = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.fat));
    // define the line
  const valueline2 = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.carbohydrates));

    // define the line
  const valueline3 = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.protein));


    // moves the 'group' element to the top left margin
  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`,
    );


  const regArr = ['North Europe', 'Central Europe', 'South Europe '];
  let a = 0;


  function draw(data) {
    // var data = data[country];

    // format the data
    data.forEach((d) => {
      if (regArr.indexOf(d.region) >= 0) {
        d.region = a;
        a += 100;
      }
      d.fat = d.fat;
      d.carbohydrates = d.carbohydrates;
      d.protein = d.protein;
    });


    x.domain(d3.extent(data, d => d.region));
    y.domain([0, d3.max(data, d => Math.max(d.fat, d.carbohydrates, d.protein))]);


    svg.append('text')
      .attr('x', (width / 2))
      .attr('y', 0 - (margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .style('font-family', 'sans')
      .style('text-decoration', 'none')
      .text('EUROPEAN SUBCONTINENT CONUMPTION RATE');

    // Add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line1')
      .attr('stroke', 'green')
      .text('line1')
      .attr('d', valueline);
    // Add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line2')
      .text('line2')
      .attr('d', valueline2);

    svg.append('path')
      .data([data])
      .attr('class', 'line3')
      .attr('d', valueline3);
    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));


    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '-10em')
      .attr('dx', '-22em')
      .attr('text-anchor', 'middle')
      .style('fill', 'steelblue')
      .text('fat');

    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '-21em')
      .attr('dx', '-20em')
      .attr('text-anchor', 'middle')
      .style('fill', 'green')
      .text('carbohydrates');

    svg.append('text')
      .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
      .attr('dy', '-6em')
      .attr('dx', '-21em')
      .attr('text-anchor', 'middle')
      .style('fill', 'red')
      .text('protein');

    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-44em')
      .attr('text-anchor', 'middle')
      .style('fill', 'Black')
      .text('North Europe');

    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-23em')
      .attr('text-anchor', 'middle')
      .style('fill', 'Black')
      .text('Central Europe');

    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-3em')
      .attr('text-anchor', 'middle')
      .style('fill', 'Black')
      .text('South Europe');


    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }
  // Get the data
  d3.json('multig.json', (error, data) => {
    if (error) throw error;

    // trigger render
    draw(data);
  });
  // body...
}
