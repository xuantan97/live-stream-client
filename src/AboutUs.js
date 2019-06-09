import $ from "jquery";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaUserAlt, FaFacebookF, FaPaperPlane, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList } from 'react-icons/fa';


class AboutUs extends Component {
    
    render() {
      $(document).ready(function() {
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
          <section className="site-section border-bottom" id="team-section" style={{marginTop: '69px'}}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-7 text-left">
                <h2 className="section-title mb-3">Meet Team</h2>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="#"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/person_5.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-3">
                    <h3>Kaiara Spencer</h3>
                    <span className="position">Expert in Motivational</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="#"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/person_6.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-3">
                    <h3>Dave Simpson</h3>
                    <span className="position">Expert in Financing Issue</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="#"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/person_7.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-3">
                    <h3>Ben Thompson</h3>
                    <span className="position">Expert in Social Life</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="#"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/person_8.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-3">
                    <h3>Kyla Stewart</h3>
                    <span className="position">Expert in Social Life</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6" stylr="position: relative;">
                <div className="owl-carousel slide-one-item-alt">
                  <img src="images/slide_1.jpg" alt="Image" className="img-fluid" />
                  <img src="images/slide_2.jpg" alt="Image" className="img-fluid" />
                  <img src="images/slide_3.jpg" alt="Image" className="img-fluid" />
                </div>
                <div className="custom-direction">
                  <a href="#" className="custom-prev">Prev</a> / <a href="#" className="custom-next">Next</a>
                </div>
              </div>
              <div className="col-lg-5 ml-auto">
                <div className="owl-carousel slide-one-item-alt-text">
                  <div>
                    <h2 className="section-title mb-3">Social Life</h2>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Est qui eos quasi ratione nostrum excepturi id recusandae fugit omnis ullam pariatur itaque nisi voluptas impedit  Quo suscipit omnis iste velit maxime.</p>
                    <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                  </div>
                  <div>
                    <h2 className="section-title mb-3">Money &amp; Finance</h2>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Est qui eos quasi ratione nostrum excepturi id recusandae fugit omnis ullam pariatur itaque nisi voluptas impedit  Quo suscipit omnis iste velit maxime.</p>
                    <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                  </div>
                  <div>
                    <h2 className="section-title mb-3">Motivation</h2>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Est qui eos quasi ratione nostrum excepturi id recusandae fugit omnis ullam pariatur itaque nisi voluptas impedit  Quo suscipit omnis iste velit maxime.</p>
                    <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                  </div>
                </div>
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

export default AboutUs;