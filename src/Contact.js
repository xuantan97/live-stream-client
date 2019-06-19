import $ from "jquery";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { FaUserAlt, FaPaperPlane, FaCheck, FaTimes, FaList, FaSignOutAlt } from 'react-icons/fa';
import Footer from './Footer';

class Contact extends Component {

    submitForm() {
      var first_name = $("#fname").val();
      var last_name = $("#lname").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message = $("#message").val();

      if(first_name === "" || last_name === "" || email === "" || subject === "" || message === "") {
        alert("Bạn phải điền đầy đủ thông tin trong form")
      }
      else {
        var contact = new FormData();
        contact.append('first_name', first_name);
        contact.append('last_name', last_name);
        contact.append('email', email);
        contact.append('subject', subject);
        contact.append('message', message);
  
        fetch('http://bonddemo.tk/v1/contact/add',{
            method: 'POST',
            headers: {
              'Authorization': 'Bearer lyWyy7-2EqXt6JOjKXnQV90Ghv94ie_5vO20rHFP'
          },
            body: contact
        })
        .then(res => {
            res.json().then(response => {
                $("#fname").val("");
                $("#lname").val("");
                $("#email").val("");
                $("#subject").val("");
                $("#message").val("");
                alert("Ý kiến của bạn đã được ghi nhận !!")
            })
        })
        .catch(error => {console.log(error);});
      }
    }

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
              <li><Link to="/aboutus">Chúng tôi</Link></li>
              <li><Link to="/game">Trò chơi</Link></li>
              <li><Link to="/contact" className="site-menu-focus contact">Liên hệ</Link></li>
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
                    <li><Link to="/aboutus">Chúng tôi</Link></li>
                    <li><Link to="/game">Trò chơi</Link></li>
                    <li><Link to="/contact" className="site-menu-focus contact">Liên hệ</Link></li>
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
              <section className="site-section bg-light" id="contact-section" style={{marginTop: '69px'}}>
                <div className="container">
                  <div className="row mb-5">
                    <div className="col-12 text-center">
                      <h2 className="section-title mb-3">Liên hệ với chúng tôi</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Địa chỉ</p>
                      <p className="mb-4">463 Cách Mạng Tháng 8, Phường 13, Quận 10, TPHCM
                      </p></div>
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Số điện thoại</p>
                      <p className="mb-4">0328010342</p>
                    </div>
                    <div className="col-md-4">
                      <p className="mb-0 font-weight-bold">Email</p>
                      <p className="mb-0">anson1907@gmail.com</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <form action="#" className="p-5 bg-white" style={{borderTop: '5px solid #3a4971', boxShadow: '0 2.5px 5px #ccc'}}>
                        <h2 className="h4 text-black mb-5">Form Liên hệ</h2> 
                        <div className="row form-group">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Họ</label>
                            <input type="text" id="fname" className="form-control" />
                          </div>
                          <div className="col-md-6">
                            <label className="text-black" htmlFor="lname">Tên</label>
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
                            <label className="text-black" htmlFor="subject">Tiêu đề</label> 
                            <input type="subject" id="subject" className="form-control" />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black" htmlFor="message">Nội dung</label> 
                            <textarea name="message" id="message" cols={30} rows={7} className="form-control" placeholder="Nội dung ghi chú hoặc cần giải đáp..." defaultValue={""} />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-12">
                            <input type="button" onClick={()=>this.submitForm()} defaultValue="Gửi" id="btnGui" className="btn btn-primary btn-md text-white" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div></section>

                <Footer/>
            </div>
        );
    }
}

export default Contact;