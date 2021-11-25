import React, { Component } from "react";
import banner from "../img/draw2.png";
import { Link } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Email: "",
      Password: "",
      validated: false,
    };
    this.Username = this.Username.bind(this);
    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);
    this.register = this.register.bind(this);
  }
  Username(event) {
    this.setState({ Username: event.target.value });
  }
  Email(event) {
    this.setState({ Email: event.target.value });
  }
  Password(event) {
    this.setState({ Password: event.target.value });
  }
  register(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
    fetch("http://localhost:8080/users", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.Username,
        username: this.state.Email,
        password: this.state.Password,
      }),
    })
      .then((Response) => Response.json())
      .then((Result) => {
        console.log(Result);
        if (Result.id != null) {
          alert(
            "Successfully registered new user! Navigating back to sign-in screen"
          );
          this.props.history.push("/sign-in");
        } else alert("Something went wrong");
      });
  }

  render() {
    return (
      <section>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src={banner} class="img-fluid" alt="Sign in banner" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.register}
              >
                <h3>Sign Up</h3>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    onChange={this.Username}
                    placeholder="Username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a username.
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="email"
                    onChange={this.Email}
                    placeholder="name@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="password"
                    onChange={this.Password}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be between 8 and 30 characters and it must
                    contain minimum 1 uppercase character, 1 digit and 1 special
                    character.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword2"
                  label="Confirm Password"
                >
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Password doesn't match.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already registered?{" "}
                    <Link to={"/sign-in"} className="link-danger">
                      Sign in
                    </Link>
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
