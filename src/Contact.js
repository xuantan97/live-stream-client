import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Contact extends Component {
    
    render() {
        
        return(
            <div className="site-wrap">
                <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
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
                    <li><Link to="/contact">Liên hệ</Link></li>
                    <li><Link to="/history">Lịch sử</Link></li>
                    <li><Link to="/login">Đăng nhập</Link></li>
                  </ul>
                </nav>
              </div>
              <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{position: 'relative', top: '3px'}}><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3" /></a></div>
            </div>
          </div>
        </header>
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