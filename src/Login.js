import React, { Component } from "react";
import {Button} from 'react-bootstrap';

class Login extends Component {
    state = {
        data: {
            email: "",
            password: "",
        }
    };
   

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });


    onSubmit = () => {
        if(this.state.data.email === "" || this.state.data.password === "") {
            alert("Form đăng nhập không được để trống");
        }
        else {
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
                        alert("Đăng nhập không thành công !!!");
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
        return(
            <div className="container-form">

                <div class="wrapper-login">
                    <div class="container-login">
                        <h1>Đăng nhập</h1>
                        <form class="form-login" onSubmit={this.onSubmit}>
                            <input type="email" id="email" name="email" placeholder="Email" value={this.state.data.email} onChange={this.onChange}/>
                            <input type="password" id="password" name="password" placeholder="Mật khẩu" value={this.state.data.password} onChange={this.onChange}/>
                            <Button className="submit" variant="primary" onClick={()=>this.onSubmit()}>Đăng nhập</Button>
                            <div style={{marginTop: '30px', fontSize: '18px'}}>
                                <span>Bạn chưa có tài khoản?&nbsp;</span>
                                <a variant="primary" href="/register">
                                    Đăng kí
                                </a>
                            </div>
                        </form>
                    </div>
                    <ul class="bg-bubbles">
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                        <li></li> <li></li> <li></li> <li></li> <li></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Login;