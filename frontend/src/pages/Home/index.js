import React from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./index.css";
import NotesService from "../../api/Note";
import CreateModal from "../../components/CreateModal";
import { withNavigate } from "../../hooks/navigate";

class Home extends React.Component {
  state = {
    loading: true,
    show: false,
    title: "",
    description: "",
  };

  async componentDidMount() {
    await this.updateNotes();

    if (this.state.notes.length > 0) {
      this.props.navigate("/notes");
    } else {
      this.setState({ loading: false });
    }
  }

  async updateNotes() {
    const notes = await NotesService.getAll();
    this.setState({ notes });
  }

  async save() {
    await NotesService.create(this.state.title, this.state.description);
    this.updateNotes();
    this.handleClose();
    this.setState({ title: "", description: "" });
    this.props.navigate("/notes");
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

  render() {
    if (this.state.loading) {
      return <p>Loading</p>;
    }

    return (
      <>
        <CreateModal
          handleClose={() => this.handleClose()}
          handleOpen={() => this.handleOpen()}
          handleTitleChange={(e) => this.handleTitleChange(e)}
          handleDescriptionChange={(e) => this.handleDescriptionChange(e)}
          save={() => this.save()}
          show={this.state.show}
        ></CreateModal>
        <div className="home">
          <Card className="card">
            <Card.Body>
              <Card.Title className="text-center mb-4 fs-1">Hello</Card.Title>
              <Card.Text className="text-center mb-4">
                There are not notes yet.
              </Card.Text>
              <Button
                className="w-100"
                variant="success"
                onClick={() => this.handleOpen()}
              >
                Create One!
              </Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default withNavigate(Home);
