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
      C: ""
    };
  }

  //connect to socket.io server
  socket = io("localhost:1235");
  //socket = io("103.89.85.105:1235");

  componentDidMount() {

    //listen event server broadcast question and show
    this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {
      $(".question").show();
      dataAPI.body = JSON.parse(dataAPI.body);
      this.setState({
        id : dataAPI.id, 
        title : dataAPI.title, 
        A : dataAPI.body.A, 
        B : dataAPI.body.B, 
        C : dataAPI.body.C
      });

      localStorage.setItem('idQuestion',dataAPI.id);
    })

    this.socket.on("SERVER_CHAT", (data) => {
      $("#content").append("<div style='color:white'>"+ data[1] + ": "+ data[0] +"</div>")
    });

    //listen event close question
    // socket.on('CLOSE_QUESTION', () => {
    //   console.log("CLOSE_QUESTION");
    //   $(".question").hide();
    // });

    // setTimeout(function () {
      //   $(".question").remove();
    // }, 10000)

  }

  sendMessage(data) {
    this.socket.emit("CLIENT_CHAT", data);
    $("#txtChat").val("");
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

        <div id="right">
          <input id="txtChat"  type="text"/>
          <input id="btnChat" type="button" value="Send" onClick={()=>this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])}/>

          <div id="content">
            
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage