
import React, {Component} from 'react';
import players from './player';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaTimes, FaList, FaUserAlt } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';

class History extends Component{

  constructor(props){
    super(props);
    this.state = {expandedRows: []};
  }

  handleExpand = (player) =>{
    let newExpandedRows = [...this.state.expandedRows];
    let allExpanded = this.state.allExpanded;
    let idxFound = newExpandedRows.findIndex((id)=>{
        return id === player.id;
    });

    if(idxFound > -1){
        console.log("Collapsing " + player.firstName + " " + idxFound);
        newExpandedRows.splice(idxFound, 1);
    }
    else{
      console.log("Expanding " + player.firstName);
      newExpandedRows.push(player.id);
    }

    console.log("Expanded rows");
    console.log(newExpandedRows);

    this.setState({expandedRows: [...newExpandedRows]});
  }

  isExpanded = (player)=>{
    const idx = this.state.expandedRows.find(
      (id)=>{
        return id === player.id;
      }
    );

    return idx > -1;
  }

  expandAll=(players)=>{
    console.log("ExapndedRows: " + this.state.expandedRows.length);
    console.log("Players:      " + players.length);
    if(this.state.expandedRows.length === players.length){

      let newExpandedRows = [];
      this.setState({expandedRows: [...newExpandedRows]});
      console.log("Collapsing all...");
    }
    else{
      let newExpandedRows = players.map(
        player => player.id
      );
      this.setState({expandedRows: [...newExpandedRows]});   
      console.log("Expanding all...");
      console.log("Expanded rows " + newExpandedRows.length)
    }
  }

  getRows = (player)=>{
    
    let rows = [];
    
    const firstRow = (
      <tr onClick={()=>this.handleExpand(player)}>
        <td >
        <button>
        {this.isExpanded(player) ? "-" : "+"}
        </button>
        </td>
        <td>{player.firstName}</td>
        <td>{player.lastName}</td>
        <td>{player.team}</td>
      </tr>
    )

    rows.push(firstRow);

    if(this.isExpanded(player)){
      const detailRow = (
          <tr className="player-details">
            <td colspan="4" className="player-details">
              <br/>
              <div className="attribute">
                <div className="attribute-name">Height: </div>
                <div className="attribute-value">{player.stats.height}</div>
              </div>
              <br/>
              <div className="attribute">
                <div className="attribute-name">Weight: </div>
                <div className="attribute-value">{player.stats.weight}</div>
              </div>
              <br/>
              <div className="attribute">
                <div class="attribute-name">College: </div>
                <div className="attribute-value">{player.college}</div>
              </div>
              <br/>
            </td>
          </tr>
        );
      rows.push(detailRow);
    }

    return rows;
  }

  getPlayerTable = (players)=>{

    const playerRows = players.map((player)=>{
      return this.getRows(player);
    });

    return (
        <div className="site-wrap">
            <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                <span><FaTimes className="icon-close2 js-menu-toggle"/></span>
                </div>
            </div>
            <div className="site-mobile-menu-body" />
            </div>
            <div id="sticky-wrapper" className="sticky-wrapper"></div>
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
        <table className="my-table">
            <tr>
            <th onClick={()=>this.expandAll(players)}>
                <button >
                {players.length === this.state.expandedRows.length ? "-" : "+"} 
                </button>
            </th>
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Team</th>
            </tr>
            {playerRows}
        </table>
        </div>
    );
  }

  render(){
   return ( 
     <div>
       {this.getPlayerTable(players)}
     </div>
     ); 
  }
}

export default History;