import React, { Component } from 'react';
import { Modal, Button, Container, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';

class EditTask extends Component {

    constructor() {
        super();
        this.state = {
            task: null,
            // color: "",
            // deadline: "2021-11-21T11:41:36.306Z",
            // description: "",
            // priority: null,
            // taskStatus: null,
            // tags: "",
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
                this.props.onClick({ msg: "success" })
            }
            else
                this.props.onClick({ msg: "failed" })
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
                                    <FloatingLabel controlId="taskTitle" label="Title" className="mb-3 form-input">
                                        <Form.Control type="text" placeholder="Title" onChange={this.setTitle} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskDescription" label="Description" className="mb-3 form-input">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Description"
                                            style={{ height: '100px' }}
                                            onChange={this.setDescription} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskPriority" label="Select Priority" className="mb-3 form-input">
                                        <Form.Select aria-label="Priority">
                                            <option>Select one</option>
                                            <option value="High">High</option>
                                            <option value="NORMAL">NORMAL</option>
                                            <option value="Low">Low</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskStatus" label="Select Status" className="mb-3 form-input">
                                        <Form.Select className="mb-3 form-input" aria-label="Status">
                                            <option>Select one</option>
                                            <option value="TODO">ToDo</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="SUSPENDED">Suspended</option>
                                            <option value="DONE">Done</option>
                                        </Form.Select>
                                    </FloatingLabel>
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
                                    <FloatingLabel controlId="taskDeadline" label="Deadline" className="mb-3 form-input">
                                        <Form.Control type="text" placeholder="Deadline" onChange={this.setDeadline} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskTag" label="Tags" className="mb-3 form-input">
                                        <Form.Control type="text" placeholder="tags,tag2, ..." onChange={this.setTags} />
                                    </FloatingLabel>
                                </Row>
                            </Form>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick()} >Close</Button>
                        <Button variant="primary" onClick={this.create}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default CreateTask;