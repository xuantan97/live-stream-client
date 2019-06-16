import $ from "jquery";
import React, { Component } from "react";
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaUserAlt, FaTimes, FaList, FaEdit, FaHandHoldingUsd, FaArrowAltCircleUp } from 'react-icons/fa';
import Footer from './Footer';

class Profile extends Component {
    constructor(props) {
        super(props);
      }

      logout() {
        localStorage.clear();
        this.props.history.push('/');
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


          $('#email').prop('value', `${localStorage.getItem('email')}`);
          $('#username').prop('value', `${localStorage.getItem('username')}`);
          
          $('#email').prop('disabled', true);
          $('#username').prop('disabled', true);


          $('.edit-user').on('click', function() {
            $('#username').prop('disabled', false);

          });

          $('.edit-email').on('click', function() {
            $('#email').prop('disabled', false);
          });

          $('.sticky-wrapper').addClass('is-sticky');
          $('.js-sticky-header').addClass('shrink');
          $(window).bind('scroll', function(e) {
            var top = $(window).scrollTop();
            if(top < 100) {
              $('.sticky-wrapper').addClass('is-sticky');
              $('.js-sticky-header').addClass('shrink');
            }
          });  

          $('.site-menu a').bind('mouseover', function(e) {
            if(!$(this).hasClass('site-menu-focus')) {
              $(this).addClass('nav-hover');
            }
          });
          
          $('.site-menu a').bind('mouseout', function(e) {
            $(this).removeClass('nav-hover');
          });

          $('.basic-nav-dropdown').bind('mouseover', function(e) {
            $('.site-menu svg path').addClass('user-hover');
          });
          
          $('.basic-nav-dropdown').bind('mouseout', function(e) {
            $('.site-menu svg path').removeClass('user-hover');
          });
    
          var siteMenuClone = function() {
            // $('.js-clone-nav').each(function() {
            //   var $this = $(this);
            //   $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
            // });
        
        
            setTimeout(function() {
              
              var counter = 0;
              $('.site-mobile-menu .has-children').each(function(){
                var $this = $(this);
                
                $this.prepend('<span class="arrow-collapse collapsed">');
        
                $this.find('.arrow-collapse').attr({
                  'data-toggle' : 'collapse',
                  'data-target' : '#collapseItem' + counter,
                });
        
                $this.find('> ul').attr({
                  'class' : 'collapse',
                  'id' : 'collapseItem' + counter,
                });
        
                counter++;
        
              });
        
            }, 1000);
        
            $('body').on('click', '.arrow-collapse', function(e) {
              var $this = $(this);
              if ( $this.closest('li').find('.collapse').hasClass('show') ) {
                $this.removeClass('active');
              } else {
                $this.addClass('active');
              }
              e.preventDefault();  
              
            });
        
            $(window).resize(function() {
              var $this = $(this),
                w = $this.width();
        
              if ( w > 768 ) {
                if ( $('body').hasClass('offcanvas-menu') ) {
                  $('body').removeClass('offcanvas-menu');
                }
              }
            })
        
            $('body').on('click', '.js-menu-toggle', function(e) {
              var $this = $(this);
              e.preventDefault();
        
              if ( $('body').hasClass('offcanvas-menu') ) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
              } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
              }
            }) 
        
            // click outisde offcanvas
            $(document).mouseup(function(e) {
              var container = $(".site-mobile-menu");
              if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ( $('body').hasClass('offcanvas-menu') ) {
                  $('body').removeClass('offcanvas-menu');
                }
              }
            });
          }; 
          siteMenuClone();
      });
        return (
          <div className="site-wrap">
            <div className="site-mobile-menu site-navbar-target">
                  <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                      <span><FaTimes className="icon-close2 js-menu-toggle"/></span>
                    </div>
                  </div>
                  {/* <div className="site-mobile-menu-body" /> */}
                  <div className="site-mobile-menu-body">
                    <ul className="site-nav-wrap">
                      <li><Link to="/homepage">Trang chủ</Link></li>
                      <li><Link to="/aboutus" className="site-menu-focus aboutus">Chúng tôi</Link></li>
                      <li><Link to="/game">Trò chơi</Link></li>
                      <li><Link to="/contact">Liên hệ</Link></li>
                      <li><Link to="/history">Lịch sử</Link></li>
                      <li>
                      <NavDropdown title={<FaUserAlt style={{ fontSize: '16px', marginBottom: '5px' }} />} className="basic-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
                      </NavDropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="sticky-wrapper" className="sticky-wrapper">
                <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner"
                    style={{width: '100%', position: 'fixed', top: '0px', transition: '0.5s'}}>
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-6 col-xl-2">
                        <h1 className="mb-0 site-logo"><Link className="h2 mb-0" to="/homepage">Trivia<span>Game</span></Link></h1>
                      </div>
                      <div className="col-12 col-md-10 d-none d-xl-block">
                        <nav className="site-navigation position-relative text-right" role="navigation">
                          <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                            <li><Link to="/homepage">Trang chủ</Link></li>
                            <li><Link to="/aboutus" className="site-menu-focus aboutus">Chúng tôi</Link></li>
                            <li><Link to="/game">Trò chơi</Link></li>
                            <li><Link to="/contact">Liên hệ</Link></li>
                            <li><Link to="/history">Lịch sử</Link></li>
                            <li>
                            <NavDropdown title={<FaUserAlt style={{ fontSize: '16px', marginBottom: '5px' }} />} className="basic-nav-dropdown">
                              <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Profile</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
                            </NavDropdown>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{position: 'relative', top: '3px'}}><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span><FaList className="icon-menu h3"/></span></a></div>
                    </div>
                  </div>
                </header>
                </div>


            <div className="profile-wrapper">
                <div className="profile">
                    <div className="profile-content">
                        <h1 style={{color: '#3a4971'}}>Thông tin cá nhân</h1>
                        <form action>
                        {/* Photo */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="avatar">Hình ảnh</label>
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
                            <label htmlFor="username">Tên</label>
                            </div>
                            <div className="grid-65">
                            <input type="text" id="username" tabIndex={1}/>
                            <span className="edit-user" title="Chỉnh sửa tên"><FaEdit/></span>
                            </div>
                        </fieldset>
                        {/* Email */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="email">Email</label>
                            </div>
                            <div className="grid-65">
                            <input type="email" id="email" tabIndex={2}/>
                            <span className="edit-email" title="Chỉnh sửa email"><FaEdit/></span>
                            </div>
                        </fieldset>
                        {/* School */}
                        <fieldset>
                            <div className="grid-35">
                            <label htmlFor="balance">Số dư tài khoản</label>
                            </div>
                            <div className="grid-65">
                            <input type="text" id="balance" tabIndex={3} value="2000" disabled/>
                            <span className="edit-user" title="Rút tiền"><FaHandHoldingUsd/></span>
                            </div>
                        </fieldset>         

                        <fieldset>
                            <input type="button" className="Btn cancel" value="Thoát" />
                            <input type="submit" className="Btn" value="Cập nhật" />
                            
                        </fieldset>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
          </div>
        );
    }
}

export default Profile;