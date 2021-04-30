import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const initialState = {
  notes: [],
  starredNotes: [],
  currentNote: "",
  cuurentNoteId: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "newNote":
      return {
        ...state,
        notes: action.notes,
      };
    case "currentNote":
      console.log(state, action);
      return {
        ...state,
        currentNote: action.currentNote,
        currentNoteId: action.currentNote.id,
      };
    case "starredNote":
      return {
        ...state,
        starredNotes: action.notes,
      };
    default:
      return state;
  }
};
