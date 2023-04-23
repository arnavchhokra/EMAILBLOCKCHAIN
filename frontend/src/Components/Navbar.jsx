import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar-Container">
        <a id="Navbar-Left" href="#">
          THREE <span id="color-navbar">MAIL</span>
        </a>
        <div id="Navbar-Middle">
          <a href="#">HOME</a>
          <a href="#">FAQ</a>
          <a href="#">ABOUT</a>
        </div>
        <button id="Navbar-button" href="#">
          JOIN
        </button>
        <button id="Navbar-Hidden" href="#">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
