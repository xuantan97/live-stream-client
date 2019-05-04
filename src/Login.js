import React, { Component } from "react";
import {Form,Button} from 'react-bootstrap';
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
                        localStorage.setItem('token',response);
                        this.props.history.push('/homepage');
                    }
                })
            })
            .catch(error => {console.log(error);});
        // this.props.history.push('/homepage');
    };
    render() {
        const {data,errors} = this.state;
        return(
            <div className="container-full">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                    width: '600px',
                    margin: '20px',
                    backgroundColor:'white'
                }}>

                    <Form style={{
                        height: '50vh',
                        width: '500px',
                        }}
                        onSubmit={this.onSubmit}
                    >
                        <h1>
                            Login
                        </h1>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="email" name="email" placeholder="Enter email" value={data.email} onChange={this.onChange}/>
                            {errors.email && <span style={{color: '#ae5856'}}>{errors.email}</span>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" name="password" placeholder="Password" value={data.password} onChange={this.onChange}/>
                            {errors.password && <span style={{color: '#ae5856'}}>{errors.password}</span>}
                        </Form.Group>
                        <Button variant="primary" onClick={()=>this.onSubmit()}>
                            Submit
                        </Button>
                        <Button variant="primary" href="/register">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login