import React, { Component } from 'react';
import { Modal, Button, Container, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';

class CreateTask extends Component {

    constructor() {
        super();
        this.state = {
            color: "",
            deadline: "2021-11-21T11:41:36.306Z",
            description: "",
            priority: 2, // medium
            taskStatus: 1, // todo status
            tags: "",
            title: "",

            serverMessage: "",
            showServerMessage: false
        }
        this.setColor = this.setColor.bind(this);
        this.setDeadline = this.setDeadline.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.setTaskStatus = this.setTaskStatus.bind(this);
        this.setTags = this.setTags.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.create = this.create.bind(this);
    }
    setColor(event) {
        this.setState({ color: event.target.value })
    }
    setDeadline(event) {
        this.setState({ deadline: event.target.value })
    }
    setDescription(event) {
        this.setState({ description: event.target.value })
    }
    setPriority(event) {
        this.setState({ priority: event.target.value })
    }
    setTaskStatus(event) {
        this.setState({ taskStatus: event.target.value })
    }
    setTags(event) {
        this.setState({ tags: event.target.value })
    }
    setTitle(event) {
        this.setState({ title: event.target.value })
    }

    create(event) {
        fetch('http://localhost:8080/tasks', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "color": this.state.color,
                "comments": [],
                "deadline": this.state.deadline,
                "description": this.state.description,
                "priority": this.state.priority,
                "status": this.state.taskStatus,
                "tags": this.state.tags,
                "title": this.state.title,
                "userId": this.props.userId,
            })
        }).then((response) => {
            if (!response.ok) {
                this.setState({ serverMessage: 'Something went wrong' });
                this.setState({ showServerMessage: true });
                //response.text().then(text => { throw new Error(text) })
                throw new Error('Something went wrong');

            } else return response.json();
        }).then((data) => {
            if (data.id != null) {
                // console.log(data);
                //alert("Successfully created new task!");
                this.props.onClick({msg: "success"})
            }
            else
            this.props.onClick({msg: "failed"})
        }).catch((error) => {
            console.log('error: ' + error);
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide({ msg: 'closed!' })}>

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
                                    <FloatingLabel controlId="taskTitle" label="Title">
                                        <Form.Control type="text" placeholder="Title" onChange={this.setTitle} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskDescription" label="Description">
                                        <Form.Control type="text" placeholder="Description" onChange={this.setDescription} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <Form.Select aria-label="Priority">
                                        <option>select a Priority</option>
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                    </Form.Select>
                                </Row>
                                <Row>
                                    <Form.Select aria-label="Status">
                                        <option>select a status</option>
                                        <option value="1">ToDo</option>
                                        <option value="2">In Progress</option>
                                        <option value="3">Suspended</option>
                                        <option value="4">Done</option>
                                    </Form.Select>
                                </Row>
                                <Row>
                                    <Form.Label htmlFor="colorInput">Color picker</Form.Label>
                                    <Form.Control
                                        type="color"
                                        id="colorInput"
                                        defaultValue="#37c10b"
                                        title="Choose your color"
                                        onChange={this.setColor}
                                    />
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskDeadline" label="Deadline">
                                        <Form.Control type="text" placeholder="Deadline" onChange={this.setDeadline} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskTag" label="Tags">
                                        <Form.Control type="text" placeholder="tags,tag2, ..." onChange={this.setTags} />
                                    </FloatingLabel>
                                </Row>
                            </Form>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick({ msg: 'closed!' })} >Close</Button>
                        <Button variant="primary" onClick={this.create}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default CreateTask;