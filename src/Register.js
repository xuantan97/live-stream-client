import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import Validator from 'validator';
import { Link } from "react-router-dom";
import $ from "jquery";

class Register extends Component {
    state = {
        data: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        errors: {},
        showRegisterFail: false,
    };

    validate = data => {
        const errors = {};
        if (!data.username) errors.username = "Tên đăng nhập không được trống";
        if (!Validator.isEmail(data.email)) errors.email = "Email không hợp lệ";
        if (data.password.length < 6 || data.password.length > 16) errors.password = "Mật khẩu chỉ được nhập từ 6-16 ký tự";
        if (data.passwordConfirm !== data.password) errors.passwordConfirm = "Mật khẩu xác nhận không chính xác";
        return errors;
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

     onSubmit = async () => {
        const errors = await this.validate(this.state.data);
        await this.setState({
            errors, 
            showRegisterFail: false
        });

        console.log(this.state.errors);
         if($.isEmptyObject(this.state.errors) === true) {
            var account = new FormData();
            account.append('username',this.state.data.username);
            account.append('email',this.state.data.email);
            account.append('password',this.state.data.password);
            console.log(account);
            fetch('http://bonddemo.tk/v1/system/sign-up',{
                method: 'POST',
                headers: {},
                body: account
            })
            .then(res => {
                res.json().then(response => {
                    console.log(response);
                    if(response === "fail"){
                        this.setState({
                            showRegisterFail: true,
                        });
                    }else{
                        this.props.history.push('/');
                    }
                })
            })
            .catch(error => {console.log(error)});
        }
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
                
                <div className="wrapper-login">
                    <div className="container-login">
                        <h1>Đăng kí</h1>
                        { this.state.showRegisterFail ? <h4 style={{color: 'red'}}>Đăng ký không thành công</h4> : null }
                        
                        <form className="form-login" onSubmit={this.onSubmit}>
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
                                <Link to="/">Đăng nhập</Link>
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

export default Register