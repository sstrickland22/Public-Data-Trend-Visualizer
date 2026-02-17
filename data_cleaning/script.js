// script.js

console.log("script.js is running!"); // This line should appear in your console!

// 1. Set up dimensions and margins for the chart
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// 2. Select the chart container from index.html and append the SVG element
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// 3. Load the data from data.csv
d3.csv("data.csv").then(function(data) {

    // 4. Parse the data: Convert 'Year' and 'Value' from strings to numbers
    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Value = +d.Value;
    });

    // Optional: Sort data by year to ensure the line connects points in the correct chronological order.
    data.sort((a, b) => a.Year - b.Year);

    // 5. Define X Scale (for the 'Year' data)
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);

    // 6. Define Y Scale (for the 'Value' data)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Value)])
        .range([height, 0]);

    // 7. Add X-axis to the SVG
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // 8. Add Y-axis to the SVG
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // 9. Create the line generator
    const line = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Value));

    // 10. Draw the line path on the SVG
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // 11. Add X-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Year");

    // 12. Add Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Value");

    // 13. Add Chart Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Public Data Trend Over Time");

}).catch(function(error){
    console.error("Error loading or parsing data:", error);
    d3.select("#chart-container").append("p").text("Failed to load data. Check console for details.");
});
