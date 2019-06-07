import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import WebRTCVideo from './WebRTC';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat, FaYoutube, FaEnvelope, FaFacebookF, FaPaperPlane, FaCheck, FaTimes } from 'react-icons/fa';
import 'css-doodle';


class Homepage extends Component {
  constructor(props) {
    super(props);
    // this.socket = io("localhost:1235");
    this.socket = io("103.89.85.105:1235");
    this.state = {
      id: "",
      title: "",
      A: "",
      B: "",
      C: "",
      D: "",
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
    $('.head-title').show();
    $('.countdown').hide();
    $('.summary').hide();
    $('.win').hide();
    // $('button.btn-answer').mouseover(function () {
    //   $(this).addClass('hover');
    // });
    // $('button.btn-answer').mouseout(function () {
    //   $(this).removeClass('hover');
    // });
    $('button.btn-answer').mouseover(function () {
      var x = $(this).val();
      $(this).addClass('hover-' + x);
    });
    $('button.btn-answer').mouseout(function () {
      var x = $(this).val();
      $(this).removeClass('hover-' + x);
    });

    //listen event server broadcast question and show
    this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {

      this.setState({seconds: 12});

      $('.question-content').show();
      $('.head-title').hide();
      $('.countdown').show();
      $('.welcome').hide();
      $('button.btn-answer').removeClass('button-focus');
      $('button.btn-answer').removeClass('right-answer');
      $('button.btn-answer').removeClass('wrong-answer');
      $('button.btn-answer').removeClass('disable-color');

      // $('button.btn-answer').addClass('hover');
      $('button.btn-answer').prop('disabled', false);

      $('button.btn-answer').mouseover(function () {
        var x = $(this).val();
        $(this).addClass('hover-' + x);
      });
      $('button.btn-answer').mouseout(function () {
        var x = $(this).val();
        $(this).removeClass('hover-' + x);
      });

      dataAPI.response.body = JSON.parse(dataAPI.response.body);
      this.setState({
        id: dataAPI.response.id,
        title: dataAPI.response.title,
        A: dataAPI.response.body.A,
        B: dataAPI.response.body.B,
        C: dataAPI.response.body.C,
        D: dataAPI.response.body.D,
        answering: "",
        program_id: dataAPI.program_id
      });
      localStorage.setItem('idQuestion', dataAPI.response.id);

      var totaltime = 10;
      function update(percent){
        var deg;
        if(percent<(totaltime/2)){
          deg = 90 + (360*percent/totaltime);
            $('.pie').css('background-image',
                      'linear-gradient('+deg+'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
                    );
        } else if(percent>=(totaltime/2)){
                deg = -90 + (360*percent/totaltime);

                $('.pie').css('background-image',
                      'linear-gradient('+deg+'deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)'
                    );
                }
      }
      var count = 10;
      var myCounter = setInterval(function () {
        count-=1;
        $('#time').html(count);
          update(count);
        
        if(count==0) clearInterval(myCounter);
      }, 1000);
    })


    this.socket.on("SERVER_CHAT", (data) => {
      $("#content").append("<div style='color:#008afc; font-weight: 600; font-size: 20px'>" + data[1] + ": <span style='color:#000; font-size: 18px'>" + data[0] + "</span></div>");
      $('.chat-content').animate({ scrollTop: $('.chat-content').get(0).scrollHeight }, 200);
    });


    this.socket.on('CLOSE_QUESTION', () => {
      $('button.btn-answer').removeClass('hover-A hover-B hover-C');
      $('button.btn-answer').prop('disabled', true);
      $(`button[value!="${this.state.answering}"]`).addClass('disable-color');
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
        $('.welcome').hide();
        $('.countdown').hide();
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
    $('.question button').removeClass('hover-A hover-B hover-C');
    // $(`button[value="${this.state.answering}"]`).addClass('button-focus').unbind('mouseover');
    $(`button[value="${this.state.answering}"]`).unbind('mouseover');
    // $(`button[value!="${this.state.answering}"]`).prop('disabled', true);
    $(`button[value!="${this.state.answering}"]`).addClass('disable-color');
    $('button.btn-answer').removeClass('hover-A hover-B hover-C');
    $('button.btn-answer').prop('disabled', true);
  }


  logout() {
    localStorage.clear();
    this.props.history.push('/');
  }


  render() {
    return (
      <div className="container-full">
        <div style={{background: '#cc9', postition: 'relative'}}>
        
          <div className="question-container">
            <div className="head-title">LIVE STREAM TRIVIA GAME</div>
            <div className="question-content">
              <div>
              Câu {this.state.program_id}:
              </div>
              {this.state.title}
              
            </div>

            <span style={{position: 'absolute', top: '0', right: '0'}}>
              <NavDropdown title={<FaUserAlt style={{ fontSize: '20px' }} />} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
                </NavDropdown>
                </span>
          </div>
          <div className="container-fluid text-center">    
            <div className="row content">
              <div className="col-sm-3 sidenav summary-welcome">
                <div className="countdown">
                  <div className="pie degree">
                    <span className="block"></span>
                    <span id="time">10</span>
                  </div>
                </div>
                <div className="welcome">
                  <span style={{ marginTop: '20px', marginBottom: '-20px'}}>CHÀO MỪNG ĐẾN VỚI TRIVIA GAME</span> <br/>
                  <span style={{color: '#d0f'}}>CHÚC BẠN<br/>CHƠI GAME VUI VẺ!!</span>
                  <img src="/monkey.png"
                    style={{width: '100px', height: '100px', display: 'block'}}/>
                </div>
                <div className="summary">
                  <div className="summary-title" style={{margin: '30px 10px', fontSize: '30px'}}>TỔNG KẾT CÂU {this.state.program_id}</div>
                  <div>
                      {/* <label>Total correct: </label> */}
                      <span style={{color: '#31d106', marginRight: '10px', marginLeft: '-5px'}}><FaCheck/></span>
                      <span id="summary-correct" style={{color: '#31d106'}}>113</span>
                  </div>
                  <div>
                      {/* <label>Total incorrect: </label> */}
                      <span style={{color: '#f00', marginRight: '10px', marginLeft: '-5px'}}><FaTimes/></span>
                      <span id="summary-incorrect" style={{color: '#f00'}}>113</span>
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
                  <button onClick={(event) => this.submitAnswer(event)} value="A" className="btn-answer">A. {this.state.A}</button>
                </div>
              </div>
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="B" className="btn-answer">B. {this.state.B}</button>
                </div>
              </div>
            </div>
            <div className="row row-answer">
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="C" className="btn-answer">C. {this.state.C}</button>
                </div>
              </div>
              <div className="col-sm-6 answer">
                <div className="answer-1">
                  <button onClick={(event) => this.submitAnswer(event)} value="D" className="btn-answer">D. {this.state.D}</button>
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