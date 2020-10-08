import React, { Component } from "react";

const NAME_API = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const TECH_API = 'http://78.63.13.74:3006/FlowFormaAPI/tech';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      names: [],
    };

  }

  componentDidMount() {
    fetch(NAME_API)
      .then(response => response.json())
      .then(data => this.setState({ names: data.names }));
  }


  render() {

    const { names } = this.state;

    if (this.state.names === []) {
      return <div><p>Loading ...</p></div>;
    }

    else {
      return (
        <div>
          <ul>
            {names.map(name =>
              <li key={name.objectID}>
                <a href={name.url}>{name.title}</a>
              </li>
            )}
          </ul>
        </div>
      );
    }
  }
}


export default App;