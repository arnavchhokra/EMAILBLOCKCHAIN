import { useState, React } from "react";
import "./LeftBar.css";
import "react-bootstrap";
import WriteMail from "./WriteMail";

function LeftBar() {
  const [composeOpen, setComposeOpen] = useState(false);

  const handleComposeClick = () => {
    setComposeOpen(true);
  };
  const handleCloseClick = () => {
    setComposeOpen(false);
  };
  

  return (
    <div className="LeftBar">
      <div className="LeftBar-Container">
        <button id="compose" onClick={handleComposeClick}>
          Compose
        </button>
        {composeOpen && <WriteMail handleCloseClick={handleCloseClick} />}

        <a href="#">Inbox</a>
        <a href="#">Sent</a>
      </div>
    </div>
  );
}

export default LeftBar;
