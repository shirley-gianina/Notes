import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { withNavigate} from "../../hooks/navigate";

class CreateModal extends React.Component {

  render() {
    const title = this.props.id ? "Edit Note": "Create Note"
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={this.props.title}
                onChange={(e) => this.props.handleTitleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={this.props.description}
                onChange={(e) => this.props.handleDescriptionChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.props.save()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withNavigate(CreateModal);
