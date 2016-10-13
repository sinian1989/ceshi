import React from "react";
import {render} from "react-dom";
// import "./assets/css/base.css";
// import "./assets/css/main.css";

export default class App extends React.Component {
    render() {
        return (
            <div id="mainview" className="page-content">
                {this.props.children}
            </div>
        )
    }
}