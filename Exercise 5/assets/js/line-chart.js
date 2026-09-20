(() => {
  d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
    return {
      year: +d.Year,
      averagePrice: +d["Average Price (notTas-Snowy)"]
    };
  }).then(data => {
    console.log(data); // check year and averagePrice are numbers, not strings

    drawLineChart(data);
  });

  const drawLineChart = data => {
    // Same margins as 5.1 so the two charts line up
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the svg container for our chart
    const svg = d3.select("#line-chart")
      .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group and apply margins
    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales — both linear since year and price are continuous
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averagePrice)])
      .range([innerHeight, 0]);

    // Set up axes — force year ticks to show as integers, not decimals
    const bottomAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(bottomAxis);

    innerChart.append("g")
      .call(leftAxis);

    // Add y-axis label
    innerChart.append("text")
      .text("Average Price ($ per MWh)")
      .attr("x", -margin.left)
      .attr("y", -10)
      .attr("text-anchor", "start");

    // Draw a scatter plot first, to see the raw points
    innerChart.selectAll(".point")
      .data(data)
      .join("circle")
        .attr("class", "point")
        .attr("r", 3)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "green");

    // Draw a line connecting the points
    const lineGenerator = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.averagePrice));

    innerChart.append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "green");
  };
})();