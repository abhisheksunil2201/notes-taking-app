import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeIcon from "@material-ui/icons/Home";
import NoteIcon from "@material-ui/icons/Note";
import "./styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <HomeIcon />
        <p>Home</p>
      </div>
      <div className="sidebar__item">
        <NoteIcon />
        <p>Notes</p>
      </div>
      <div className="sidebar__item">
        <svg
          width="24"
          height="24"
          fill="#cccccc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.277 11.107a20.43 20.43 0 01-1.593 1.811c-.426.456-.796.854-.948.949a.872.872 0 00-.265.796c0 .323.151 1.176.265 1.963.114.787.18 1.252.209 1.489.11.427-.038.878-.38 1.157a.853.853 0 01-.53.16 1.99 1.99 0 01-.835-.236l-2.636-1.318a1.487 1.487 0 00-.588-.19 1.527 1.527 0 00-.588.19c-.408.208-1.802.948-2.636 1.318a1.99 1.99 0 01-.835.237.853.853 0 01-.53-.161 1.128 1.128 0 01-.38-1.157c0-.237.114-.825.199-1.46.114-.797.247-1.67.275-1.992a.873.873 0 00-.228-.768 15.527 15.527 0 00-.891-.948c-1.005-1.138-1.498-1.631-1.631-1.84a1.147 1.147 0 01-.19-.996.948.948 0 01.655-.569c.636-.223 1.963-.464 1.963-.464s1.406-.183 2.057-.465a6.4 6.4 0 00.949-1.764l.227-.493c.56-1.195.816-1.735 1.442-1.782h.132a.37.37 0 01.143 0c.625.056.872.587 1.422 1.773l.237.502c.247.66.61 1.27 1.072 1.802.637.267 2.01.427 2.01.427s1.279.212 1.896.408c.315.071.576.29.702.587a1.18 1.18 0 01-.17 1.034z"></path>
        </svg>
        <p>Starred</p>
      </div>
    </div>
  );
}

export default Sidebar;
