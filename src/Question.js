import React, { Component } from "react";
import { Button } from 'react-bootstrap';

// Employee Component
class Question extends Component {
    render() {
        return (
            <li className="question" style={{listStyle: 'none'}}>
                <div className="question-content">
                    <b>Title:</b> {this.props.title}
                </div>
                <div>
                    {/* <Button variant="outline-primary">A. {this.props.QA}</Button> */}
                    <Button>{this.props.QA}</Button>
                </div>
                <div>
                    {/* <Button variant="outline-primary">B. {this.props.QB}</Button> */}
                    <Button>{this.props.QB}</Button>
                </div>
                <div>
                    {/* <Button variant="outline-primary">C. {this.props.QC}</Button> */}
                    <Button>{this.props.QC}</Button>
                </div>
            </li>
        );
    }
}

export default Question;