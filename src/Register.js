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
        return(
            <div className="container-full">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '85vh',
                    width: '600px',
                    margin: '20px',
                    backgroundColor:'white'
                }}>

                    <Form style={{
                        height: '60vh',
                        width: '500px',
                    }}
                          onSubmit={this.onSubmit}
                    >
                        <h1>
                            Register
                        </h1>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="username" name="username" placeholder="Enter username" value={data.username} onChange={this.onChange}/>
                            {errors.username && <span style={{color: '#ae5856'}}>{errors.username}</span>}
                        </Form.Group>

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

                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Password" value={data.passwordConfirm} onChange={this.onChange}/>
                            {errors.passwordConfirm && <span style={{color: '#ae5856'}}>{errors.passwordConfirm}</span>}
                        </Form.Group>

                        <Button variant="primary" onClick={()=>this.onSubmit()}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register