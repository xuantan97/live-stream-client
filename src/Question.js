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
                    <Button>A. {this.props.QA}</Button>
                </div>
                <div>
                    {/* <Button variant="outline-primary">B. {this.props.QB}</Button> */}
                    <Button>B. {this.props.QB}</Button>
                </div>
                <div>
                    {/* <Button variant="outline-primary">C. {this.props.QC}</Button> */}
                    <Button>C. {this.props.QC}</Button>
                </div>
            </li>
        );
    }
}

export default Question;