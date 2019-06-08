import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AboutUs extends Component {
    
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
                    <section className="site-section border-bottom" id="team-section">
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
                      <li><a href="#"><span className="icon-facebook" /></a></li>
                      <li><a href="#"><span className="icon-twitter" /></a></li>
                      <li><a href="#"><span className="icon-linkedin" /></a></li>
                      <li><a href="#"><span className="icon-instagram" /></a></li>
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
                      <li><a href="#"><span className="icon-facebook" /></a></li>
                      <li><a href="#"><span className="icon-twitter" /></a></li>
                      <li><a href="#"><span className="icon-linkedin" /></a></li>
                      <li><a href="#"><span className="icon-instagram" /></a></li>
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
                      <li><a href="#"><span className="icon-facebook" /></a></li>
                      <li><a href="#"><span className="icon-twitter" /></a></li>
                      <li><a href="#"><span className="icon-linkedin" /></a></li>
                      <li><a href="#"><span className="icon-instagram" /></a></li>
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
                      <li><a href="#"><span className="icon-facebook" /></a></li>
                      <li><a href="#"><span className="icon-twitter" /></a></li>
                      <li><a href="#"><span className="icon-linkedin" /></a></li>
                      <li><a href="#"><span className="icon-instagram" /></a></li>
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
            </div>
        );
    }
}

export default AboutUs;