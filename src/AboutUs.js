import $ from "jquery";
import React, { Component } from "react";
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaUserAlt, FaFacebookF, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaList, FaSignOutAlt } from 'react-icons/fa';
import Footer from './Footer';

class AboutUs extends Component {
    logout() {
      localStorage.clear();
      this.props.history.push('/');
    }
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

        $('.site-menu a').bind('mouseover', function(e) {
          if(!$(this).hasClass('site-menu-focus')) {
            $(this).addClass('nav-hover');
          }
        });
        
        $('.site-menu a').bind('mouseout', function(e) {
          $(this).removeClass('nav-hover');
        }); 

        $('.basic-nav-dropdown').bind('mouseover', function(e) {
          $('.site-menu .dropdown-toggle svg path').addClass('user-hover');
        });
        
        $('.basic-nav-dropdown').bind('mouseout', function(e) {
          $('.site-menu .dropdown-toggle svg path').removeClass('user-hover');
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
        return(
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
                <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Thông tin cá nhân</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={() => this.logout()}>Đăng xuất &nbsp; <FaSignOutAlt/></NavDropdown.Item>
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
                <h1 className="mb-0 site-logo"><Link className="h2 mb-0" to="/homepage">ST<span>Game</span></Link></h1>
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
                        <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Thông tin cá nhân</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={() => this.logout()}>Đăng xuất &nbsp; <FaSignOutAlt/></NavDropdown.Item>
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
          <section className="site-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 mt-4" stylr="position: relative;">
                  <div className="owl-carousel slide-one-item-alt">
                    <img src="images/slide_1.jpg" alt="Image" className="img-fluid" />
                  </div>
                </div>
                <div className="col-lg-7 ml-auto mt-3">
                  <div className="owl-carousel slide-one-item-alt-text">
                  <div>
                      <center><h2 className="section-title mb-3">Mục tiêu của chúng tôi</h2></center>
                      <p>Tận dụng tối đa công nghệ LiveSteam vào lĩnh vực giải trí để tạo ra ứng dụng hữu ích và được mọi người tin dùng.</p>
                      <p>
                        Nâng cao sự tiện dụng - mục tiêu quan trọng nhất được đặt ra là đảm bảo người dùng có thể dễ dàng tham gia giải trí mọi nơi. Không cần thủ tục phức tạp như các chương trình gameshow truyền hình.
                        Tương tác thời gian thực với người điều khiển chương trình giải trí.
                      </p>
                      <p>
                        Hệ thống được xây dựng và phát triển trên nền tảng web và cả smartphone nhằm mang lại trải nghiệm tuyệt vời cho người dùng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="site-section border-bottom" id="team-section">
            <div className="container">
            <center><h2 className="section-title mb-3">Đội ngũ phát triển</h2></center>
            <div className="row">
              <div className="col-md-6 col-lg-25 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="https://www.facebook.com/anson197" target="_blank" rel="noopener noreferrer"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/1.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-2">
                    <h5 style={{color: '#000'}}>An Sơn</h5>
                    <span className="position">Mobile Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-25 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="https://www.facebook.com/nttam199" target="_blank" rel="noopener noreferrer"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/2.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-2">
                    <h5 style={{color: '#000'}}>Thành Tâm</h5>
                    <span className="position">Frontend Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-25 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="https://www.facebook.com/thanhtan.nguyen.31149" target="_blank" rel="noopener noreferrer"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/3.jpg" alt="Image" className="img-fluid" />
                  </figure>
                  <div className="p-2">
                    <h5 style={{color: '#000'}}>Thanh Tân</h5>
                    <span className="position">Backend Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-25 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="https://www.facebook.com/bondgl0" target="_blank" rel="noopener noreferrer"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/4.jpg" alt="" className="img-fluid" />
                  </figure>
                  <div className="p-2">
                    <h5 style={{color: '#000'}}>Xuân Tân</h5>
                    <span className="position">FullStack Developer</span>
                  </div>
                </div>
              </div>

              <div className="col-md-13 col-lg-25 mb-4">
                <div className="team-member">
                  <figure>
                    <ul className="social">
                      <li><a href="https://www.facebook.com/tanphantp" target="_blank" rel="noopener noreferrer"><span><FaFacebookF/></span></a></li>
                      <li><a href="#"><span><FaTwitter/></span></a></li>
                      <li><a href="#"><span><FaLinkedinIn/></span></a></li>
                      <li><a href="#"><span><FaInstagram/></span></a></li>
                    </ul>
                    <img src="images/5.jpg" alt="" className="img-fluid" />
                  </figure>
                  <div className="p-2">
                    <h5 style={{color: '#000'}}>Văn Tấn</h5>
                    <span className="position">Frontend Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
            </div>
        );
    }
}

export default AboutUs;