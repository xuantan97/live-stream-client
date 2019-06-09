import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { FaUserAlt, FaFacebookF, FaPaperPlane, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList } from 'react-icons/fa';
import 'css-doodle';
import $ from "jquery";

class Footer extends Component {
    
    render() {
        
        return(
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
        );
    }
}

export default Footer;