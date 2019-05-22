import React, { Component } from "react";
import {Form,Button} from 'react-bootstrap';
import Validator from 'validator';

class Register extends Component {
    state = {
        data: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        errors: {},
    };

    validate = data => {
        const errors = {};
        if (!data.username) errors.username = "Can't be blank";
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        if (data.passwordConfirm !== data.password && data.passwordConfirm === "") errors.passwordConfirm = "Invalid Password";
        return errors;
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});

        // console.log(this.state.data);
        var FormData = require('form-data');
        var account = new FormData();
        account.append('username',this.state.data.username);
        account.append('email',this.state.data.email);
        account.append('password',this.state.data.password);
        console.log(account);
        fetch('http://bonddemo.tk/v1/system/sign-up',{
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
                        alert("Regist failed !!!");
                    }else{
                        // localStorage.setItem('token',response);
                        this.props.history.push('/');
                    }
                })
            })
            .catch(error => {console.log(error)});
    };
    render() {
        const {data,errors} = this.state;
        let userName = '';
        let email = '';
        let password = '';
        let passwordConfirm = '';
        if(errors.username) {
            userName += 'error';
        }
        if(errors.email) {
            email += 'error';
        }
        if(errors.password) {
            password += 'error';
        }
        if(errors.passwordConfirm) {
            passwordConfirm += 'error';
        }

        return(
            <div className="container-form" style={{background: "url('/bg2.jpg')", backgroundSize: "cover"}}>
                <div className="container">

                    <Form onSubmit={this.onSubmit}>
                        <h1>
                            Register
                        </h1>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            {errors.username && <span style={{color: '#ae5856', float: 'right'}}>{errors.username}</span>}
                            <Form.Control className={userName} type="text" id="username" name="username" placeholder="Love_cat" value={data.username} onChange={this.onChange}/>
                            
                        </Form.Group>

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

                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            {errors.passwordConfirm && <span style={{color: '#ae5856', float: 'right'}}>{errors.passwordConfirm}</span>}
                            <Form.Control className={passwordConfirm} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="enter password" value={data.passwordConfirm} onChange={this.onChange}/>
                            
                        </Form.Group>

                        <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register