import React, { Component } from "react";
import { Button } from 'react-bootstrap';

// Employee Component
class Question extends Component {
    render() {
        return (
            <li className="question">
                <div>
                    <b>Title:</b> {this.props.title}
                </div>
                <div>
                    <Button variant="outline-primary">A. {this.props.QA}</Button>
                </div>
                <div>
                    <Button variant="outline-primary">B. {this.props.QB}</Button>
                </div>
                <div>
                    <Button variant="outline-primary">C. {this.props.QC}</Button>
                </div>
            </li>
        );
    }
}

export default Question;