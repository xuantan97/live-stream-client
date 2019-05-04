import React, { Component } from "react";
import { Button } from 'react-bootstrap';

// Question Component
class Question extends Component {

    submitAnswer(event) {
        var form = new FormData();
        form.append('email', 'tanphan0805@gmail.com');
        form.append('answer', event.target.value);

        fetch('http://bonddemo.tk/v1/question/check-answer', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer lyWyy7-2EqXt6JOjKXnQV90Ghv94ie_5vO20rHFP',
            },
            body: form
        })
        .then(res => {
            res.json().then(response => {
                console.log(response);
            })
        })
        .catch(error => console.log(error));
    }


    render() {
        return (
            <li className="question" style={{listStyle: 'none'}}>
                <div className="question-content">
                    <b>Title:</b> {this.props.title}
                </div>
                <div>
                    <Button onClick={(event)=> this.submitAnswer(event)} value="A">A. {this.props.QA}</Button>
                </div>
                <div>
                    <Button onClick={(event)=> this.submitAnswer(event)} value="B">B. {this.props.QB}</Button>
                </div>
                <div>
                    <Button onClick={(event)=> this.submitAnswer(event)} value="C">C. {this.props.QC}</Button>
                </div>
            </li>
        );
    }
}

export default Question;