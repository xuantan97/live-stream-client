import React, { Component } from "react";

// Employee Component
class Question extends Component {
    render() {
        return (
            <li className="question">
                <div>
                    <b>Title:</b> {this.props.title}
                </div>
                <div>
                    <b>A:</b> {this.props.QA}
                </div>
                <div>
                    <b>B:</b> {this.props.QB}
                </div>
                <div>
                    <b>C:</b> {this.props.QC}
                </div>
            </li>
        );
    }
}

export default Question;