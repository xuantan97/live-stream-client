import $ from "jquery";
import io from 'socket.io-client';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './Header';


class Homepage extends Component {

  render() {
    return (
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>
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
        <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_1.jpg)'}} data-aos="fade" id="home-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-lg-5 ml-auto text-left align-self-end align-self-md-center">
                <h1>Professional Life Coaching</h1>
                <p className="mb-4"> <li><Link className="btn btn-primary mr-2 mb-2" to="/game">Bắt đầu chơi</Link></li></p>
              </div>
            </div>
          </div>
        </div>  
        <div className="site-section bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                <h2 className="text-white">Special Offers</h2>
              </div>
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="mr-3"><span className="flaticon-bill display-3 text-special" /></div>
                <div>
                  <h3 className="text-white h4">50% less of every purchase</h3>
                  <p className="text-special">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                  <p><a href="#">Read more</a></p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="mr-3"><span className="flaticon-customer-service display-3 text-special" /></div>
                <div>
                  <h3 className="text-white h4">More programs than ever before</h3>
                  <p className="text-special">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                  <p><a href="#">Read more</a></p>
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
                <h2 className="section-title mb-3">Welcome to LifeCoach</h2>
                <p className="lead">Harum quaerat nostrum voluptatibus aspernatur eligendi accusantium cum, impedit blanditiis voluptate commodi doloribus, nemo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio necessitatibus deserunt itaque dignissimos adipisci, tenetur.</p>
                <p className="mb-4">Ipsum dolorum ab magnam facere alias ducimus nulla consequuntur blanditiis, maxime explicabo rerum maiores, odio.</p>
                <p><img src="images/signature.jpg" alt="Image" className="img-fluid w-25" /></p>
              </div>
            </div>
          </div>
        </section>
        <div className="site-section bg-light" id="training-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section-title mb-3">Our Training</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled training">
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_1.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How to deal your business?</a></h2>
                      <span className="text-muted d-block mb-4">Finance</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_2.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How to stay progressive in knowledge</a></h2>
                      <span className="text-muted d-block mb-4">Social Life</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_3.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How To Invest In Investing Company</a></h2>
                      <span className="text-muted d-block mb-4">Family Issue</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled training">
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_1.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How to deal your business?</a></h2>
                      <span className="text-muted d-block mb-4">Family Issue</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_2.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How to stay progressive in knowledge</a></h2>
                      <span className="text-muted d-block mb-4">Finance</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                  <li className="mb-5 d-block d-lg-flex">
                    <div className="mr-5 mb-4 img">
                      <a href="training-single.html"><img src="images/img_3.jpg" alt="Image" className="img-fluid" /></a>
                    </div>
                    <div>
                      <h2 className="h4"><a href="training-single.html" className="text-black">How To Invest In Investing Company</a></h2>
                      <span className="text-muted d-block mb-4">Job Issue</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolores .</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
       
        
        <section className="site-section border-bottom bg-light" id="services-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section-title mb-3">Our Services</h2>
              </div>
            </div>
            <div className="row align-items-stretch">
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-career" /></div>
                  <div>
                    <h3>Business Consulting</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay={100}>
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-bill" /></div>
                  <div>
                    <h3>Market Analysis</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay={200}>
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-customer-service" /></div>
                  <div>
                    <h3>User Monitoring</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay={300}>
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-plan" /></div>
                  <div>
                    <h3>Insurance Consulting</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay={400}>
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-growth" /></div>
                  <div>
                    <h3>Financial Investment</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay={500}>
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4"><span className="text-primary flaticon-award" /></div>
                  <div>
                    <h3>Financial Management</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                    <p><a href="#">Learn More</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section testimonial-wrap" id="testimonials-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section-title mb-3">Testimonials</h2>
              </div>
            </div>
          </div>
          <div className="slide-one-item home-slider owl-carousel">
            <div>
              <div className="testimonial">
                <blockquote className="mb-5">
                  <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.”</p>
                </blockquote>
                <figure className="mb-4 d-flex align-items-center justify-content-center">
                  <div><img src="images/person_3.jpg" alt="Image" className="w-50 img-fluid mb-3" /></div>
                  <p>John Smith</p>
                </figure>
              </div>
            </div>
            <div>
              <div className="testimonial">
                <blockquote className="mb-5">
                  <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.”</p>
                </blockquote>
                <figure className="mb-4 d-flex align-items-center justify-content-center">
                  <div><img src="images/person_2.jpg" alt="Image" className="w-50 img-fluid mb-3" /></div>
                  <p>Christine Aguilar</p>
                </figure>
              </div>
            </div>
            <div>
              <div className="testimonial">
                <blockquote className="mb-5">
                  <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.”</p>
                </blockquote>
                <figure className="mb-4 d-flex align-items-center justify-content-center">
                  <div><img src="images/person_4.jpg" alt="Image" className="w-50 img-fluid mb-3" /></div>
                  <p>Robert Spears</p>
                </figure>
              </div>
            </div>
            <div>
              <div className="testimonial">
                <blockquote className="mb-5">
                  <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.”</p>
                </blockquote>
                <figure className="mb-4 d-flex align-items-center justify-content-center">
                  <div><img src="images/person_4.jpg" alt="Image" className="w-50 img-fluid mb-3" /></div>
                  <p>Bruce Rogers</p>
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section" id="blog-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section-title mb-3">Our Blog Posts</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
                <div className="h-entry">
                  <a href="blog-single.html"><img src="images/img_1.jpg" alt="Image" className="img-fluid" /></a>
                  <h2 className="font-size-regular"><a href="blog-single.html">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a></h2>
                  <div className="meta mb-4">Ham Brook <span className="mx-2">•</span> Jan 18, 2019<span className="mx-2">•</span> <a href="#">News</a></div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
                  <p><a href="#">Continue Reading...</a></p>
                </div> 
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
                <div className="h-entry">
                  <a href="blog-single.html"><img src="images/img_2.jpg" alt="Image" className="img-fluid" /></a>
                  <h2 className="font-size-regular"><a href="blog-single.html">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a></h2>
                  <div className="meta mb-4">James Phelps <span className="mx-2">•</span> Jan 18, 2019<span className="mx-2">•</span> <a href="#">News</a></div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
                  <p><a href="#">Continue Reading...</a></p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
                <div className="h-entry">
                  <a href="blog-single.html"><img src="images/img_1.jpg" alt="Image" className="img-fluid" /></a>
                  <h2 className="font-size-regular"><a href="blog-single.html">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a></h2>
                  <div className="meta mb-4">James Phelps <span className="mx-2">•</span> Jan 18, 2019<span className="mx-2">•</span> <a href="#">News</a></div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
                  <p><a href="#">Continue Reading...</a></p>
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
                          <button className="btn btn-white text-black" type="button" id="button-addon2">Send</button>
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
                    <a href="#" className="pl-0 pr-3"><span className="icon-facebook" /></a>
                    <a href="#" className="pl-3 pr-3"><span className="icon-twitter" /></a>
                    <a href="#" className="pl-3 pr-3"><span className="icon-instagram" /></a>
                    <a href="#" className="pl-3 pr-3"><span className="icon-linkedin" /></a>
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
                    Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
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

export default Homepage;