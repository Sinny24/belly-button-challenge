// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

});

// Initialize the dashboard at the start
function init() {

    // Use D3 to select the dropdown menu
    let menudropDown = d3.select("#selDataset");

    // use D3 to get sample names and populate the drop down menu
    d3.json(url).then((data) => {

        // Set Variable for sample names
        let names = data.names;
        
        // Add samples to the dropdown menu
        names.forEach((id) => {
            
            // Log the value of the id for every iteration of the loop
            // console.log(id);

            menudropDown.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let one_sample = names[0];

        // Log the value of one_sample
        //console.log(one_sample);

        // Build the initial plots
        metadataBuild(one_sample);
        barchartBuild(one_sample);
        bubblechartBuild(one_sample);
        gaugechartBuild(one_sample);

       
    });

    


};



// Function that populates metadata info
function metadataBuild(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all of the metadata
        let metadata = data.metadata;

        // Filter based on value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Get the first index from the array
        let dataValue = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key-value pair to the panel
        Object.entries(dataValue).forEach(([key,value]) => {

            // Log the individual key-value pairs as they are being appended to the metadata panel
            // console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        

    });

    
};


// Function that builds the bar chart
function barchartBuild(sample) {
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let infoSample = data.samples;

        // Filter based on value of the sample
        let value = infoSample.filter(result => result.id == sample);

        // Get first index from the array
        let dataValue = value[0];

        // get the otu_ids, labels, and sample values
        let otu_ids = dataValue.otu_ids;
        let otu_labels = dataValue.otu_labels;
        let sample_values = dataValue.sample_values;

        // Log the data to the console
       //  console.log(otu_ids,otu_labels,sample_values);

        // Set the top 10 items to display in descending order
        let ticksy = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
        let ticksx = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        // Set up the trace for the bar chart
        let trace = {
            x: ticksx,
            y: ticksy,
            text: labels,
            type: "bar",
            orientation: "h"

        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar cahrt
        Plotly.newPlot("bar", [trace], layout)
        
    });

    
};

// Function that builds the bubble chart
function bubblechartBuild(sample) {

    // Use D# to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let infoSample = data.samples;

        // Filter based on value of the sample
        let value = infoSample.filter(result => result.id == sample);

        // Get first index from the array
        let dataValue = value[0];

        // get the otu_ids, labels, and sample values
        let otu_ids = dataValue.otu_ids;
        let otu_labels = dataValue.otu_labels;
        let sample_values = dataValue.sample_values;

        // Log the data to the console
        // console.log(otu_ids,otu_labels,sample_values);

        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout);




    });

    
};

// Function that builds the gaugechart
function gaugechartBuild(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all the metadata
        let metadata = data.metadata;

        // Filter based on the value of sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after they are filtered
        //console.log(value)

        // Get the first index of the array
        let dataValue = value[0];

        // Use Object.values for the gauge chart
        let frequencyWash = Object.values(dataValue) [6];

        // Set up the trace for the gauge chart
        let trace2 = {
            value: frequencyWash,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", sixe: 16}

            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, .5)"},

                ]
            }
        };


        // Set up the layout
        let layout = {
            width: 400,
            height: 400,
            margin: {t: 0, b:0}
        };

        // Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [trace2], layout)
    });

    
};

// Function that updates the dashboard when sample is changed
function optionChanged(value){

    // log the new value
    // console.log(value);

    // Call All Functions
    metadataBuild(value);
    barchartBuild(value);
    bubblechartBuild(value);
    gaugechartBuild(value);



};

// Call the initialize function
init();