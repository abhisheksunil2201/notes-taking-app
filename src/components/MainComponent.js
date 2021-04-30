import React from "react";
import NewNote from "../components/NewNote";
import { StateProvider, initialState, reducer } from "../statemanagement/state";
import NotesList from "./NotesList";
import Sidebar from "./Sidebar";
import "./styles/MainComponent.css";

function MainComponent() {
  return (
    <div className="mainComponent">
      <StateProvider initialState={initialState} reducer={reducer}>
        <Sidebar />
        <NotesList />
        <NewNote />
      </StateProvider>
    </div>
  );
}

export default MainComponent;
