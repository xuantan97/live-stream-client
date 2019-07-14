import React, {Component} from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaTimes, FaList, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import Footer from './Footer';
import BootstrapTable from 'react-bootstrap-table-next';

class History extends Component{

  constructor(props){
    super(props);
    this.state = {
      products: [],
      name_program: "",
      created_at: "",
      objs: []
    };
  }

  componentDidMount() {
    var user_id = localStorage.getItem('user_id');
     fetch('http://bonddemo.tk/v1/user/user-programs?id=' + user_id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer lyWyy7-2EqXt6JOjKXnQV90Ghv94ie_5vO20rHFP',
            },
        })
        .then(res => res.json())
        .then(response => {
          console.log(response);
            // this.setState({
            //  objs: response,
            // });
        })
        .catch(error => console.log(error));
  }

  getDataTable(objs) {
    const columns = [
      {
        dataField: 'username',
        text: 'Họ Tên'
      }, 
      {
        dataField: 'email',
        text: 'Email'
      }, 
      {
        dataField: 'money',
        text: 'Tiền thưởng ($)'
      }
    ];

    var result = [];
    objs.map((obj) => {
      result.push(
        <div style={{backgroundColor: '#528B8B', marginTop: '1px', color: '#fff', padding: '1rem 0'}}>
          <Collapsible trigger={ obj.program.name_program } >
              <BootstrapTable keyField='id' data={ obj.user } columns={ columns } />
          </Collapsible>
        </div>
      );
    })
    return result;
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/');
  }


  render(){
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
              <li><Link to="/contact">Liên hệ</Link></li>
              <li><Link to="/history" className="site-menu-focus history">Lịch sử</Link></li>
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
                    <li><Link to="/contact">Liên hệ</Link></li>
                    <li><Link to="/history" className="site-menu-focus history">Lịch sử</Link></li>
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
                <h2 className="section-title mb-3" style={{marginTop: '-1rem', paddingBottom: '2rem'}}>Lịch sử</h2>
                  {this.getDataTable(this.state.objs)}
              </div>
            </div>
          </div>
          </section>

          <Footer/>
      </div>
  );
   }  
}

export default History;