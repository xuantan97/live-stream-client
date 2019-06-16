import React, { Component } from "react";
import {Button} from 'react-bootstrap';
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
        if (!data.username) errors.username = "Tên đăng nhập không được trống";
        if (!Validator.isEmail(data.email)) errors.email = "Email không hợp lệ";
        if (!data.password) errors.password = "Mật khẩu không được trống";
        if (data.passwordConfirm !== data.password || data.passwordConfirm === "") errors.passwordConfirm = "Mật khẩu không chính xác";
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
                        alert("Đăng kí không thành công !!!");
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
            <div className="container-form">
                
                <div class="wrapper-login">
                    <div class="container-login">
                        <h1>Đăng kí</h1>
                        
                        <form class="form-login" onSubmit={this.onSubmit}>
                            {errors.username && <span style={{color: '#ae5856', fontSize: '14px'}}>{errors.username}</span>}
                            <input className={userName} type="text" id="username" name="username" placeholder="Tên đăng nhập" value={data.username} onChange={this.onChange}/>

                            {errors.email && <div style={{color: '#ae5856', fontSize: '14px'}}>{errors.email}</div>}
                            <input className={email} type="email" id="email" name="email" placeholder="Email" value={data.email} onChange={this.onChange}/>

                            {errors.password && <div style={{color: '#ae5856', fontSize: '14px'}}>{errors.password}</div>}
                            <input className={password} type="password" id="password" name="password" placeholder="Mật khẩu" value={data.password} onChange={this.onChange}/>

                            {errors.passwordConfirm && <span style={{color: '#ae5856', fontSize: '14px'}}>{errors.passwordConfirm}</span>}
                            <input className={passwordConfirm} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Xác nhận mật khẩu" value={data.passwordConfirm} onChange={this.onChange}/>

                            <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>Đăng kí</Button>
                            <div style={{marginTop: '30px', fontSize: '18px'}}>
                                <span>Bạn đã có tài khoản?&nbsp;</span>
                                <a variant="primary" href="/">
                                    Đăng nhập
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
                </div> */}
            </div>
        )
    }
}

export default Register