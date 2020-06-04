console.log("Hello from App.js");

let viz;

//selecting html elements
const hideButton = document.getElementById("hideButton");
const showButton = document.getElementById("showButton");
const vizContainer = document.getElementById("vizContainer");
const exportPDFbutton = document.getElementById("exportPDFbutton");
const exportPPTbutton = document.getElementById("exportPPTbutton");
const applyFilter = document.getElementById("applyFilter");

// tell js api to put the dashboard somewhere. find the container and put it in that container

const url =
  "https://public.tableau.com/views/CO2Emissions2004-2014MM2019Wk22/Dashboard2";
// creating a variable that holds the url for the viz

const options = {
  device: "desktop",
};
// adding option for device layout

function initViz() {
  console.log("My viz is loading...");
  viz = new tableau.Viz(vizContainer, url, options);
}
// calling new tableau.Viz from js API

function hideTheViz() {
  console.log("Going to hide the viz...");
  viz.hide();
}
function showTheViz() {
  console.log("Going to show the viz...");
  viz.show();
}

//applying min max filter
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(
    `Your min value is ${minValue} and your max value is ${maxValue}`
  );
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(CO2 Emissions)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Your filter was applied!"));
  console.log(sheetToFilter);
}

function exportPDFfunction() {
  console.log("Generating PDF export...");
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  console.log("Generating PPT export...");
  viz.showExportPowerPointDialog();
}

hideButton.addEventListener("click", hideTheViz);
showButton.addEventListener("click", showTheViz);
exportPDFbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);
applyFilter.addEventListener("click", getRangeValues);
document.addEventListener("DOMContentLoaded", initViz);
// listening for DOMContentLoaded event. This event fires when the html has completely loaded and parsed. Then is calls the initViz function
