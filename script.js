console.log("script.js is running!");

const margin = { top: 60, right: 150, bottom: 60, left: 70 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("font-size", "13px")
    .style("pointer-events", "none")
    .style("opacity", 0);

// Colors for each line
const colors = {
    Technology: "steelblue",
    Healthcare: "green",
    Education: "orange"
};

d3.csv("data.csv").then(function(data) {

    // Parse data
    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Technology = +d.Technology;
        d.Healthcare = +d.Healthcare;
        d.Education = +d.Education;
    });

    const categories = ["Technology", "Healthcare", "Education"];

    // X Scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);

    // Y Scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.Technology, d.Healthcare, d.Education))])
        .range([height, 0]);

    // X Axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // Y Axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Draw lines and dots for each category
    categories.forEach(function(category) {

        // Line
        const line = d3.line()
            .x(d => xScale(d.Year))
            .y(d => yScale(d[category]));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colors[category])
            .attr("stroke-width", 2)
            .attr("class", `line-${category}`)
            .attr("d", line);

        // Data Points
        svg.selectAll(`.dot-${category}`)
            .data(data)
            .enter()
            .append("circle")
            .attr("class", `dot-${category}`)
            .attr("cx", d => xScale(d.Year))
            .attr("cy", d => yScale(d[category]))
            .attr("r", 5)
            .attr("fill", colors[category])
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)

            // Tooltip on hover
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .attr("r", 8)
                    .attr("fill", "orange");
                tooltip
                    .style("opacity", 1)
                    .html(`
                        <strong>${category}</strong><br>
                        <strong>Year:</strong> ${d.Year}<br>
                        <strong>Value:</strong> ${d[category]}
                    `);
            })
            .on("mousemove", function(event) {
                tooltip
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                d3.select(this)
                    .attr("r", 5)
                    .attr("fill", colors[category]);
                tooltip.style("opacity", 0);
            });
    });

    // 👈 INTERACTIVE: Toggle lines on/off with legend
    const legend = svg.selectAll(".legend")
        .data(categories)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${width + 20}, ${i * 30})`)
        .style("cursor", "pointer")
        .on("click", function(event, category) {
            const line = d3.selectAll(`.line-${category}`);
            const dots = d3.selectAll(`.dot-${category}`);
            const active = line.style("opacity") === "1" || line.style("opacity") === "";
            line.style("opacity", active ? 0 : 1);
            dots.style("opacity", active ? 0 : 1);
            d3.select(this).select("text")
                .style("text-decoration", active ? "line-through" : "none");
        });

    // Legend colored boxes
    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => colors[d]);

    // Legend text
    legend.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("font-size", "13px")
        .text(d => d);

    // X Label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Year");

    // Y Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Value");

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Public Data Trend Over Time");

}).catch(function(error){
    console.error("Error loading or parsing data:", error);
    d3.select("#chart-container").append("p").text("Failed to load data.");
});
