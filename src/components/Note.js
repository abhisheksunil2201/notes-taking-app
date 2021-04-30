import React from "react";
import Paper from "@material-ui/core/Paper";
import LocalStorage from "../utils/localStorage";
import { useStateValue } from "../statemanagement/state";
import Grid from "@material-ui/core/Grid";
import "./styles/Note.css";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  const [{ currentNote }] = useStateValue();
  const { item, row } = props;
  const { id, title, category } = item;
  const [, dispatch] = useStateValue();

  function handleClick(data) {
    console.log(data);
    dispatch({
      type: "currentNote",
      currentNote: data,
    });
  }

  function showNote() {
    dispatch({ type: "showMessage", showModal: true, show: id });
  }

  return (
    <Paper className="note" onClick={(e) => handleClick(item)}>
      <Grid container>
        <div className="note__title">{title}</div>
      </Grid>
    </Paper>
  );
}

export default Note;
