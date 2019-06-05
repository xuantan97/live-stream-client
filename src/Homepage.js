import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import WebRTCVideo from './WebRTC';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat, FaYoutube, FaEnvelope, FaFacebookF, FaPaperPlane } from 'react-icons/fa';
import 'css-doodle';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.socket = io("localhost:1235");
    // this.socket = io("103.89.85.105:1235");
    this.state = {
      id: "",
      title: "",
      A: "",
      B: "",
      C: "",
      answering: "",
      current_id: "",
      result: "",
      isTrue: false,
      isWin: 10,
      seconds: 12,
      program_id: 0
    };
  }


  async componentDidMount() {
    $('.question-content').hide();
    // $('.summary').hide();
    $('.win').hide();
    $('button.btn-answer').mouseover(function () {
      $(this).addClass('hover');
    });
    $('button.btn-answer').mouseout(function () {
      $(this).removeClass('hover');
    });

    //listen event server broadcast question and show
    this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {

      this.setState({seconds: 12});

      $('.question-content').show();
      $('button.btn-answer').removeClass('button-focus');
      $('button.btn-answer').removeClass('right-answer');
      $('button.btn-answer').removeClass('wrong-answer');
      $('button.btn-answer').prop('disabled', false);

      dataAPI.response.body = JSON.parse(dataAPI.response.body);
      this.setState({
        id: dataAPI.response.id,
        title: dataAPI.response.title,
        A: dataAPI.response.body.A,
        B: dataAPI.response.body.B,
        C: dataAPI.response.body.C,
        answering: "",
        program_id: dataAPI.program_id
      });
      localStorage.setItem('idQuestion', dataAPI.response.id);

      //countdown timer
      this.timer =  setInterval(()=> {
        this.setState({seconds: this.state.seconds - 1});
        if (this.state.seconds === 0) { 
          clearInterval(this.timer);
        }
      }, 1000)
      
    })


    this.socket.on("SERVER_CHAT", (data) => {
      $("#content").append("<div style='color:#008afc; font-weight: 600; font-size: 20px'>" + data[1] + ": <span style='color:#000; font-size: 18px'>" + data[0] + "</span></div>");
      $('.chat-content').animate({ scrollTop: $('.chat-content').get(0).scrollHeight }, 200);
    });


    this.socket.on('CLOSE_QUESTION', () => {
      $('button.btn-answer').removeClass('hover');
      $('button.btn-answer').prop('disabled', true);
    });


    this.socket.on('RESPONSE_ANSWER_TO_CLIENT', async (data) => {
      if (data.response.id === this.state.id) {
        if (data.response.answer === this.state.answering) {
          $(`button[value="${data.response.answer}"]`).addClass('right-answer');
          await this.setState({
            isTrue: true,
            isWin: this.state.isWin - 1
          });
        }
        else {
          $(`button[value="${data.response.answer}"]`).addClass('right-answer');
          $(`button[value="${this.state.answering}"]`).addClass('wrong-answer');
          await this.setState({
            isTrue: false
          });
        }

        var dataSum = await [this.state.id, this.state.isTrue];
        await this.socket.emit("SUMMARY", dataSum);
        $('.summary').show();
        //emit winner
        if(data.program_id === 10) {
          if(this.state.isWin === 0) {
            var user_id = localStorage.getItem('user_id');
            var username = localStorage.getItem('username');
            var email = localStorage.getItem('email');
  
            var winner = [user_id, username, email];
            this.socket.emit("WINNER", winner);
          }
        }
      }
    });


    this.socket.on("STATISTIC", (statistic) => {
      $('#summary-correct').html(statistic.right);
      $('#summary-incorrect').html(statistic.wrong);
  });


    this.socket.on('END_GAME_TO_CLIENT', (dataEndGame) => {
      $(".question").hide();
      $(".countdown").hide();
      $(".video-question").addClass("full-video");
      $(".video-question").removeClass("flex");
      $("#left").removeClass("left");
      $("#right").removeClass("right");
      $(".main-content").removeClass("main-content-1");

      console.log(dataEndGame);
      $('.win').append(`<style>.win:before{content:'${dataEndGame[2]}$' !important} .win:after{content:'${dataEndGame[2]}$' !important}</style>`);
      if(this.state.isWin === 0) {
        $('.win').show();
        setTimeout(function() {
          $('.win').fadeOut("slow");
        }, 15000);
      }
    });
  }


  sendMessage(data) {
    if(data[0] !== "") {
      this.socket.emit("CLIENT_CHAT", data);
      $("#txtChat").val("");
    }
  }


  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if($("#txtChat").val() !== "") {
        var data = [$("#txtChat").val(), localStorage.getItem('username')];
        this.socket.emit("CLIENT_CHAT", data);
        $("#txtChat").val("");
      }
    }
  }

  async submitAnswer(event) {
    await this.setState({
      answering: event.target.value,
    });
    $('.question button').removeClass('hover');
    $(`button[value="${this.state.answering}"]`).addClass('button-focus').unbind('mouseover');
    $(`button[value!="${this.state.answering}"]`).prop('disabled', true);
  }


  logout() {
    localStorage.clear();
    this.props.history.push('/');
  }


  render() {
    return (
      <div className="container-full">
        <div style={{background: '#f1f1f1'}}>
          <div className="question-container">
            <div className="question-content">
              <div>
              Câu {this.state.program_id}:
              </div>
              {this.state.title}
            </div>
          </div>
          <div className="container-fluid text-center">    
            <div className="row content">
              <div className="col-sm-3 sidenav" style={{width: '100%', height: '100%'}}>
                <div className="summary">
                  <div className="summary-title" style={{margin: '30px 10px', fontSize: '35px'}}>SUMMARY</div>
                  <div>
                      <label>Total correct: </label>
                      <div id="summary-correct" style={{color: '#006fcb'}}>113</div>
                  </div>
                  <div>
                      <label>Total incorrect: </label>
                      <div id="summary-incorrect" style={{color: '#f39'}}>113</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 text-left video"> 
                <WebRTCVideo/>
              </div>
              <div className="col-sm-3 sidenav">
                <div style={{background: '#00f', width: '100%', height: '100%'}}>
                  <div className="chat-content">
                    <div id="content"></div>
                  </div>
                  <div className="input-content">
                    <input id="txtChat" type="text" placeholder="Comment..." onKeyPress={(event) => this.handleKeyPress(event)} />
                    <span id="btnChat" onClick={() => this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])}><FaPaperPlane/></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="answer-container">
            <div className="row row-answer">
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="A" class="btn-answer">A. {this.state.A}</button>
                </div>
              </div>
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="B" class="btn-answer">B. {this.state.B}</button>
                </div>
              </div>
            </div>
            <div className="row row-answer">
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="C" class="btn-answer">C. {this.state.C}</button>
                </div>
              </div>
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="D" class="btn-answer">D. {this.state.D}</button>
                </div>              
              </div>
            </div>
          </div>
          </div>

        <div className="win">
          <css-doodle grid="5">
          {`
          :doodle {
            @grid: 10 / 100%; 
          }
          background: @pick(
            #ff0, #ff6, #ffd700, #ee0
          );

          transform: translate(
            @rand(-50vw, 50vw),
            @rand(-50vh, 50vh)
          );

          @size: 3.5vmin;
          @shape: star;
          @place-cell: 50% 50%;

          animation-name: explosion;
          animation-iteration-count: infinite;
          animation-direction: reverse;
          animation-duration: calc(@rand(2s, 5s, .1));
          animation-delay: calc(@rand(-5s, -1s, .1));
          animation-timing-function: 
            cubic-bezier(.84, .02, 1, 1);

           @keyframes explosion {
              0% { opacity: 0; }
              70% { opacity: 1; }
              100% { transform: translate(0, 0); }
            }
          `}
          </css-doodle>
        </div>
      </div>
    );
  }
}

export default Homepage;