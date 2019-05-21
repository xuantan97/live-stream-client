import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import Question from './Question';
import WebRTCVideo from './WebRTC';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, } from 'react-bootstrap';
import { Chat } from 'react-chat-popup';
import ReactCountdownClock from 'react-countdown-clock';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat } from 'react-icons/fa';


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
  // socket = io("localhost:1235");
  socket = io("103.89.85.105:1235");

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
      $("#content").append("<div style='color:#7c7c7d'>"+ data[1] + ": <span style='color:#000'>"+ data[0] +"</span></div>")
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
        {/* <div className="App" style={{position: 'relative'}}>
          <Chat />
        </div> */}
        {/* <video
          preload="none"
          className="videoCanvas"
          ref={player => (this.player = player)}
          autoPlay={true}
        /> */}
        <div className="header" style={{width: '100%'}}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home" style={{color: '#008afc'}}><FaCat style={{fontSize: '22px', marginBottom: '0.5rem'}}/> &nbsp;Trivia Game</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: '25%'}}>
              <Nav className="mr-auto">
                <Nav.Link href="#home" style={{marginLeft: '15%'}}>Home</Nav.Link>
                <Nav.Link href="#link" style={{marginLeft: '15%'}}>Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{marginLeft: '15%'}}>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<FaUserAlt style={{fontSize: '20px'}}/>} id="basic-nav-dropdown" style={{marginLeft: '15%'}}>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="countdown">
                <ReactCountdownClock seconds={10}
                  color="#0cc"
                  alpha = {0.5}
                  size={50}
                  />
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="main">
          <img src="/bg.jpg"/>
          
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
                      { <Question key={qt.id} title={qt.title} QA={qt.A} QB={qt.B} QC={qt.C} /> }
                    </ul>
                </div>
              </div>
            </div>         
          </div>
        </div>
        
        <div style={{width: '100%', height: '50px', marginTop: '10px', textAlign: 'center'}}>
          <img src="/line.png" style={{height: '50px'}}/>
        </div>

        <div className="chat">
          <div style={{border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: '15px'}}></div>
          <div className="chat-title">COMMENT</div>
          <div className="chat-content">
            <div id="content"></div>
          </div>
          <div className="input-content">
            <input id="txtChat"  type="text" placeholder="Comment..."/>
            <input id="btnChat" type="button" value="Comment" onClick={()=>this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])}/>
          </div>
          
          <div style={{border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '15px'}}></div>
        </div>
        <div className="footer">
          <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
              <MDBRow>
                <MDBCol md="5">
                  <h5 className="title">FOOTER CONTENT</h5>
                  <p>
                    Here you can use rows and columns here to organize your footer
                    content.
                  </p>
                </MDBCol>
                <MDBCol md="3">
                  <h5 className="title">LINKS</h5>
                  <ul style={{padding: '0'}}>
                    <li className="list-unstyled">
                      <a href="#!">Link 1</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 2</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 3</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 4</a>
                    </li>
                  </ul>
                </MDBCol>

                <MDBCol md="3">
                  <h5 className="title">LINKS</h5>
                  <ul style={{padding: '0'}}>
                    <li className="list-unstyled">
                      <a href="#!">Link 1</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 2</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 3</a>
                    </li>
                    <li className="list-unstyled">
                      <a href="#!">Link 4</a>
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3" style={{background: '#cccfd1'}}>
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
              </MDBContainer>
            </div>
          </MDBFooter>
        </div>
      </div>
    );
  }
}

export default Homepage