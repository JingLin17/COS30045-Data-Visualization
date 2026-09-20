(() => {
  d3.csv("assets/data/Data_exercise_5.3.csv", d => {
    return {
      Screensize_Category: d.Screensize_Category,
      Count: +d.Count
    };
  }).then(data => {
    console.log(data); // check Count is a number, not a string

    drawDonutChart(data);
  });

  const drawDonutChart = data => {
    // Set up chart dimensions — sized around a radius, not innerWidth/innerHeight
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // leave some padding

    // Create a colour scale — one distinct colour per category
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.Screensize_Category))
      .range(d3.schemeSet2);

    // Calculate the angle for each slice using d3.pie
    const pie = d3.pie()
      .value(d => d.Count)
      .sort(null); // keep original data order instead of sorting by size

    // Set up the arc generator — inner radius makes it a donut, not a pie
    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.6)  // 60% of radius = donut hole
      .outerRadius(radius);

    // Add the svg container
    const svg = d3.select("#donut-chart")
      .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group, centred in the svg
    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Bind data and create the donut chart
    innerChart
      .selectAll("path")
      .data(pie(data))
      .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Add labels in the middle of each slice
    innerChart
      .selectAll("text")
      .data(pie(data))
      .join("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(d => d.data.Screensize_Category);
  };
})();