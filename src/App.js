
import React from "react";
import {Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';


const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={Login}/>
        <Route location={location} path="/register" exact component={Register}/>
        <Route location={location} path="/homepage" exact component={Homepage}/>
    </div>
);

export default App;