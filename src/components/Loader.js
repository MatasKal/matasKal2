import React from "react";

export default class Loader extends React.Component {
    render() {
        return (
            <div>
                <div id="loading-front" className={this.props.visible} ></div>
                <div id="loading-back"  className={this.props.visible} ></div>
            </div>
        )
    }
}