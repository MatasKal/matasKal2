import React from "react";

export default class Loader extends React.Component {
    constructor() {
        super();
        this.visible = "hidden";
    }

    render() {
        return (
            <div>
                <div id="loading-front" style={{visibility: this.visible}} ></div>
                <div id="loading-back"  style={{visibility: this.visible}} ></div>
            </div>
        )
    }
}