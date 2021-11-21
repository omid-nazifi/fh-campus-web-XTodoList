import React, { Component } from 'react';
import banner from '../img/draw2.png';

import { Link } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            Username: '',
            Email: '',
            Password: ''
        }
        this.Username = this.Username.bind(this);
        this.Email = this.Email.bind(this);
        this.Password = this.Password.bind(this);
        this.register = this.register.bind(this);
    }
    Username(event) {
        this.setState({ Username: event.target.value })
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    register(event) {
        fetch('http://localhost:8080/users', {
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: this.state.Username,
                    username: this.state.Email,
                    password: this.state.Password
                  })
                }).then((Response) => Response.json())
                  .then((Result) => {
                    console.log(Result);
                    if (Result.id != null) {
                        alert("Successfully registered new user! Navigating back to sign-in screen");
                        this.props.history.push("/sign-in");
                    }
                    else
                      alert('Something went wrong')
                  })
    }



    render() {
        return (
            <section>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src={banner} class="img-fluid" alt="Sign in banner" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <Form>
                                <h3>Sign Up</h3>
                                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                                    <Form.Control type="text" onChange={this.Username} placeholder="Username" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" onChange={this.Email} placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control type="password" onChange={this.Password} placeholder="Password" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword2" label="Confirm Password">
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </FloatingLabel>
                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <Button variant="primary" onClick = {this.register} >Sign Up</Button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">
                                        Already registered <Link to={"/sign-in"} className="link-danger">sign in?</Link>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignUp;