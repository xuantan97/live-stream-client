import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
// Question Component
class Question extends Component {
    constructor(props){
        super(props);
        this.state={
            answerReturn:"",
            value: "",
            endpoint: "103.89.85.105:1235",
            exeConfirm: true,
            result: "",
            showResult: false,
        }
    }

    submitAnswer(event) {
        if(this.state.exeConfirm === true) {
            console.log(localStorage.getItem('email'));
            this.setState({
                value: event.target.value,
            });
            var form = new FormData();
            form.append('email', 'webmaster@example.com');
            form.append('answer', event.target.value);
            form.append('id',localStorage.getItem('idQuestion'));

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
                        this.setState({
                            answerReturn: response.answer,
                        });
                        if(response.result === "InCorrect"){
                            this.setState({
                                result: "Rất tiếc bạn đã trả lời sai !!!",
                            })
                        }else{
                            this.setState({
                                result: "Chúc mừng bạn đã trả lời đúng !!!",
                            })
                        }
                    })
                })
                .catch(error => console.log(error));
            console.log(localStorage.getItem('idQuestion'))
        }else{
            alert("Thời gian trả lời câu hỏi đã hết !!!");
        }
    }

    componentDidMount(){
        //connect to socket.io server
        const socket = io(this.state.endpoint);

        //listen event close question
        socket.on('CLOSE_QUESTION', () => {
            console.log("CLOSE_QUESTION");
            // $(".question").hide();
            this.setState({
                showResult: true,
                exeConfirm: false,
            });
        });
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
                {!this.state.exeConfirm && <div><span style={{color: '#ae5856'}}>Câu trả lời đúng : {this.state.answerReturn}</span></div>}
                {this.state.showResult && <span style={{color: '#ae5856'}}>{this.state.result}</span>}
            </li>
        );
    }
}

export default Question;