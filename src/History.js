
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaTimes, FaList, FaUserAlt } from 'react-icons/fa';
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
     fetch('http://bonddemo.tk/v1/user/program-user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer lyWyy7-2EqXt6JOjKXnQV90Ghv94ie_5vO20rHFP',
            },
        })
        .then(res => res.json())
        .then(response => {
          console.log(response);
            this.setState({
             objs: response,
            });
        })
        .catch(error => console.log(error));
  }

  getDataTable(objs) {
    const columns = [
      {
        dataField: 'username',
        text: 'Tên'
      }, 
      {
        dataField: 'email',
        text: 'Email'
      }, 
      {
        dataField: 'money',
        text: 'Tiền thưởng'
      }
    ];

    var result = [];
    objs.map((obj)=> {
      result.push(
        <div style={{backgroundColor: '#528B8B', marginTop: 1, color: '#000'}}>
          <Collapsible trigger={ obj.program.name_program } >
              <BootstrapTable keyField='id' data={ obj.user } columns={ columns } />
          </Collapsible>
        </div>
      );
    })
    return result;
  }


  render(){
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
                    <li><Link to="/aboutus">Chúng tôi</Link></li>
                    <li><Link to="/game">Trò chơi</Link></li>
                    <li><Link to="/contact" className="site-menu-focus contact">Liên hệ</Link></li>
                    <li><Link to="/history">Lịch sử</Link></li>
                    <li>
                      <NavDropdown title={<FaUserAlt style={{ fontSize: '16px', marginBottom: '5px' }} />} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={()=>this.props.history.push('/profile')}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={() => this.logout()}>Log out</NavDropdown.Item>
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