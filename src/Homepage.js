import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaUserAlt, FaFacebookF, FaPaperPlane, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList } from 'react-icons/fa';
import Header from './Header';



class Homepage extends Component {

  render() {
    $(document).ready(function() {
      $(window).bind('scroll', function(e) {
        var top = $(window).scrollTop();
        if(top > 100) {
          $('header').prop('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.2)');
          $('.js-sticky-header').addClass('shrink');
          $('.sticky-wrapper').addClass('is-sticky');
        }
        else {
          $('header').prop('box-shadow', 'none');
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
                    <li><Link to="/homepage" className="site-menu-focus homepage">Trang chủ</Link></li>
                    <li><Link to="/aboutus">Chúng tôi</Link></li>
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
        <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_1.jpg)'}} data-aos="fade" id="home-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-lg-5 ml-auto text-left align-self-end align-self-md-center">
                <h1>Trivia Game</h1>
                <p className="mb-4"><Link className="btn btn-primary mr-2 mb-2" to="/game">Bắt đầu chơi</Link></p>
              </div>
            </div>
          </div>
        </div>  
        <div className="site-section bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                <h3 className="text-white">Câu hỏi trắc nghiệm</h3>
              </div>
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="mr-3"><span className="flaticon-bill display-3 text-special" /></div>
                <div>
                  <h3 className="text-white h4">Đúng 10 câu liên tiếp</h3>
                  <h3 className="text-white h4">Nhận thưởng liền tay</h3>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="mr-3"><span className="flaticon-customer-service display-3 text-special" /></div>
                <div>
                  <h3 className="text-white h4">Cùng nhau trải nghiệm</h3>
                  <h3 className="text-white h4">Nhận quà hấp dẫn</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="site-section" id="about-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-5 ml-auto mb-5 order-md-2" data-aos="fade">
                <img src="images/about_1.jpg" alt="Image" className="img-fluid rounded" />
              </div>
              <div className="col-lg-6 order-md-1" data-aos="fade">
                <h2 className="section-title mb-3">Chào mừng đến với game tương tác thời gian thực</h2>
                <p className="lead">Dựa trên nền tảng công nghệ video stream. Chúng tôi đã tạo ra ứng dụng giải trí tương tác thời gian thực.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio necessitatibus deserunt itaque dignissimos adipisci, tenetur.</p>
                <p className="mb-4">Ipsum dolorum ab magnam facere alias ducimus nulla consequuntur blanditiis, maxime explicabo rerum maiores, odio.</p>
                <p><img src="images/signature.jpg" alt="Image" className="img-fluid w-25" /></p>
              </div>
            </div>
          </div>
        </section>
        
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
                    Copyright © All rights reserved | This template is made with <FaHeart aria-hidden="true"/> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
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

export default Homepage;