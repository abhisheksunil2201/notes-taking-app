import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocalStorage from "../utils/localStorage";
import { useStateValue } from "../statemanagement/state";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./styles/NewNote.css";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteModal from "../utils/DeleteModal";

function NewNote() {
  const [state, setState] = useState({
    id: 0,
    message: "",
    title: "",
    notebook: "",
  });
  const [{ currentNote, currentNoteId }, dispatch] = useStateValue();
  let tfName;
  const [minimized, setMinimized] = useState(true);
  const [showModal, setShowModal] = useState(false);
  let bookStarred = false;

  useEffect(() => {
    window.onclick = function (event) {
      if (showModal === true) {
        let temp = event.target.classList;
        if (
          temp.contains("modalDeleteButton") ||
          temp.contains("deleteModal") ||
          temp.contains("modalCancelButton") ||
          temp.contains("deleteModal__heading") ||
          temp.contains("deleteModal__text") ||
          temp.contains("modal") ||
          temp.contains("modal__buttons") ||
          event.target.textContent === "Cancel" ||
          event.target.textContent === "Delete"
        ) {
          console.log("in modal");
        } else {
          setShowModal(false);
        }
      }
    };
  }, [showModal]);

  function handleChange(name, data) {
    setState({
      ...state,
      title: tfName.value,
      [name]: data,
      id: new Date().getTime(),
    });
  }

  useEffect(() => {
    let name = "";
    if (currentNote.title !== undefined) {
      name = currentNote.title;
    }
    tfName.value = name;
    const rowExistsInStarred = LocalStorage.rowExistsIn("starred", currentNote);
    rowExistsInStarred.length > 0
      ? (bookStarred = true)
      : (bookStarred = false);
  }, [currentNote]);

  function addToNotes() {
    if (currentNoteId !== "") {
      if (LocalStorage.updateId(currentNoteId, state)) {
        dispatch({
          type: "newNote",
          notes: [],
        });
        const findItem = LocalStorage.findId(currentNoteId)[0];
        const allNodes = JSON.parse(
          LocalStorage.getNotebooks(
            findItem.notebook === "" ? "notes" : findItem.notebook
          )
        );

        dispatch({
          type: "newNote",
          notes: allNodes,
        });
        return;
      }
    }
    //note book is not set, so set the Note in "Note" object
    if (state.notebook === "") {
      const allNodes = LocalStorage.getNotes();
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.setNotes(JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject,
        });
      }
    } else {
      const allNodes = LocalStorage.getNotebooks(state.notebook);
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      //set the note inside note book
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.set(state.notebook, JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject,
        });
      }
    }
  }

  function deleteNote() {
    dispatch({
      type: "currentNote",
      currentNote: { id: "", message: "", title: "", notebook: "" },
    });
    const NoteBookOfTheNote = currentNote.notebook;
    let getObjectsOfTheNoteBook = JSON.parse(
      LocalStorage.getNotebooks(NoteBookOfTheNote)
    );
    if (getObjectsOfTheNoteBook === null) {
      getObjectsOfTheNoteBook = JSON.parse(LocalStorage.getNotes());
    }
    let removeNote = getObjectsOfTheNoteBook.filter(
      (note) => note.id !== currentNote.id
    );
    LocalStorage.rmNoteBook(
      NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote
    );
    LocalStorage.set(
      NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote,
      JSON.stringify(removeNote)
    );
    dispatch({ type: "newNote", notes: removeNote });
  }

  const expandNote = () => {
    if (minimized === true) {
      document.querySelector(".noteslist").style.display = "none";
      document.querySelector(".sidebar").style.display = "none";
      document.querySelector(".ck-content").style.width = "93vw";
      setMinimized(false);
    } else {
      document.querySelector(".noteslist").style.display = "";
      document.querySelector(".sidebar").style.display = "";
      document.querySelector(".ck-content").style.width = "60vw";
      setMinimized(true);
    }
  };

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  useEffect(() => {
    let All;
    let NoteNextMonth = LocalStorage.getNotebooks("Next Month");
    let University = LocalStorage.getNotebooks("University");
    let Home = LocalStorage.getNotebooks("Home");
    let Notes = LocalStorage.getNotebooks("notes");

    NoteNextMonth = NoteNextMonth !== null ? JSON.parse(NoteNextMonth) : [];
    University = University !== null ? JSON.parse(University) : [];
    Home = Home !== null ? JSON.parse(Home) : [];
    Notes = Notes !== null ? JSON.parse(Notes) : [];
    All = [...NoteNextMonth, ...University, ...Home, ...Notes];
    if (All.length > 0) {
      dispatch({ type: "newNote", notes: All });
    }
  }, [dispatch]);

  const config = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const addToShortcuts = () => {
    if (currentNote) {
      if (currentNote.notebook !== "starred") {
        currentNote.notebook = "starred";
      } else {
        const NoteBookOfTheNote = "starred";
        let getObjectsOfTheNoteBook = JSON.parse(
          LocalStorage.getNotebooks(NoteBookOfTheNote)
        );
        if (getObjectsOfTheNoteBook === null) {
          getObjectsOfTheNoteBook = JSON.parse(LocalStorage.getNotes());
        }
        let removeNote = getObjectsOfTheNoteBook.filter(
          (note) => note.id !== currentNote.id
        );
        LocalStorage.rmNoteBook(
          NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote
        );
        LocalStorage.set(
          NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote,
          JSON.stringify(removeNote)
        );
        dispatch({ type: "starredNote", notes: removeNote });
        currentNote.notebook = "";
      }
      setState({ ...state, notebook: currentNote.notebook });
      if (currentNote.notebook === "") {
        return;
      }
      //add to localstorage
      const allNodes = LocalStorage.getNotebooks("starred");
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      //set the note inside note book
      const rowExists = LocalStorage.rowExistsIn("starred", currentNote);
      if (rowExists.length === 0) {
        if (allNodesObject.length === 0) {
          allNodesObject = [currentNote];
        } else {
          allNodesObject.push(currentNote);
        }
        LocalStorage.set("starred", JSON.stringify(allNodesObject));
        dispatch({
          type: "starredNote",
          notes: allNodesObject,
        });
      }
    }
  };

  return (
    <div className="newnote">
      {showModal && (
        <DeleteModal deleteNote={deleteNote} setShowModal={setShowModal} />
      )}
      <div className="newnote__topbar">
        {minimized ? (
          <div className="tooltip" onClick={expandNote}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.031 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3h-11zm4.47 4.289H8.184l2.915 2.914a.625.625 0 01-.884.884L7.3 8.172v2.319a.625.625 0 11-1.25 0V6.674c0-.351.285-.635.635-.635h3.818a.625.625 0 010 1.25zM12.6 15.76h2.318l-2.915-2.915a.625.625 0 11.884-.884l2.915 2.915V12.56a.625.625 0 011.25 0v3.817c0 .35-.285.635-.635.635H12.6a.625.625 0 110-1.25z"></path>
            </svg>
            <span className="tooltiptext">Expand note</span>
          </div>
        ) : (
          <div className="tooltip" onClick={expandNote}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M6 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3H6zm2.864 6.78H6.546a.625.625 0 100 1.25h3.817c.35 0 .635-.285.635-.636V6.577a.625.625 0 00-1.25 0v2.319L6.833 5.98a.625.625 0 00-.884.883L8.864 9.78zm5.299 3.468h2.318a.625.625 0 100-1.25h-3.817a.635.635 0 00-.635.635v3.817a.625.625 0 101.25 0V14.13l2.915 2.915a.625.625 0 10.884-.884l-2.915-2.914z"
              ></path>
            </svg>
            <span className="tooltiptext">Collapse note</span>
          </div>
        )}
        <div
          className={bookStarred === true ? "tooltip star" : "tooltip"}
          onClick={addToShortcuts}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.277 11.107a20.43 20.43 0 01-1.593 1.811c-.426.456-.796.854-.948.949a.872.872 0 00-.265.796c0 .323.151 1.176.265 1.963.114.787.18 1.252.209 1.489.11.427-.038.878-.38 1.157a.853.853 0 01-.53.16 1.99 1.99 0 01-.835-.236l-2.636-1.318a1.487 1.487 0 00-.588-.19 1.527 1.527 0 00-.588.19c-.408.208-1.802.948-2.636 1.318a1.99 1.99 0 01-.835.237.853.853 0 01-.53-.161 1.128 1.128 0 01-.38-1.157c0-.237.114-.825.199-1.46.114-.797.247-1.67.275-1.992a.873.873 0 00-.228-.768 15.527 15.527 0 00-.891-.948c-1.005-1.138-1.498-1.631-1.631-1.84a1.147 1.147 0 01-.19-.996.948.948 0 01.655-.569c.636-.223 1.963-.464 1.963-.464s1.406-.183 2.057-.465a6.4 6.4 0 00.949-1.764l.227-.493c.56-1.195.816-1.735 1.442-1.782h.132a.37.37 0 01.143 0c.625.056.872.587 1.422 1.773l.237.502c.247.66.61 1.27 1.072 1.802.637.267 2.01.427 2.01.427s1.279.212 1.896.408c.315.071.576.29.702.587a1.18 1.18 0 01-.17 1.034z"></path>
          </svg>
          <span className="tooltiptext">Add to shortcuts</span>
        </div>
        <div className="tooltip">
          <DeleteIcon onClick={handleModal} />
          <span className="tooltiptext">Delete note</span>
        </div>
      </div>
      <TextField
        id="outlined-textarea"
        className=" newnote__title"
        placeholder="Title"
        margin="normal"
        required
        variant="outlined"
        inputRef={(input) => (tfName = input)}
        fullWidth
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <CKEditor
        editor={ClassicEditor}
        className="newnote__editor"
        data={currentNote.message}
        config={config}
        onChange={(e, editor) => {
          const data = editor.getData();
          handleChange("message", data);
        }}
      />
      <Button variant="outlined" color="primary" onClick={addToNotes}>
        Add Note
      </Button>
    </div>
  );
}

export default NewNote;
