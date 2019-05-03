import React, { Component } from "react";
import {Form,Button} from 'react-bootstrap';
import Validator from 'validator';

class Register extends Component {
    state = {
        data: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        errors: {},
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        if (!data.passwordConfirm !== data.password && data.passwordConfirm === "") errors.passwordConfirm = "Invalid Password";
        return errors;
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="email" name="email" placeholder="Enter email" value={data.email} onChange={this.onChange}/>
                            {errors.email && <span style={{color: '#ae5856'}}>{errors.email}</span>}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" name="password" placeholder="Password" value={data.password} onChange={this.onChange}/>
                            {errors.password && <span style={{color: '#ae5856'}}>{errors.password}</span>}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Password" value={data.passwordConfirm} onChange={this.onChange}/>
                            {errors.passwordConfirm && <span style={{color: '#ae5856'}}>{errors.passwordConfirm}</span>}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register