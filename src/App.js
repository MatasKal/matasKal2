import React, { Component } from 'react';
import TableSorter from './components/TableSorter';
import TableSorterDir from './components/TableSorterDir';
import Loader from './components/Loader';

const NAME_API = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const TECH_API = 'http://78.63.13.74:3006/FlowFormaAPI/tech';
const DATE_API = 'http://78.63.13.74:3006/FlowFormaAPI/getdate/';


class App extends Component {

  constructor(props) {
    super(props);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.state = {
      names: [],
      technologies: [],
      urls: [],
      dates: [],
      ages: [],

      sortedField: null,
      sortedFieldDir: 'ascending',
      headerActivity: '',

      loadedNames: "false",
      loadedTech: "false",
      loadedDates: "false",

      loaderVisible: '',
    }
  }

  getDataFromApi() {
    if (this.state.loadedNames === "false" || "loaded") {
      this.setState({ loadedNames: "loading", loaderVisible: 'show' });
      fetch(NAME_API)
        .then(response => response.json())
        .then((result) => {
          this.setState({ names: result, loadedNames: "loaded" }, (error) => {
            if (error) {
              alert('failed to fetch');
            }
            else {
              this.calculateAge();
            }
          })
        });
    }

    if (this.state.loadedTech === "false" || "loaded") {
      this.setState({ loadedTech: "loading", loaderVisible: 'show' });
      fetch(TECH_API)
        .then(response => response.json())
        .then((result) => {
          this.setState({ technologies: result, loadedTech: "loaded" },
            (error) => {
              if (error) {
                alert('failed to fetch');
              }
            })
        });
    }
  }

  async calculateAge() {

    let { urls } = this.state;

    let age;

    let agesArr = [];
    let today = new Date();
    let yearToday = today.getFullYear();
    let monthToday = today.getMonth() + 1;
    let dayToday = today.getDate();

    if (this.state.loadedDates === "false" || "loaded") {
      this.setState({ loadedDates: "loading" });
      urls = this.state.names.map(name => DATE_API + name.toString());
    }

    await Promise.all(urls.map(url =>
      fetch(url)
        .then(response => response.json())))
      .then(dates => this.setState({ dates, loadedDates: "loaded", loaderVisible: '' },
        (error) => {
          if (error) {
            alert('failed to fetch');
          }
        }));

    agesArr = this.state.dates.map(date => {
      let dateNow = date;

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
        if (yearEnd === yearBirth) {
          age = 0;
        }
        else if ((monthEnd < monthBirth) || (monthEnd === monthBirth && dayEnd < dayBirth)) {
          age = yearEnd - yearBirth - 1;
        }
        else {
          age = yearEnd - yearBirth;
        }
      }
      else {
        age = "Invalid Dates. Please check!"
      }

      return age;
    });

    this.setState({ ages: agesArr });
  }

  render() {
    const { names } = this.state;
    const { technologies } = this.state;
    const { loadedNames } = this.state;
    const { loadedTech } = this.state;
    const { loadedDates } = this.state;
    const { ages } = this.state;
    const { sortedField } = this.state;
    const { sortedFieldDir } = this.state;
    const { headerActivity } = this.state;
    const { loaderVisible } = this.state;


    let rowTable = names.map((_, i) =>
      [
        loadedNames === "loading" ? "Loading..." : names[i],
        loadedTech === "loading" ? "Loading..." : technologies[i],
        loadedDates === "loading" ? "Loading..." : ages[i]
      ]);

    let sortedRows = TableSorter(rowTable, sortedFieldDir, sortedField);

    return (
      <div>
        <Loader visible={loaderVisible} />
        <button id="populate-button" onClick={() => {
          this.getDataFromApi();
          this.setState({ sortedField: null, sortedFieldDir: 'normal' });
        }}>Populate table</button>
        <table id="people-list">
          <thead><tr>
            <th key={"nameHeader"} className={sortedField === 0 ? headerActivity : ""} onClick={() => this.setState(TableSorterDir(0, sortedFieldDir))}>Name</th>
            <th key={"techHeader"} className={sortedField === 1 ? headerActivity : ""} onClick={() => this.setState(TableSorterDir(1, sortedFieldDir))}>Tech</th>
            <th key={"ageHeader"} className={sortedField === 2 ? headerActivity : ""} onClick={() => this.setState(TableSorterDir(2, sortedFieldDir))}>Age</th>
          </tr></thead>
          <tbody>
            {sortedRows.map((sortedRows, i) => {
              return (
                <tr key={names[i]}>
                  <td key={names[i].toString() + " name"}>{sortedRows[0]}</td>
                  <td key={names[i].toString() + " tech"}>{sortedRows[1]}</td>
                  <td key={names[i].toString() + " age"}>{sortedRows[2]}</td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;