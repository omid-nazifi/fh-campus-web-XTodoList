import { Button, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function NewTaskPopup(props) {
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" contentClassName="">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add New Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <FloatingLabel controlId="floatingInput" label="Title">
                                    <Form.Control type="text" placeholder="Title" />
                                </FloatingLabel>
                            </Row>
                            <Row>
                                <FloatingLabel controlId="floatingInput" label="Description">
                                    <Form.Control type="text" placeholder="Description" />
                                </FloatingLabel>
                            </Row>
                            <Row>
                                <Form.Select aria-label="Status">
                                    <option>select a status</option>
                                    <option value="1">Open</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Suspended</option>
                                    <option value="4">Done</option>
                                </Form.Select>
                            </Row>
                            <Row>
                                <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue="#563d7c"
                                    title="Choose your color"
                                />
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={props.onHide}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default NewTaskPopup;