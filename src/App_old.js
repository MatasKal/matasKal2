import React, { Component } from "react";

const NAME_API = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const TECH_API = 'http://78.63.13.74:3006/FlowFormaAPI/tech';
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
  
  async function fetchData(url) {
  
    let dataSet = await fetch(url);
  
    if (!dataSet.ok) {
      throw new Error(`Error! status: ${dataSet.status}`);
    }
    else {
      return dataSet;
    }
  }


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hits: [],
        };
    }

    componentDidMount() {
        fetch(NAME_API)
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));
    }

    render() {
        const { hits } = this.state;

        return (
            <ul>
                {hits.map(hit =>
                    <li key={hit.objectID}>
                        <a href={hit.url}>{hit.title}</a>
                    </li>
                )}
            </ul>
        );
    }
}


export default App;