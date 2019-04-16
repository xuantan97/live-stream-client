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
                    <Button variant="outline-primary">A. {this.props.A}</Button>
                </div>
                <div>
                    <Button variant="outline-primary">B. {this.props.B}</Button>
                </div>
                <div>
                    <Button variant="outline-primary">C. {this.props.C}</Button>
                </div>
            </li>
        );
    }
}

export default Question;