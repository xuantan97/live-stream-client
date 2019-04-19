

import React, { Component } from "react";
import Question from './Question';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      A: "",
      B: "",
      C: ""
    };
  }

  componentDidMount() {
    fetch('http://bonddemo.tk/v1/question/render-question?difficulty=1',{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer lyWyy7-2EqXt6JOjKXnQV90Ghv94ie_5vO20rHFP',
            'Content-Type': 'text/plain'
        },
    })
    .then(res => res.json())
    .then(response => {
      response.body = JSON.parse(response.body);
      this.setState({
        id : response.id, 
        title : response.title, 
        A : response.body.A, 
        B : response.body.B, 
        C : response.body.C
      });
      
    })
    .catch(error => console.log(error));
  }


  render() {
    // Array of <Question>
    const qt = this.state;

    return (
      <div className="container-full">
        {/* <video
          preload="none"
          className="videoCanvas"
          ref={player => (this.player = player)}
          autoPlay={true}
        /> */}

        <div className="navbar">
          <div className="topnav" id="myTopnav">
            <a href="#home" className="active">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>

        <div className="content">
          <div className="video">video</div>

          <div className="question">
            <ul className="question-list">
              { <Question key={qt.id} title={qt.title} A={qt.A} B={qt.B} C={qt.C} /> }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App