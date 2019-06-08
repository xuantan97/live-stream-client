import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import 'css-doodle';
import $ from "jquery";

class Header extends Component {
    
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
        </div>
        );
    }
}

export default Header;