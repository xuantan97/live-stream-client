
import React from "react";
import {Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Game from './Game';

const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={Login}/>
        <Route location={location} path="/register" exact component={Register}/>
        <Route location={location} path="/homepage" exact component={Homepage}/>
        <Route location={location} path="/profile" exact component={Profile}/>
        <Route location={location} path="/aboutus" exact component={AboutUs}/>
        <Route location={location} path="/contact" exact component={Contact}/>
        <Route location={location} path="/game" exact component={Game}/>

    </div>
);

export default App;