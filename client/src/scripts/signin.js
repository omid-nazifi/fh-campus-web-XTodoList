import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import banner from '../img/draw2.png';

import { Link } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

class SignIn extends Component {
    render() {
        return (
            <section>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src={banner} class="img-fluid" alt="Sign in banner" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <Form>
                                <h3>Sign In</h3>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                                <div class="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div class="form-check mb-0">
                                        <Form.Check
                                            inline
                                            label="Remmeber me"
                                            name="group1"
                                            type="checkbox"
                                            id={`inline-checkbox-1`}
                                        />
                                    </div>
                                    <a href="#!" class="text-body">Forgot password?</a>
                                </div>
                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                        <Link to={"/sign-up"} className="link-danger">Register</Link></p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignIn;