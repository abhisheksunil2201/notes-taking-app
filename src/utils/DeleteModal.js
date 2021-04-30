import { Button } from "@material-ui/core";
import React from "react";
import "../components/styles/DeleteModal.css";

function DeleteModal({ deleteNote, setShowModal }) {
  const handleClick = () => {
    setShowModal(false);
    deleteNote();
  };

  return (
    <div className="deleteModal">
      <div className="modal">
        <h1 className="deleteModal__heading">Delete Note</h1>
        <p className="deleteModal__text">
          Are you sure you want to delete this note?
        </p>
        <div className="modal__buttons">
          <Button
            className="modalDeleteButton"
            variant="contained"
            color="secondary"
            onClick={handleClick}
          >
            Delete
          </Button>
          <Button
            className="modalCancelButton"
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
