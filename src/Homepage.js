import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import WebRTCVideo from './WebRTC';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import ReactCountdownClock from 'react-countdown-clock';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat, FaYoutube, FaEnvelope, FaFacebookF } from 'react-icons/fa';


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
      showResult: false,
      isTrue: false
    };
  }


  componentDidMount() {
    $(".question").hide();
    $(".video-question").addClass("full-video");
    $(".countdown").hide();

    //listen event server broadcast question and show
    this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {
      $(".question").show();
      $(".countdown").show();
      $(".video-question").removeClass("full-video");
      $(".video-question").addClass("flex");
      $("#left").addClass("left");
      $("#right").addClass("right");
      $(".main-content").addClass("main-content-1");

      $('.question button').removeClass('button-focus');
      $('.question button').prop('disabled', false);

      $('.question button').mouseover(function(){
        $(this).addClass('hover');
      });
      $('.question button').mouseout(function(){
        $(this).removeClass('hover');
      });

      dataAPI.body = JSON.parse(dataAPI.body);
      this.setState({
        id : dataAPI.id,
        title : dataAPI.title,
        A : dataAPI.body.A,
        B : dataAPI.body.B,
        C : dataAPI.body.C,
        answering: "",
      });
      localStorage.setItem('idQuestion',dataAPI.id);
    })


    this.socket.on("SERVER_CHAT", (data) => {
      $("#content").append("<div style='color:#008afc; font-weight: 600; font-size: 20px'>"+ data[1] + ": <span style='color:#000; font-size: 18px'>"+ data[0] +"</span></div>")
    });


    this.socket.on('CLOSE_QUESTION', () => {
      //TODO
    });


    this.socket.on('RESPONSE_ANSWER_TO_CLIENT', (response) => {
       this.setState({
          showResult: true,
      });
      console.log(this.state.id);
      console.log(this.state.answering);
      console.log(response);

      if(response.id === this.state.id) {
        if(response.answer === this.state.answering){
          console.log("Right");
          this.setState({
            isTrue: true,
          });
        }
        else {
          console.log("Stupid");
          this.setState({
            isTrue: false,
          });
        }

        var dataSum = [this.state.id, this.state.isTrue];
        this.socket.emit("SUMMARY", dataSum);
        console.log(dataSum);
      }

    });
  }


  sendMessage(data) {
    this.socket.emit("CLIENT_CHAT", data);
    $("#txtChat").val("");
  }


  handleKeyPress(event) {
    if(event.key === 'Enter') {
      var data = [$("#txtChat").val(), localStorage.getItem('username')];
      this.socket.emit("CLIENT_CHAT", data);
      $("#txtChat").val("");
    }
  }

  async submitAnswer(event) {
    await this.setState({
        answering: event.target.value,
    });
    // $('.question button').unbind('mouseover');
    // $('.question button').unbind('mouseout');
    $('.question button').removeClass('hover');
    $(`button[value="${this.state.answering}"]`).addClass('button-focus').unbind('mouseover');
    $(`button[value!="${this.state.answering}"]`).prop('disabled', true);

    
}


  render() {
    let result = '';
    //if(this.state.showResult) {
        result += 'result';
    //}

    return (
      <div className="container-full">
        <div className="header" style={{width: '100%'}}>
          <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="#home" style={{color: '#008afc'}}><FaCat style={{fontSize: '22px', marginBottom: '0.5rem'}}/> &nbsp;Trivia Game</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: '20%'}}>
              <Nav className="mr-auto">
                <Nav.Link href="#home" style={{marginLeft: '15%'}}>Home</Nav.Link>
                <Nav.Link href="#link" style={{marginLeft: '15%'}}>About</Nav.Link>
                <Nav.Link href="#link" style={{marginLeft: '15%'}}>Contact</Nav.Link>
                

                <NavDropdown title={<FaUserAlt style={{fontSize: '20px'}}/>} id="basic-nav-dropdown" style={{marginLeft: '15%'}}>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="countdown">
                <ReactCountdownClock 
                  seconds={10}
                  color="#0cc"
                  alpha = {0.5}
                  size={50}
                  />
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="main">
          <img src="/bg2.jpg" alt=""/>
          
          <div className="main-content">
            <div className="head-title">LIVE STREAM TRIVIA GAME</div>
            <div className="video-question">
              <div id="left">
                <div className="content">
                  <div className="video">{<WebRTCVideo/>}</div>
                </div>
              </div>

              <div id="right">
                <div className="question">
                    <ul className="question-list">
                    <li className="question" style={{listStyle: 'none'}}>
                      <div className="question-content">
                          {this.state.title}
                      </div>
                      <div>
                          <button onClick={(event)=> this.submitAnswer(event)} value="A">A. {this.state.A}</button>
                      </div>
                      <div>
                          <button onClick={(event)=> this.submitAnswer(event)} value="B">B. {this.state.B}</button>
                      </div>
                      <div>
                          <button onClick={(event)=> this.submitAnswer(event)} value="C">C. {this.state.C}</button>
                      </div>
                      <div className={result}>
                          {this.state.showResult && <div><span style={{fontSize: '50px'}}>{this.state.answerReturn}</span></div>}
                          {this.state.showResult && <span>{this.state.result}</span>}
                      </div>
                  </li>
                    </ul>
                </div>
              </div>
            </div>         
          </div>
        </div>
        
        <div style={{width: '100%', height: '50px', marginTop: '10px', textAlign: 'center'}}>
          <img className="line" src="/line.png" alt="" style={{height: '50px'}}/>
        </div>

        <div className="chat">
          <div style={{border: 'none', borderBottom: '1px solid #333', marginBottom: '15px'}}></div>
          <div className="chat-title">COMMENT</div>
          <div className="chat-content">
            <div id="content"></div>
          </div>
          <div className="input-content">
            <input id="txtChat"  type="text" placeholder="Comment..." onKeyPress={(event)=>this.handleKeyPress(event)}/>
            <input id="btnChat" type="button" value="Comment" onClick={()=>this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])}/>
          </div>
          
          <div style={{border: 'none', borderBottom: '1px solid #333', paddingTop: '15px'}}></div>
        </div>
        <div className="footer">
          <div style={{margin: '20px 10% 0 10%'}}>
            <MDBFooter className="font-small pt-4 mt-4">
              <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                  <MDBCol md="4">
                    <h5 className="title">TRIVIA GAME</h5>
                    <ul className="w3_footer_grid_list" style={{padding: '0'}}>
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
                    <ul style={{padding: '0'}}>
                    <li className="list-unstyled">
                        <a href="#!"><FaYoutube/>&nbsp; Trivia Game</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!"><FaEnvelope/>&nbsp; abc@gmail.com</a>
                      </li>
                      <li className="list-unstyled">
                        <a href="#!"><FaFacebookF/>&nbsp; Trivia Game</a>
                      </li>
                    </ul>
                  </MDBCol>

                  <MDBCol md="4">
                    <h5 className="title">MOBILE APPS</h5>
                    <ul style={{padding: '0'}}>
                      <li className="list-unstyled">
                      <a href="#!">
                        <div>
                          <img src="/Google_Play.svg" className="img-responsive" alt=""/>
                        </div>
                      </a>
                        
                      </li>
                      <li className="list-unstyled">
                        <a href="#!">
                          <div>
                            <img src="/app.png" className="img-responsive" alt=""/>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <div className="footer-copyright text-center py-3" style={{background: '#343a40', borderTop: '1px solid #999'}}>
                <MDBContainer fluid>
                  &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
                </MDBContainer>
              </div>
            </MDBFooter>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage