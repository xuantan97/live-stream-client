import $ from "jquery";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaUserAlt, FaFacebookF, FaPaperPlane, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList } from 'react-icons/fa';


class Contact extends Component {
    
    render() {
      $(document).ready(function() {
        $('header').css('background', '#fff !important');
        $('header').prop('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.2)');
        $(window).bind('scroll', function(e) {
          var top = $(window).scrollTop();
          if(top > 100) {
            $('.js-sticky-header').addClass('shrink');
            $('.sticky-wrapper').addClass('is-sticky');
          }
          else {
            // $('header').prop('box-shadow', 'none');
            $('.js-sticky-header').removeClass('shrink');
            $('.sticky-wrapper').removeClass('is-sticky');
          }
        });
  
        $('.site-menu a').bind('click', function(e) {
          $('.site-menu a').removeClass('site-menu-focus');
          $(this).addClass('site-menu-focus');
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
        return(
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
                    <li><Link to="/aboutus">Chúng tôi</Link></li>
                    <li><Link to="/game">Trò chơi</Link></li>
                    <li><Link to="/contact" className="site-menu-focus contact">Liên hệ</Link></li>
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
              <section className="site-section bg-light" id="contact-section">
                <div className="container">
                  <div className="row mb-5">
                    <div className="col-12 text-center">
                      <h2 className="section-title mb-3">Reach to us</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Address</p>
                      <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA
                      </p></div>
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Phone</p>
                      <p className="mb-4"><a href="#">+1 232 3235 324</a></p>
                    </div>
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Email Address</p>
                      <p className="mb-0"><a href="#">youremail@domain.com</a></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <form action="#" className="p-5 bg-white">
                        <h2 className="h4 text-black mb-5">Contact Form</h2> 
                        <div className="row form-group">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">First Name</label>
                            <input type="text" id="fname" className="form-control" />
                          </div>
                          <div className="col-md-6">
                            <label className="text-black" htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" className="form-control" />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="email">Email</label> 
                            <input type="email" id="email" className="form-control" />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Subject</label> 
                            <input type="subject" id="subject" className="form-control" />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="message">Message</label> 
                            <textarea name="message" id="message" cols={30} rows={7} className="form-control" placeholder="Write your notes or questions here..." defaultValue={""} />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <input type="submit" defaultValue="Send Message" className="btn btn-primary btn-md text-white" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div></section>
            </div>
        );
    }
}

export default Contact;