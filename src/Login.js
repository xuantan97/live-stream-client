import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Validator from 'validator';
import $ from "jquery";

class Login extends Component {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {},
        showLoginFail: false,
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Email không hợp lệ";
        if (data.password.length < 6 || data.password.length > 16) errors.password = "Mật khẩu chỉ được nhập từ 6-16 ký tự";
        return errors;
    };
   

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });


    onSubmit = async () => {
        const errors = await this.validate(this.state.data);
        await this.setState({
            errors,
            showLoginFail: false
        });

        if($.isEmptyObject(this.state.errors) === true) {
            var account = new FormData();
            account.append('email', this.state.data.email);
            account.append('password', this.state.data.password);

            fetch('http://bonddemo.tk/v1/system/login',{
                method: 'POST',
                headers: {},
                body: account
            })
            .then(res => {
                res.json().then(response => {
                    console.log(response);
                    if(response === "fail"){
                        this.setState({
                            showLoginFail: true,
                        });
                    }else{
                        localStorage.setItem('user_id', response.id);
                        localStorage.setItem('email', response.email);
                        localStorage.setItem('username', response.username);
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('loggedIn', true);
                        this.props.history.push('/homepage');
                    }
                })
            })
            .catch(error => {console.log(error);});
        }
    };


    render() {
        const {data, errors} = this.state;
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

                <div className="wrapper-login">
                    <div className="container-login">
                        <h1>Đăng nhập</h1>
                        { this.state.showLoginFail ? <h4 style={{color: 'red'}}>Đăng nhập không thành công</h4> : null }
                        
                        <form className="form-login" onSubmit={this.onSubmit}>
                            {errors.email && <div style={{color: '#ae5856'}}>{errors.email}</div>}
                            <input type="email" id="email" name="email" placeholder="Email" value={this.state.data.email} onChange={this.onChange}/>
                            
                            {errors.password && <div style={{color: '#ae5856'}}>{errors.password}</div>}
                            <input type="password" id="password" name="password" placeholder="Mật khẩu" value={this.state.data.password} onChange={this.onChange}/>
                            <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>Đăng nhập</Button>
                            <div style={{marginTop: '30px', fontSize: '18px'}}>
                                <span>Bạn chưa có tài khoản?&nbsp;</span>
                                <Link to="/register">Đăng kí</Link>
                            </div>
                        </form>
                    </div>
                    <ul className="bg-bubbles">
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Login;