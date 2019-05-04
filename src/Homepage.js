import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import Question from './Question';
import WebRTCVideo from './WebRTC';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      A: "",
      B: "",
      C: "",
      endpoint: "103.89.85.105:1235"
    };
  }

  componentDidMount() {
    //connect to socket.io server
    const socket = io(this.state.endpoint);

    //listen event server broadcast question and show
    socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {
      dataAPI.body = JSON.parse(dataAPI.body);
      this.setState({
        id : dataAPI.id, 
        title : dataAPI.title, 
        A : dataAPI.body.A, 
        B : dataAPI.body.B, 
        C : dataAPI.body.C
      });
    })

    //listen event close question
   
    // socket.on('CLOSE_QUESTION', () => {
    //   console.log("CLOSE_QUESTION");
    //   $(".question").remove();
    // });
    // setTimeout(function () {
      //   $(".question").remove();
    // }, 10000)

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
          <div className="video">{<WebRTCVideo/>}</div>

          <div className="question">
            <ul className="question-list">
              { <Question key={qt.id} title={qt.title} QA={qt.A} QB={qt.B} QC={qt.C} /> }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage