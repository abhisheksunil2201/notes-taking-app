import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../statemanagement/state";
import Note from "./Note";
import "./styles/NotesList.css";
import LocalStorage from "../utils/localStorage";

function NotesList() {
  const [{ notes }, dispatch] = useStateValue();
  const [mainData, setMainData] = useState([]);
  const [activeNote, setActiveNote] = useState("all");

  useEffect(() => {
    setMainData(notes);
  }, [notes]);

  const newNote = () => {
    dispatch({
      type: "currentNote",
      currentNote: { id: "", message: "", title: "", notebook: "" },
    });
  };

  function showNotesOf(Notebook) {
    let NoteNextMonth = LocalStorage.getNotebooks("Next Month");
    let University = LocalStorage.getNotebooks("University");
    let Home = LocalStorage.getNotebooks("Home");
    let Notes = LocalStorage.getNotebooks("notes");
    setActiveNote(Notebook);
    if (Notebook === "all") {
      let All;
      NoteNextMonth = NoteNextMonth !== null ? JSON.parse(NoteNextMonth) : [];
      University = University !== null ? JSON.parse(University) : [];
      Home = Home !== null ? JSON.parse(Home) : [];
      Notes = Notes !== null ? JSON.parse(Notes) : [];
      All = [...NoteNextMonth, ...University, ...Home, ...Notes];
      if (All.length > 0) {
        dispatch({ type: "newNote", notes: All });
      }
    } else {
      let Notes;
      if (Notebook === "Next Month") {
        Notes = NoteNextMonth;
      }
      if (Notebook === "University") {
        Notes = University;
      }
      if (Notebook === "Home") {
        Notes = Home;
      }

      Notes = Notes !== null ? JSON.parse(Notes) : [];
      dispatch({ type: "newNote", notes: Notes });
    }
  }

  return (
    <div className="noteslist">
      <div className="noteslist__newnote">
        <Button variant="contained" onClick={newNote}>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5.333a.833.833 0 00-.833.834v5h-5a.833.833 0 100 1.666h5v5a.833.833 0 001.666 0v-5h5a.833.833 0 000-1.666h-5v-5A.833.833 0 0012 5.333z"
              fill="currentColor"
            ></path>
          </svg>
          New Note
        </Button>
      </div>
      <div className="noteslist__head">
        <svg
          width="16"
          height="18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.798 0h10.5a2 2 0 012 2v10.497h-4a.75.75 0 00-.75.75v4.749h-7.75a2 2 0 01-2-2V2a2 2 0 012-2zm8.445 5.5a.75.75 0 000-1.5H4.757a.75.75 0 100 1.5h6.486zm.75 3.502a.75.75 0 01-.75.75H4.757a.75.75 0 110-1.5h6.486a.75.75 0 01.75.75zm-5.236 4.99a.75.75 0 000-1.5h-2a.75.75 0 000 1.5h2z"
            fill="currentColor"
          ></path>
          <path
            d="M12.048 13.997h2.588l-2.528 3.231-.06.073v-3.304z"
            fill="currentColor"
          ></path>
        </svg>
        <p>Notes</p>
      </div>
      <p className="noteslist__notescount">{mainData?.length} Notes</p>
      {mainData?.length === 0 && (
        <div className="noteslist__nocontent">
          <svg
            width="200"
            height="160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M122.319 109.982a3.556 3.556 0 01-1.79.995l-12.927 2.813c-.247.054-.497.08-.744.08a3.54 3.54 0 01-2.592-1.137 3.738 3.738 0 01-.875-3.466l3.25-12.731c.065-.254.163-.496.277-.728h-32.83c-1.243 0-2.253-1.035-2.253-2.308s1.01-2.308 2.252-2.308h37.074L142 59.582V53.56c0-7.489-5.923-13.56-13.23-13.56H71.23C63.923 40 58 46.071 58 53.561v79.878C58 140.929 63.923 147 71.23 147h57.54c7.307 0 13.23-6.071 13.23-13.561v-43.63l-19.681 20.173zM74.087 63.734h51.826c1.242 0 2.252 1.035 2.252 2.308 0 1.272-1.01 2.308-2.252 2.308H74.087c-1.242 0-2.252-1.036-2.252-2.309 0-1.272 1.01-2.307 2.252-2.307zm51.826 59.533H74.087c-1.242 0-2.252-1.036-2.252-2.309 0-1.272 1.01-2.307 2.252-2.307h51.826c1.242 0 2.252 1.035 2.252 2.308 0 1.272-1.01 2.308-2.252 2.308z"
              fill="#D9D9D9"
            ></path>
            <path
              d="M171.335 55.574l-51.218 51.62L107 110l3.298-12.702 51.218-51.62a5.652 5.652 0 018.037 0l1.782 1.796a5.758 5.758 0 010 8.1z"
              fill="#A6A6A6"
            ></path>
            <path
              opacity=".6"
              d="M168.417 146.602l2.679 1.956a.935.935 0 01.332 1.046l-1.031 3.172a.935.935 0 00.333 1.046.91.91 0 001.084-.002l2.664-1.978a.906.906 0 011.083.004l2.659 1.974a.915.915 0 001.085.002.939.939 0 00.333-1.046l-1.033-3.178a.94.94 0 01.338-1.043l2.674-1.953a.934.934 0 00.337-1.044.914.914 0 00-.878-.644l-3.302.013a.912.912 0 01-.741-.382.937.937 0 01-.134-.266l-1.006-3.181a.917.917 0 00-1.752 0l-1.006 3.181a.912.912 0 01-.874.648l-3.303-.013c-.422.026-.759.273-.878.644a.935.935 0 00.337 1.044zM71.505 12.743a2.314 2.314 0 01-1.65-.692l-3.142-3.185a2.385 2.385 0 010-3.341 2.31 2.31 0 013.297 0l1.495 1.513 5.276-5.346a2.31 2.31 0 013.298 0c.91.923.91 2.419 0 3.342l-6.926 7.017a2.309 2.309 0 01-1.648.692z"
              fill="#CEDC00"
            ></path>
            <path
              opacity=".6"
              d="M24.78 128.714a.972.972 0 00.966-.979v-6.483h2.886a.972.972 0 00.966-.978.98.98 0 00-.178-.563.999.999 0 00-.105-.131v.002l-5.348-5.234a.949.949 0 00-.67-.273.949.949 0 00-.669.273l-5.345 5.234v-.002a.999.999 0 00-.105.131.98.98 0 00-.178.563c0 .54.432.978.966.978h2.883v6.483c0 .541.433.979.966.979h2.966z"
              fill="#00A82D"
            ></path>
          </svg>
          <div className="noteslist__text">
            <p>Create your first note</p>
            <p>Click the + New Note button to get started.</p>
          </div>
        </div>
      )}
      {mainData.length > 0 &&
        mainData.map((item, index) => (
          <Note row={index} item={item} key={item.id} />
        ))}
    </div>
  );
}

export default NotesList;
