import React, { Component } from "react";

const NAME_API = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const TECH_API = 'http://78.63.13.74:3006/FlowFormaAPI/tech';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

  }

  componentDidMount() {
    fetch(NAME_API)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }


  render() {

    const { data } = this.state;

    if (this.state.data === null) {
      return <div><p>Loading ...</p></div>;
    }

    else {

      console.log(data);

      return (
        <div>
          <ul>
            {data.map(name =>
              <li>
                {name}
              </li>
            )}
          </ul>
        </div>
      );
    }
  }
}


export default App;