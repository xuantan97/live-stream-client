import $ from "jquery";
import React, { Component } from "react";
import { Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaUserAlt, FaFacebookF, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList, FaEdit, FaHandHoldingUsd, FaArrowAltCircleUp } from 'react-icons/fa';

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

          $('.sticky-wrapper').addClass('is-sticky');
          $('.js-sticky-header').addClass('shrink');
          $(window).bind('scroll', function(e) {
            var top = $(window).scrollTop();
            if(top < 100) {
              $('.sticky-wrapper').addClass('is-sticky');
              $('.js-sticky-header').addClass('shrink');
            }
          });  
    
          var siteMenuClone = function() {
            $('.js-clone-nav').each(function() {
              var $this = $(this);
              $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
            });
        
        
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
                  <div className="site-mobile-menu-body" />
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
                            <li><Link to="/login">Đăng nhập</Link></li>
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
                        <h1>Thông tin cá nhân</h1>
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

            <footer className="site-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-5">
                          <h2 className="footer-heading mb-4">About Us</h2>
                          <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
                          <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
                          <form action="#" method="post" className="footer-subscribe">
                            <div className="input-group mb-3">
                              <input type="text" className="form-control border-secondary text-white bg-transparent" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2" />
                              <div className="input-group-append">
                                <button className="btn btn-white text-black" type="button" id="button-addon2" style={{background: '#fff'}}>Send</button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-md-3 ml-auto">
                          <h2 className="footer-heading mb-4">Quick Links</h2>
                          <ul className="list-unstyled">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Contact Us</a></li>
                          </ul>
                        </div>
                        <div className="col-md-3">
                          <h2 className="footer-heading mb-4">Follow Us</h2>
                          <a href="#" className="pl-0 pr-3"><FaFacebookF/></a>
                          <a href="#" className="pl-3 pr-3"><FaTwitter/></a>
                          <a href="#" className="pl-3 pr-3"><FaInstagram/></a>
                          <a href="#" className="pl-3 pr-3"><FaLinkedinIn/></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-5">
                        <img src="images/img_1.jpg" alt className="img-fluid mb-4" />
                        <h2 className="footer-heading mb-4">Some Paragraph</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, laudantium nisi quo, sit neque quisquam.</p>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-5 mt-5 text-center">
                    <div className="col-md-12">
                      <div className="border-top pt-5">
                        <p>
                          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                          Copyright © All rights reserved | This template is made with <FaHeart aria-hidden="true"/> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
          </div>
        );
    }
}

export default Profile;