import React from "react";
import NotesService from "../../api/Note";
import CreateModal from "../../components/CreateModal";
import { Button, Card } from "react-bootstrap";
import "./index.css";

class Notes extends React.Component {
  state = {
    id: undefined,
    title: "",
    description: "",
    show: false,
    notes: [],
  };

  async updateNotes() {
    const notes = await NotesService.getAll();
    this.setState({ notes });
  }

  async componentDidMount() {
    this.updateNotes();
  }

  async save() {
    if (this.state.id) {
      await NotesService.edit(
        this.state.id,
        this.state.title,
        this.state.description
      );
    } else {
      await NotesService.create(this.state.title, this.state.description);
    }
    this.updateNotes();
    this.handleClose();
    this.setState({ id: undefined, title: "", description: "" });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleOpen() {
    this.setState({ show: true });
  }

  handleEdit(item) {
    this.setState({
      title: item.title,
      description: item.description,
      id: item._id,
    });
    this.setState({ show: true });
  }

  async handleDelete(item) {
    await NotesService.delete(item._id);
    this.updateNotes();
  }

  render() {
    return (
      <div className="container notes">
        <CreateModal
          handleClose={() => this.handleClose()}
          handleOpen={() => this.handleOpen()}
          handleTitleChange={(e) => this.handleTitleChange(e)}
          handleDescriptionChange={(e) => this.handleDescriptionChange(e)}
          save={() => this.save()}
          id={this.state.id}
          title={this.state.title}
          description={this.state.description}
          show={this.state.show}
        ></CreateModal>
        <div className="row mt-5">
          <div className="col-md-10">
            <div className="row">
              {this.state.notes.map((item) => (
                <div key={item._id} className="col-md-4 mb-4">
                  <Card style={{ height: "300px" }}>
                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                      <Card.Title className="text-center text-uppercase">
                        {item.title}
                      </Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="danger"
                          onClick={() => this.handleDelete(item)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => this.handleEdit(item)}
                        >
                          Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-2">
            <Button
              className="w-100"
              variant="success"
              onClick={() => this.handleOpen()}
            >
              Create One!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
