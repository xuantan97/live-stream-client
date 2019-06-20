import React from "react";
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Game from './Game';
import History from './History';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './PageNotFound';

const App = ({location}) => (
    <div>
         <Switch>
            <Route location={location} path="/" exact component={Login}/>
            <Route location={location} path="/register" exact component={Register}/>
            <PrivateRoute location={location} path="/homepage" exact component={Homepage}/>
            <PrivateRoute location={location} path="/profile" exact component={Profile}/>
            <PrivateRoute location={location} path="/aboutus" exact component={AboutUs}/>
            <PrivateRoute location={location} path="/contact" exact component={Contact}/>
            <PrivateRoute location={location} path="/game" exact component={Game}/>
            <PrivateRoute location={location} path="/history" exact component={History}/>
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

export default App;