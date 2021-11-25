import React, { Component } from 'react';
import { Modal, Button, Container, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';
import AuthService from '../services/auth.service';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: "",
            confPassword: "",
            name: "",

            serverMessage: "",
            showServerMessage: false
        }
        this.setOldPassword = this.setOldPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.setConfPassword = this.setConfPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    setOldPassword(event) {
        this.setState({ oldPassword: event.target.value })
    }
    setNewPassword(event) {
        this.setState({ newPassword: event.target.value })
    }
    setConfPassword(event) {
        this.setState({ confPassword: event.target.value })
    }
    changePassword(){
        fetch('http://localhost:8080/users/changePassword', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token' : AuthService.getCurrentUser().token
            },
            body: JSON.stringify({
                userId: AuthService.getCurrentUser().id,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                repeatedNewPassword: this.state.confPassword
            })
        }).then((response) => {
            if (!response.ok) {
                this.setState({ serverMessage: 'Something went wrong' });
                this.setState({ showServerMessage: true });
                //response.text().then(text => { throw new Error(text) })
                throw new Error('Something went wrong');

            } else alert("Password was changed!");
        }).catch((error) => {
            console.log('error: ' + error);
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Alert variant="danger" show={this.state.showServerMessage}>
                                {this.state.serverMessage}
                            </Alert>
                            <Form>
                                <Row>
                                    <FloatingLabel controlId="oldPassword" label="Old password" className="mb-3 form-input">
                                        <Form.Control type="password" onChange={this.setOldPassword} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="newPassword" label="New password" className="mb-3 form-input">
                                        <Form.Control type="password" onChange={this.setNewPassword} />
                                    </FloatingLabel>
                                </Row>                                
                                <Row>
                                    <FloatingLabel controlId="confPassword" label="Confirm password" className="mb-3 form-input">
                                        <Form.Control type="password" onChange={this.setConfPassword} />
                                    </FloatingLabel>
                                </Row>
                            </Form>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick()} >Close</Button>
                        <Button variant="primary" onClick={this.changePassword}>Change password</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default Profile;