import $ from "jquery";
import React, { Component } from "react";
import { Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaCat, FaYoutube, FaEnvelope, FaFacebookF, FaEdit, FaHandHoldingUsd, FaArrowAltCircleUp } from 'react-icons/fa';

class Profile extends Component {
    constructor(props) {
        super(props);
      }

      render() {
        $(document).ready(function() {
          
          var readURL = function(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();
      
                  reader.onload = function (e) {
                      $('.profile-pic').attr('src', e.target.result);
                  }
          
                  reader.readAsDataURL(input.files[0]);
              }
          }
         
          $(".file-upload").on('change', function(){
              readURL(this);
          });
          
          $(".upload-button").on('click', function() {
             $(".file-upload").click();
          });

          $.prototype.enable = function () {
            $.each(this, function (index, el) {
                $(el).removeAttr('disabled');
            });
        }
        
        $.prototype.disable = function () {
            $.each(this, function (index, el) {
                $(el).attr('disabled', 'disabled');
            });
        }

        // $('#email').disable();
        // $('#username').disable();

        // $('.edit-user').on('click', function() {
        //   $('#username').enable();
        // });

        // $('.edit-email').on('click', function() {
        //   $('#email').enable();
        // });


          $('#email').prop('value', 'abc@gmail.com');
          $('#username').prop('value', 'LOVE_CAT');
          
          $('#email').prop('disabled', true);
          $('#username').prop('disabled', true);


          $('.edit-user').on('click', function() {
            $('#username').prop('disabled', false);

          });

          $('.edit-email').on('click', function() {
            $('#email').prop('disabled', false);
          });
      });
        return (
          <div className="container-full">
            <div className="header" style={{ width: '100%' }}>
              <Navbar bg="dark" expand="lg" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Navbar.Brand href="#home" style={{ color: '#008afc' }}><FaCat style={{ fontSize: '22px', marginBottom: '0.5rem' }} /> &nbsp;Trivia Game</Navbar.Brand>
                    <NavDropdown title={<FaUserAlt style={{ fontSize: '20px' }} />} id="basic-nav-dropdown">
                      <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
                    </NavDropdown>
              </Navbar>
            </div>


            <div className="profile-wrapper">
                <div className="profile">
                    <div className="profile-content">
                        <h1>PROFILE</h1>
                        <form action>
                        {/* Photo */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="avatar">Your Photo</label>
                            </div>
                            <div className="grid-65">
                            {/* <span className="photo" title="Upload your Avatar!" />
                            <input type="file" className="btn" /> */}
                            <div className="avatar-wrapper" style={{marginLeft: '10%'}}>
                                <img className="profile-pic" src="" />
                                <div className="upload-button">
                                <FaArrowAltCircleUp className="fa fa-arrow-circle-up" aria-hidden="true"/>
                                </div>
                                <input className="file-upload" type="file" accept="image/*"/>
                            </div>
                            </div>
                        </fieldset>
                        {/* User Name */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="username">User Name</label>
                            </div>
                            <div className="grid-65">
                            <input type="text" id="username" tabIndex={1}/>
                            <span className="edit-user"><FaEdit/></span>
                            </div>
                        </fieldset>
                        {/* Email */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="email">Email Address</label>
                            </div>
                            <div className="grid-65">
                            <input type="email" id="email" tabIndex={2}/>
                            <span className="edit-email"><FaEdit/></span>
                            </div>
                        </fieldset>
                        {/* School */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="balance">Balance</label>
                            </div>
                            <div className="grid-65">
                            <input type="text" id="balance" tabIndex={3} value="2000" disabled/>
                            <span className="edit-user"><FaHandHoldingUsd/></span>
                            </div>
                        </fieldset>         

                        <fieldset>
                            <input type="button" className="Btn cancel" value="Cancel" />
                            <input type="submit" className="Btn" value="Update" />
                            
                        </fieldset>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="footer" style={{marginTop: '-25px'}}>
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
            </div> */}
          </div>
        );
    }
}

export default Profile;