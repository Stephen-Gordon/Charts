let params = {
	numOfBars: 10,
	numOfBarsMin: 1,
    numOfBarsMax: 10,

    numOfBarsHor: 10,
	numOfBarsHorMin: 1,
    numOfBarsHorMax: 10,

    numOfBarsStacked: 10,
    numOfBarsStackedMin: 1,
    numOfBarsStackedMax: 10

}




let visible = true;
var gui;



let stackedData = [
    
    {country: "Switzerland", Qol: 195, Pol: 19, Saftey: 78, values:[195,19,78], total: 294},

    {country: "Finland", Qol: 184, Pol: 25, Saftey: 72, values:[184,25,72], total: 281},

    {country: "New Zealand", Qol: 176, Pol: 23, Saftey: 56, values:[176,23,56], total: 255 },

    {country: "Portugal", Qol: 162, Pol: 30, Saftey: 69, values:[162,30,69], total: 261}

    ,{country: "South Africa", Qol: 136, Pol: 1/56, Saftey: 23, values:[136,56,23], total: 215},

    {country: "Tunisia", Qol: 116, Pol:70, Saftey: 55, values:[116,70,55], total: 241 },

    {country: "Russia", Qol: 103, Pol: 61, Saftey: 60, values:[103,61,60], total: 224},

    {country: "Chile", Qol: 100, Pol: 78, Saftey: 46, values:[100,78,46], total: 224},

    {country: "Kenya", Qol: 92, Pol: 69, Saftey: 43, values:[92,69,43], total: 204},

    {country: "Nigeria", Qol: 52, Pol: 88, Saftey: 36, values:[52,88,36], total: 176} 

]

let legend = [
    {name: "Quality Of life", colour:'#7172ad'},
    {name: "Pollution", colour:'#509ee3'},
    {name: "Saftey", colour:'#ef8c8c'}
]





let qolHorChart;
let polBarChart;
let stackedChart;
let scatterChart;




function setup() {
    createCanvas(1200, 1200);
    generateData()
    //Horizontal 
    qolHorChart = new HorBarChart(dataSmall)
    qolHorChart.chartWidth = 300;
    qolHorChart.chartHeight = 300
    qolHorChart.posX = 100;
    qolHorChart.posY = 400;
    qolHorChart.updateValues()
    //regular
    polBarChart = new BarChart(dataSmall)
    polBarChart.chartWidth = 300;
    polBarChart.chartHeight = 300
    polBarChart.posX = 600;
    polBarChart.posY = 400;
    polBarChart.updateValues()
     
    //Stacked
    stackedChart = new StackedChart(stackedData, legend)
    stackedChart.chartWidth = 300;
    stackedChart.chartHeight = 300;
    stackedChart.posX = 100;
    stackedChart.posY = 1000;
    stackedChart.updateValues()
    //scatter
    scatterChart = new ScatterChart(dataSmall)
    scatterChart.chartWidth = 300;
    scatterChart.chartHeight = 300
    scatterChart.posX = 600;
    scatterChart.posY = 1000;
    scatterChart.title =   "Pollution compared to Quality of Life";
    scatterChart.updateValues();
    
    gui = createGui('Change the number of bars');
	gui.addObject(params);
   

}


function draw() {
    background(242, 242, 242);
    textFont(newFont)
    scale(1)
    qolHorChart.updateValues();
    qolHorChart.render();
    qolHorChart.updateGuiVals(params.numOfBarsHor);

    polBarChart.updateValues();
    polBarChart.render();
    polBarChart.updateGuiVals(params.numOfBars);

    stackedChart.updateValues();
    stackedChart.render();
    stackedChart.updateGuiVals(params.numOfBarsStacked);

    scatterChart.updateValues();
    scatterChart.render();
}


function keyPressed() {
    switch(key) {
      // type [F1] to hide / show the GUI
      case 'p':
        visible = !visible;
        if(visible) gui.show(); else gui.hide();
        break;
    }
  }