
import React from "react";
import {Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import Profile from './Profile';


const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={Login}/>
        <Route location={location} path="/register" exact component={Register}/>
        <Route location={location} path="/homepage" exact component={Homepage}/>
        <Route location={location} path="/profile" exact component={Profile}/>
    </div>
);

export default App;