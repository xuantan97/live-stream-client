import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import WebRTCVideo from './WebRTC';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat, FaYoutube, FaEnvelope, FaFacebookF } from 'react-icons/fa';
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
      answering: "",
      current_id: "",
      result: "",
      isTrue: false,
      isWin: 10,
      seconds: 12
    };
  }


  async componentDidMount() {

    $(".question").hide();
    $(".video-question").addClass("full-video");
    $(".countdown").hide();
    $('.win').hide();

    //listen event server broadcast question and show
    this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {

      this.setState({seconds: 12});

      $(".question").show();
      $(".countdown").show();
      $(".video-question").removeClass("full-video");
      $(".video-question").addClass("flex");
      $("#left").addClass("left");
      $("#right").addClass("right");
      $(".main-content").addClass("main-content-1");

      $('.question button').removeClass('button-focus');
      $('.question button').removeClass('right-answer');
      $('.question button').removeClass('wrong-answer');


      $('.question button').prop('disabled', false);

      $('.question button').mouseover(function () {
        $(this).addClass('hover');
      });
      $('.question button').mouseout(function () {
        $(this).removeClass('hover');
      });

      dataAPI.body = JSON.parse(dataAPI.body);
      this.setState({
        id: dataAPI.id,
        title: dataAPI.title,
        A: dataAPI.body.A,
        B: dataAPI.body.B,
        C: dataAPI.body.C,
        answering: "",
      });
      localStorage.setItem('idQuestion', dataAPI.id);

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
      $('.question button').removeClass('hover');
      $('.question button').prop('disabled', true);
    });


    this.socket.on('RESPONSE_ANSWER_TO_CLIENT', async (response) => {
      if (response[0].id === this.state.id) {
        if (response[0].answer === this.state.answering) {
          $(`button[value="${response[0].answer}"]`).addClass('right-answer');
          await this.setState({
            isTrue: true,
            isWin: this.state.isWin - 1
          });
        }
        else {
          $(`button[value="${response[0].answer}"]`).addClass('right-answer');
          $(`button[value="${this.state.answering}"]`).addClass('wrong-answer');
          await this.setState({
            isTrue: false
          });
        }

        var dataSum = await [this.state.id, this.state.isTrue];
        await this.socket.emit("SUMMARY", dataSum);

        //emit winner
        if(response[1] === 10) {
          if(this.state.isWin === 0) {
            var user_id = localStorage.getItem('user_id');
            var username = localStorage.getItem('username');
            var email = localStorage.getItem('email');
  
            var data = [user_id, username, email];
            this.socket.emit("WINNER", data);

            console.log("winner");
          }
        }
      }
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

      if(this.state.isWin === 0) {
        $('.win').show();
        setTimeout(function() {
          $('.win').fadeOut("slow");
        }, 4000);
      }
    });
  }


  sendMessage(data) {
    this.socket.emit("CLIENT_CHAT", data);
    $("#txtChat").val("");
  }


  handleKeyPress(event) {
    if (event.key === 'Enter') {
      var data = [$("#txtChat").val(), localStorage.getItem('username')];
      this.socket.emit("CLIENT_CHAT", data);
      $("#txtChat").val("");
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
        <div className="header" style={{ width: '100%' }}>
          <Navbar bg="dark" expand="lg" style={{display: 'flex', justifyContent: 'space-between'}}>
            <Navbar.Brand href="#home" style={{ color: '#008afc' }}><FaCat style={{ fontSize: '22px', marginBottom: '0.5rem' }} /> &nbsp;Trivia Game</Navbar.Brand>
                <NavDropdown title={<FaUserAlt style={{ fontSize: '20px' }} />} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
                </NavDropdown>
          </Navbar>
        </div>

        <div className="main">
          <img src="/bg2.jpg" alt="" />

          <div className="main-content">
            <div className="head-title">LIVE STREAM TRIVIA GAME</div>
            <div className="video-question">
              <div id="left">
                <div className="content">
                  <div className="video">{<WebRTCVideo />}</div>
                </div>
              </div>

              <div id="right">
                <div className="question">
                  <ul className="question-list">
                    <li className="question" style={{ listStyle: 'none', position: 'relative' }}>
                      <span className="timer">Time: {this.state.seconds}</span>
                      <div className="question-content">
                        {this.state.title}
                      </div>
                      <div>
                        <button onClick={(event) => this.submitAnswer(event)} value="A">A. {this.state.A}</button>
                      </div>
                      <div>
                        <button onClick={(event) => this.submitAnswer(event)} value="B">B. {this.state.B}</button>
                      </div>
                      <div>
                        <button onClick={(event) => this.submitAnswer(event)} value="C">C. {this.state.C}</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '50px', marginTop: '10px', textAlign: 'center' }}>
          <img className="line" src="/line.png" alt="" style={{ height: '50px' }} />
        </div>

        <div className="chat">
          <div style={{ border: 'none', borderBottom: '1px solid #333', marginBottom: '15px' }}></div>
          <div className="chat-title">COMMENT</div>
          <div className="chat-content">
            <div id="content"></div>
          </div>
          <div className="input-content">
            <input id="txtChat" type="text" placeholder="Comment..." onKeyPress={(event) => this.handleKeyPress(event)} />
            <input id="btnChat" type="button" value="Comment" onClick={() => this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])} />
          </div>

          <div style={{ border: 'none', borderBottom: '1px solid #333', paddingTop: '15px' }}></div>
        </div>
        <div className="footer">
          <div style={{ margin: '20px 10% 0 10%' }}>
            <MDBFooter className="font-small pt-4 mt-4">
              <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                  <MDBCol md="4">
                    <h5 className="title">TRIVIA GAME</h5>
                    <ul className="w3_footer_grid_list" style={{ padding: '0' }}>
                      <li className="list-unstyled">
                        <a href="#!">Home</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!">About</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!">Contact</a>
                      </li>
                    </ul>
                  </MDBCol>
                  <MDBCol md="4">
                    <h5 className="title">CONTACT</h5>
                    <ul style={{ padding: '0' }}>
                      <li className="list-unstyled">
                        <a href="#!"><FaYoutube />&nbsp; Trivia Game</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!"><FaEnvelope />&nbsp; abc@gmail.com</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!"><FaFacebookF />&nbsp; Trivia Game</a>
                      </li>
                    </ul>
                  </MDBCol>

                  <MDBCol md="4">
                    <h5 className="title">MOBILE APPS</h5>
                    <ul style={{ padding: '0' }}>
                      <li className="list-unstyled">
                        <a href="#!">
                          <div>
                            <img src="/Google_Play.svg" className="img-responsive" alt="" />
                          </div>
                        </a>

                      </li>
                      <li className="list-unstyled">
                        <a href="#!">
                          <div>
                            <img src="/app.png" className="img-responsive" alt="" />
                          </div>
                        </a>
                      </li>
                    </ul>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <div className="footer-copyright text-center py-3" style={{ background: '#343a40', borderTop: '1px solid #999' }}>
                <MDBContainer fluid>
                  &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
                </MDBContainer>
              </div>
            </MDBFooter>
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

export default Homepage