import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import Validator from 'validator';

class Login extends Component {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {},
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});

        var FormData = require('form-data');
        var account = new FormData();
        account.append('email',this.state.data.email);
        account.append('password',this.state.data.password);
        console.log(account);
        fetch('http://bonddemo.tk/v1/system/login',{
            method: 'POST',
            headers: {},
            // body: JSON.stringify({
            //     email: this.state.data.email,
            //     password: this.state.data.password
            // })
            body: account
        })
            .then(res => {
                res.json().then(response => {
                    console.log(response);
                    if(response === "fail"){
                        alert("Login fail !!!");
                    }else{
                        localStorage.setItem('user_id', response.id);
                        localStorage.setItem('email', response.email);
                        localStorage.setItem('username', response.username);
                        localStorage.setItem('token', response.token);
                        this.props.history.push('/homepage');
                    }
                })
            })
            .catch(error => {console.log(error);});
        // this.props.history.push('/homepage');
    };
    render() {
        const {data,errors} = this.state;
        let email = '';
        let password = '';
        if(errors.email) {
            email += 'error';
        }
        if(errors.password) {
            password += 'error';
        }
        return(
            <div className="container-form">

                <div class="wrapper-login">
                    <div class="container-login">
                        <h1>Welcome</h1>
                        
                        <form class="form-login" onSubmit={this.onSubmit}>
                            {errors.email && <div style={{color: '#ae5856'}}>{errors.email}</div>}
                            <input className={email} type="email" id="email" name="email" placeholder="Email" value={data.email} onChange={this.onChange}/>

                            {errors.password && <div style={{color: '#ae5856'}}>{errors.password}</div>}
                            <input className={password} type="password" id="password" name="password" placeholder="Password" value={data.password} onChange={this.onChange}/>
                            <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>Sign In</Button>
                            <div style={{marginTop: '30px', fontSize: '18px'}}>
                                <span>Don't have account?&nbsp;</span>
                                <a variant="primary" href="/register">
                                    Sign Up
                                </a>
                            </div>
                        </form>
                    </div>
                    
                    <ul class="bg-bubbles">
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                    </ul>
                </div>


                {/* <div className="container">

                    <Form onSubmit={this.onSubmit}>
                        <h1>
                            Login
                        </h1>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            {errors.email && <span style={{color: '#ae5856', float: 'right'}}>{errors.email}</span>}
                            <Form.Control className={email} type="email" id="email" name="email" placeholder="abc@gmail.com" value={data.email} onChange={this.onChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            {errors.password && <span style={{color: '#ae5856', float: 'right'}}>{errors.password}</span>}
                            <Form.Control className={password} type="password" id="password" name="password" placeholder="123456" value={data.password} onChange={this.onChange}/>
                        </Form.Group>
                        <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>
                            Login
                        </Button>
                        <br/>
                        <span style={{userSelect:"none"}}>Don't have account?&nbsp;</span>
                        <a variant="primary" href="/register">
                            Register
                        </a>
                    </Form>
                </div> */}
            </div>
        )
    }
}

export default Login