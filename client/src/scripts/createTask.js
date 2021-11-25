import React, { Component } from 'react';
import { Modal, Button, Container, FloatingLabel, Form, Row, Alert, ListGroup } from 'react-bootstrap';
import '../styles/task.css';
import AuthService from '../services/auth.service';

class CreateTask extends Component {

    constructor() {
        super();
        this.state = {
            selectedTaskId: 0,
            color: "#000000",
            deadline: "",
            description: "",
            priority: "",
            taskStatus: "",
            tags: "",
            title: "",
            comments: [],
            histories: [],
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
        this.update = this.update.bind(this);
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
                'Content-Type': 'application/json',
                'Token': AuthService.getCurrentUser().token
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

    update(event) {
        console.log('update', this.state.selectedTask, event);
        fetch('http://localhost:8080/tasks', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': AuthService.getCurrentUser().token
            },
            body: JSON.stringify({
                "id": this.state.selectedTaskId,
                "color": this.state.color,
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
                console.log(response.json());
                this.setState({ serverMessage: 'Something went wrong' });
                this.setState({ showServerMessage: true });
                throw new Error('Something went wrong');

            } else return response.json();
        }).then((data) => {
            if (data.id != null) {
                this.props.onClick({ msg: "success" })
            }
            else
                this.props.onClick({ msg: "failed" })
        }).catch((error) => {
            console.log('error: ' + error);
        });
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        if (props.selectedTask.id !== state.selectedTaskId) {
            console.log('props.selectedTask', props.selectedTask.id, state.selectedTaskId);
            const task = props.selectedTask;
            return {
                selectedTaskId: task.id,
                color: task.color,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                taskStatus: task.status,
                tags: task.tags,
                title: task.title,
                comments: task.comments,

                serverMessage: "",
                showServerMessage: false
            };
        }

        return null;
    }


    async loadHistory(taskId) {
        let url = 'http://localhost:8080/histories/task/' + taskId;
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token' : AuthService.getCurrentUser().token
            }
        };

        try {
            const res = await fetch(url, settings);

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                },
                length: res.headers.get("Content-Length"),
                data: data,
            };

            console.log(result.data);
            this.setState({histories: data});
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const task = this.props.selectedTask;
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
                                        <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            onChange={this.setTitle}
                                            defaultValue={task.title} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskDescription" label="Description" className="mb-3 form-input">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Description"
                                            style={{ height: '100px' }}
                                            onChange={this.setDescription}
                                            defaultValue={task.description} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskPriority" label="Select Priority" className="mb-3 form-input">
                                        <Form.Select aria-label="Priority" onChange={this.setPriority} defaultValue={task.priority}>
                                            <option>Select one</option>
                                            <option value="HIGH">High</option>
                                            <option value="NORMAL">Normal</option>
                                            <option value="LOW">Low</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskStatus" label="Select Status" className="mb-3 form-input">
                                        <Form.Select className="mb-3 form-input" aria-label="Status" onChange={this.setTaskStatus} defaultValue={task.status}>
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
                                        title="Choose your color"
                                        onChange={this.setColor}
                                        defaultValue={task.color}
                                    />
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskDeadline" label="Deadline" className="mb-3 form-input">
                                        <Form.Control
                                            type="text"
                                            placeholder="Deadline"
                                            onChange={this.setDeadline}
                                            defaultValue={task.deadline} />
                                    </FloatingLabel>
                                </Row>
                                <Row>
                                    <FloatingLabel controlId="taskTag" label="Tags" className="mb-3 form-input">
                                        <Form.Control
                                            type="text"
                                            placeholder="tags,tag2, ..."
                                            onChange={this.setTags}
                                            defaultValue={task.tags} />
                                    </FloatingLabel>
                                </Row>
                            </Form>
                        </Container>
                        <div>
                            <br/>
                            <ListGroup>
                                <b>HISTORY</b>
                                <hr />
                                {this.state.histories.map((item, index) => {
                                    return [
                                        <ListGroup.Item>
                                            <div>
                                                <div>{item.text}</div>
                                                <div className="small">{item.creationTime}</div>
                                            </div>
                                        </ListGroup.Item>
                                    ];
                                })}
                            </ListGroup>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick()} >Close</Button>
                        <Button variant="primary" onClick={this.props.selectedTask.id ? this.update : this.create}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default CreateTask;