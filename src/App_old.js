import React, { Component } from "react";

const NAME_API = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const TECH_API = 'http://78.63.13.74:3006/FlowFormaAPI/tech';



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