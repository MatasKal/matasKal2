//retrieve data and display it on screen

async function main() {

  showLoading();

  let namesSet = await fetchData('http://78.63.13.74:3006/FlowFormaAPI/names');
  let techSet = await fetchData('http://78.63.13.74:3006/FlowFormaAPI/tech');

  let names = await namesSet.json();
  let tech = await techSet.json();

  let arrayLength = names.length;

  let ages = await getAge(names);

  for (let i = 0; i < arrayLength; i++) {
    addRow("people-list", names[i], tech[i], ages[i]);
  }

  hideLoading();
}

//calculate age based on information

async function getAge(names) {

  let arrayLength = names.length;

  let today = new Date();
  let yearToday = today.getFullYear();
  let monthToday = today.getMonth() + 1;
  let dayToday = today.getDate();

  let ages = [];
  let dateSet = [];
  let urlList = [];

  for (let i = 0; i < arrayLength; i++) {
    urlList[i] = 'http://78.63.13.74:3006/FlowFormaAPI/getdate/' + names[i].toString();
  }

  try {
    dateSet = await Promise.all(
      urlList.map(url => fetch(url).then((response) => response.json())));
  } catch (error) {

    console.log(error);
    throw error;
  }

  for (let i = 0; i < arrayLength; i++) {
    let age;

    let dateNow = dateSet[i];

    let yearEnd, monthEnd, dayEnd;

    let splitBirth = dateNow.Birth.split("-");
    let yearBirth = parseInt(splitBirth[0]);
    let monthBirth = parseInt(splitBirth[1]);
    let dayBirth = parseInt(splitBirth[2]);

    if (dateNow.Death !== null) {
      let splitDeath = dateNow.Death.split("-");
      yearEnd = parseInt(splitDeath[0]);
      monthEnd = parseInt(splitDeath[1]);
      dayEnd = parseInt(splitDeath[2]);
    }
    else {
      yearEnd = yearToday;
      monthEnd = monthToday;
      dayEnd = dayToday;
    }

    if (yearEnd >= yearBirth) {
      if (yearEnd == yearBirth) {
        age = 0;
      }
      else if ((monthEnd < monthBirth) || (monthEnd == monthBirth && dayEnd < dayBirth)) {
        age = yearEnd - yearBirth - 1;
      }
      else {
        age = yearEnd - yearBirth;
      }
    }
    else {
      age = "Invalid Dates. Please check!"
    }
    ages.push(age);
  }

  return ages;
}

//get data from API

async function fetchData(url) {

  let dataSet = await fetch(url);

  if (!dataSet.ok) {
    throw new Error(`Error! status: ${dataSet.status}`);
  }
  else {
    return dataSet;
  }
}

//adds a row to the table

function addRow(tableID, fullName, technologies, date) {

  let tableRef = document.getElementById(tableID);

  let newRow = tableRef.insertRow(-1);

  let newCell1 = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);
  let newCell3 = newRow.insertCell(2);

  let newText1 = document.createTextNode(fullName);
  let newText2 = document.createTextNode(technologies);
  let newText3 = document.createTextNode(date);

  newCell1.appendChild(newText1);
  newCell2.appendChild(newText2);
  newCell3.appendChild(newText3);
}


//function taken fron w3schools. No need to reinvent the wheel. 
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("people-list");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function showLoading() {
  document.getElementById("loading-front").classList.add("show");
  document.getElementById("loading-back").classList.add("show");
}

function hideLoading() {
  document.getElementById("loading-front").classList.remove("show");
  document.getElementById("loading-back").classList.remove("show");
}