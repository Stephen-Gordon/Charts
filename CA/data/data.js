let dataAll = [];
let dataSmall = [];
let table;
let smallTable;
let newFont;

function preload() {
    table = loadTable('data/myData.csv', 'csv', 'header');
    smallTable = loadTable('data/myDataSmall.csv', 'csv', 'header');
    newFont = loadFont('fonts/Roboto-Regular.ttf');
}

function generateData() {
    for (let r = 0; r < table.getRowCount(); r++) {
        dataAll.push(table.rows[r].obj)
    }

    for (let r = 0; r < smallTable.getRowCount(); r++) {
        dataSmall.push(smallTable.rows[r].obj)
    }

    for (let i = 0; i < dataSmall.length; i++) {
        dataSmall[i].QualityofLifeIndex = int(dataSmall[i].QualityofLifeIndex)
    }

    for (let i = 0; i < dataSmall.length; i++) {
        dataSmall[i].PollutionIndex = int(dataSmall[i].PollutionIndex)
    }

    for (let i = 0; i < dataSmall.length; i++) {
        dataSmall[i].PollIndex = int(dataSmall[i].PollIndex)
    }

}